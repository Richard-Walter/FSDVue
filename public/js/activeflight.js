// var map = getMap();
let user_panned_map = false;
var show_plane_trail = true;
var auto_center = true;
var defaultZoomSet = false;
var updateInterval = 5000;
let updateIntervalID = null;
let record_blink_interval;
let save_flight_btn_blink_interval;
let airport_infowindow;
let active_flight_status = false;

//flightplan imported from MSFS.  
let flightplan_poly;

//create inital user marker info
var userMarkerInfo = null;

//active flight current details dictionary
let af_details = { 'last_update_ms': 0 };

//dictionary that records flight details and positions for saving to flask db
let recorded_flight_details = {};
let recorded_flight_positions = [];
let modal_recorded_flight_details = {};
let modal_recorded_flight_positions = [];

let start_recording_alert = false;
let save_flight_alert = false;
let save_flight_dialog_shown = false;

//this is a list of agls for the arecorded flight
let flight_agl = [];

const audio_save_flight_url = "static/sounds/save_recorded_flight_reminder.mp3";
const audio_save_flight = new Audio(audio_save_flight_url);

//add listener to the save flight modal
$('#modal_save_flight_btn').on( "click", function() {

  saveRecordedFlight(modal_recorded_flight_details, modal_recorded_flight_positions)
});

$('#modal_close_flight_btn').on('click', closeSaveRecordedFlightModal);


//show active flight when button is clicked
function showActiveFlights() {

  removeAndResetActiveFlight(true);

  //active flight panel that holds the sliders and buttons
  $("#activeflight_panel_btn").val('on');
  $(".af_btn-text").html('Stop Active Flight');
  $(".activeflight_panel").show();

  active_flight_flash("Establishing connection with MSFS...please wait", 15000);

  updateDBShowChecked(true);
  console.log('In show Active Flight - show DBSHowChecked is true');

  // //GET ACTIVE FLIGHT DATA FROM DATABASE EVERY 5S
  updateIntervalID = setInterval(() => {

    //THis updates cvlient-side active flight details from server side
    updateActiveFlightData(updateMap);

  }, 5000);

  //if POI audio is ON, set a timeout so we have active flight data before turning on the audio
  if ($('#af_poi_audio').val() == 'on') {
    setTimeout(function() { activeFlightPoiAudio('on'); }, 2000);
  }

  //add listener in case user is trying to pan map so we can stop the autocentering when tracking a live flight
  google.maps.event.addListener(map, 'dragend', function (event) {

    if (user_panned_map == false) {
      user_panned_map = true;
      //turn off autocenter if user has manually panned the map
      $('#af_autocenter').click();
    }
  })
}


//stop tracking flight and reset initial stat of map
function removeAndResetActiveFlight(showchecked=false) {

  updateDBShowChecked(showchecked);
  // console.log('In removeAndResetActiveFlight - show DBSHowChecked is' + showchecked);

  //reset html elements
  $("#activeflight_panel_btn").val('off');
  $(".activeflight_panel").hide();
  $(".af_btn-text").html('Show Active Flight');
  

 //active flight status is initially false until connection has been made with MSFSF
 active_flight_status = false; 

 //REMOVE ANY PREVIOUS TIMERS 
 clearInterval(updateIntervalID);
 updateIntervalID = null;
 
 //RE-SET INTIAL HTML ELEMENT STATES

 $("#active_flight_flash").hide();

 reset_autocenter();
 reset_plane_trail();
 reset_poi_audio_slider_and_toolbar();
 reset_flightplan_details();

 $("#record_flight_div").prop('hidden', true);
 reset_recording_html()

 //reset airplane icon and trail info
 if (userMarkerInfo != null) {

   if (userMarkerInfo.poly) {
     userMarkerInfo.poly.setMap(null);
     userMarkerInfo.poly = null;

   }

   if (userMarkerInfo.marker) {
    userMarkerInfo.marker.setMap(null);
    userMarkerInfo.marker = null;
  }

  if (userMarkerInfo.icon) {
    userMarkerInfo.icon.setMap(null);
    userMarkerInfo.icon = null;
  }

  if (userMarkerInfo.label) {
    userMarkerInfo.label.setMap(null);
    userMarkerInfo.label = null;
  }

  userMarkerInfo.marker = null;
 }

 //create a new empty userMarkerInfo 
 userMarkerInfo = {
  id: getUserID(),
  map: map,
  marker: null,
  poly: null,
 }

 ////this is the user created flightplan path which is hidden when active flight flight plan is shown
 flightPath.setVisible(true);
}

//updates flask database that notifies other functions that the user wants to track flight
function updateDBShowChecked(showChecked) {

  $.ajax({
    url: "/users/show_active_flight_checkbox",
    method: "POST",
    dataType: "text",
    data: {
      // showChecked: showChecked.toString(),
      showChecked: showChecked
    },
  }).done(function (response) {

    // console.log('Database updated to show active flight checked ' + showChecked);
   
  }).fail(function (err) {
    // console.log(err)
    console.log('couldnt update database to show active flight checked');
  });
}

//Ajax routine to get users active flight
function updateActiveFlightData(callback) {

  $.ajax({
    url: "/users/get_user_location",
    method: "POST",
    dataType: "text",
    data: { user_id: getUserID() },
  }).success(function (response) {

    // console.log("get user location returned data")
    updateFlightDataObjects(response);
    callback();

  }).error(function () {
    console.log('AJAX call to get_user_location from database failed.  Cant update database to show active flight checked');
    //let user save flight recorded flight 
    if (($('#af_record').val() == 'on')){

      //make a deep copy of the recorded flight as these get delete when no active flight detected
      modal_recorded_flight_details = JSON.parse(JSON.stringify(recorded_flight_details))
      modal_recorded_flight_positions = JSON.parse(JSON.stringify(recorded_flight_positions))
      $('#saveFlightModalLabel-ERROR').show();
      $("#saveFlightModal").modal("show");
      
      save_flight_dialog_shown = true;

    }
    removeUpdateAFSetInterval("No active flight detected.  Check your internet connetion and that you are connected via the Flight Sim Discovery toolbar panel within MSFS");
  });

}

function updateFlightDataObjects(response) {

  active_flight_position = {};

  af_data = JSON.parse(response);
  if (jQuery.isEmptyObject(af_data)) {
    console.log("In updateMap - no data.  Probably user has never had an active flight and hasnt go the ingame panel installed")
    af_details['last_update_ms'] = 0;
    return;
  }


  last_update = af_data['last_update'];
  user_lat = af_data['lat'];
  user_lng = af_data['lng'];
  altitude_m = Math.round(af_data['alt']);
  altitude = Math.round(altitude_m * 3.281);
  altitude_agl = Math.round(af_data['altitude_agl']);
  flight_agl.push(altitude_agl);
  ground_speed = Math.round(af_data['ground_speed']);
  ias = af_data['ias'];
  heading_true = af_data['heading_true'];
  last_update_ms = new Date(last_update).getTime();
  parking_brake_indicator = af_data['parking_brake_indicator'];
  electrical_master_battery = af_data['electrical_master_battery']; 
  avionics_master_switch = af_data['avionics_master_switch'];


  //Check to see if we should play an alert sound to notify user to save flight.
  //Criteria is -sound hasnt been played for this recorded flight, 
  //            -user had previously left the ground (agl >100ft) i.e user has left the ground
  //            -GS = 0, 
  //            -and parking brake on or battery off or avionics off

  // max_agl_this_flight = Math.max.apply(null, flight_agl);
  if (Math.max.apply(null, flight_agl) >100){
    if (($('#af_record').val() == 'on') && (ground_speed == 0)) {
      if ((parking_brake_indicator==true) || (electrical_master_battery==false) || (avionics_master_switch==false)){

        //play sound and flash button if hasnt been played before this recoding session
        if (save_flight_alert == false){
          audio_save_flight.play();
          $('#btn_save_flight').removeClass('btn-primary');
          $('#btn_save_flight').addClass('btn-danger');
          save_flight_btn_blink_interval = setInterval(blink_save_flight_btn, 1000);
        }
        save_flight_alert = true;
      }
    } else {
      clearInterval(save_flight_btn_blink_interval);
    }
  } 

  //update client side active flight details dictioary
  af_details['last_update'] = last_update;
  af_details['user_lat'] = user_lat;
  af_details['user_lng'] = user_lng;
  af_details['altitude'] = altitude;
  af_details['altitude'] = altitude;
  af_details['ground_speed'] = ground_speed;
  af_details['ias'] = ias;
  af_details['heading_true'] = heading_true;
  af_details['last_update_ms'] = last_update_ms;
  
  af_details['ptp_date'] = af_data['ptp_date'];
  af_details['ptp_name'] = af_data['ptp_name'];
  af_details['ptp_description'] = af_data['ptp_description'];

  //append new flight recording details if we have recent flight data less than 10s
  // current_date_ms = Date.now();
  diff_millis = Date.now() - last_update_ms;
  if (diff_millis < 10000) {
    
    active_flight_position['last_update'] = last_update;
    active_flight_position['user_lat'] = user_lat;
    active_flight_position['user_lng'] = user_lng;
    active_flight_position['altitude'] = altitude;
    active_flight_position['altitude_agl'] = altitude_agl;
    active_flight_position['ground_speed'] = ground_speed;
    active_flight_position['ias'] = ias;
    active_flight_position['heading_true'] = heading_true;
    active_flight_position['last_update_ms'] = last_update_ms;
    active_flight_position['altitude_agl'] = af_data['altitude_agl'];

    //add flight details if none exist
    if ((Object.keys(recorded_flight_details).length) == 0){
      recorded_flight_details['aircraft_name'] = af_data['aircraft_name'];
      recorded_flight_details['aircraft_rego'] = af_data['aircraft_rego'];
    }

    recorded_flight_positions.push(active_flight_position);
  }
}

function getAFDetails() {
  return af_details;
}


//removes continuous calls to update map but leaves marker and plane trail.
//This is called when no active flight has been updated or save flight modal is closed
function removeUpdateAFSetInterval(flash_message = '', timeout = null) {

  active_flight_flash(flash_message, timeout);
  clearInterval(updateIntervalID);

  $('#activeflight_panel_btn').val('off');
  $(".af_btn-text").html('Show Active Flight');
  $(".activeflight_panel").hide();

  reset_autocenter();
  reset_plane_trail();
  reset_poi_audio_slider_and_toolbar();
  reset_flightplan_details();
  reset_recording_html();
  updateDBShowChecked(false);
  console.log('In removeUpdateAFSetInterval - show DBSHowChecked is false');

  active_flight_status = false;
}

//update map active flight marker, text and line.
function updateMap() {

  last_update = af_details['last_update'];
  user_lat = af_details['user_lat'];
  user_lng = af_details['user_lng'];
  altitude = af_details['altitude'];
  ground_speed = af_details['ground_speed'];
  ias = af_details['ias'];
  heading_true = af_details['heading_true'];
  last_update_ms = af_details['last_update_ms'];
  current_date_ms = Date.now();
  diff_millis = current_date_ms - last_update_ms;


  //check timestamp to see if flight data is being update from msfs.  15s to take into account switching from VR to PC
  if (diff_millis > 15000) {
    console.log('timestamp has not been updated for at least 15s')
    
    //only show save flight reminder dialog if following criteria is met, including at least 5 flight positions
    // is_recording = recorded_flight_positions.length > 5
    if (($('#af_record').val() == 'on') && (save_flight_dialog_shown == false) && (recorded_flight_positions.length > 5)&&(Math.max.apply(null, flight_agl) >100)){
        
      //make a deep copy of the recorded flight as these get delete when no active flight detected
      modal_recorded_flight_details = JSON.parse(JSON.stringify(recorded_flight_details))
      modal_recorded_flight_positions = JSON.parse(JSON.stringify(recorded_flight_positions))
      $("#saveFlightModal").modal("show");
      save_flight_dialog_shown = true;
      return;
    }
    removeUpdateAFSetInterval("No active flight detected.  Check you are logged in here and that you are connected via the in-game Flight Sim Discovery toolbar panel (download at https://flightsim.to/file/20403/flight-sim-discovery-vr-compatible) and try again");
    // removeUpdateAFSetInterval("This functionality requires an in-game mod that is coming soon in mid-September.  Stay tuned ...");
    return;
  }

  //ACTIVE FLIGHT
  if(!active_flight_status) {
    active_flight_status = true;
    $("#record_flight_div").removeProp('hidden');
    $("#poi_audio_div").removeProp('hidden');
    $("#af_show_flight_plan_div").removeProp('hidden');

    //turn on recording by default
    recordFlightHandler('on')
  }

  //keep flashing active flight text
  active_flight_flash("Tracking active flight");

  //create new user marker and plane trail if one doesnt already exist and info box if user wants
  if (userMarkerInfo.marker == null) {
    userMarkerInfo.marker = createNewUserMarker(user_lat, user_lng, ground_speed, heading_true, map);

    // build marker info window
    airport_infowindow = new google.maps.InfoWindow({
      content: 'test',
    });

    //add listener on marker to display infowindow
    if (userMarkerInfo.marker) {
      google.maps.event.addListener(userMarkerInfo.marker, 'click', function (evt) { // the click event function is called with the "event" as an argument
        showMarkerInfoWindow(evt, userMarkerInfo.marker, airport_infowindow);
      });
    }

    google.maps.event.addListener(map, "click", function () {

      airport_infowindow.close();

    });

    // if (userMarkerInfo.marker){
    //   google.maps.event.addListener(userMarkerInfo.marker, 'mouseout', function (evt) { // the click event function is called with the "event" as an argument
    //     airport_infowindow.close()
    //   });
    // }

    userMarkerInfo.poly = createUserPlaneTrail(user_lat, user_lng, map);

  } else {

    //update location of existing marker
    userMarkerInfo.marker.setPosition(new google.maps.LatLng(user_lat, user_lng));
    var icon = marker.getIcon();
    icon.rotation = heading_true;
    marker.setIcon(icon);

    //update label
    var label = userMarkerInfo.marker.getLabel();
    label.text = ground_speed.toString() + 'kts  ' + altitude.toString() + 'ft';;
    userMarkerInfo.marker.setLabel(label);

    //update user plane trail
    if (userMarkerInfo.poly != null) {
      if (show_plane_trail == false) {
        //clear trail
        userMarkerInfo.poly.setMap(null);
        // userMarkerInfo.poly = null;
      } else {
        //re-add poly to map if null
        if (userMarkerInfo.poly.map == null) {
          userMarkerInfo.poly.setMap(map);
        }
        const path = userMarkerInfo.poly.getPath();
        // Because path is an MVCArray, we can simply append a new coordinate and it will automatically appear.
        path.push(new google.maps.LatLng(user_lat, user_lng));
      }
    } else {
      if (show_plane_trail == true) {
        //create trail
        userMarkerInfo.poly = createUserPlaneTrail(user_lat, user_lng, map);
      }
    }



    // return marker;
  }

  // auto pan to map only if user hasn't manually pan map previous
  if (user_panned_map == false) {
    if (auto_center == true) {
      map.panTo(userMarkerInfo.marker.getPosition());
    }
  }

  //only do this intitally-let user decide afterwards
  if (defaultZoomSet == false) {
    map.setZoom(10);
    defaultZoomSet = true;
  }

  //PLAY ALERT SOUND TO START RECORDING IF HAVENT DONE SO 
  if ( $('#af_record').val() == 'off'){
    if ((start_recording_alert == false)&&(ground_speed>5)){
      start_recording_alert = true;
      audio_save_flight.play();
    }
  }

  return "success"

}

function createNewUserMarker(user_lat, user_lng, ground_speed, heading_true, map) {

  label_txt = ground_speed.toString() + 'kts  ' + altitude.toString() + 'ft';
  marker = new google.maps.Marker({

    position: new google.maps.LatLng(user_lat, user_lng),
    icon: {
      // url:'/static/img/marker/user_marker_airplane1.png', //Marker icon.
      path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,//Marker icon.
      fillColor: "blue",
      fillOpacity: 0.8,
      scale: 5,
      strokeWeight: 1,
      strokeColor: '#000',
      // strokeColor: '#00F',

      labelOrigin: new google.maps.Point(0, 13),
      anchor: new google.maps.Point(0, 2),

      // url:'/static/img/marker/user_marker_airplane1.png', //Marker icon.
      // labelOrigin: new google.maps.Point(12, 45),
      rotation: heading_true,
    },
    map: map,
    label: {
      text: label_txt,
      fontSize: "14px",
      fontWeight: "bold",
      color: 'black',
      // fontFamily: '"Courier New", Courier,Monospace',
    },
    opacity: 0.8,

  });


  return marker;
}

function createUserPlaneTrail(user_lat, user_lng, map) {

  // This converts a polyline to a dashed line, by setting the opacity of the polyline to 0,
  // and drawing an opaque symbol at a regular interval on the polyline.
  const lineSymbol = {
    path: "M 0,-1 0,1",
    strokeOpacity: 1,
    scale: 2,
  };

  label_txt = user_lat.toFixed(2).toString() + ' , ' + user_lng.toFixed(2).toString()
  poly = new google.maps.Polyline({
    path: [
      { lat: user_lat, lng: user_lng },
    ],
    strokeColor: "blue",
    // strokeColor: "#000000",
    strokeOpacity: 0,
    strokeWeight: 3,
    icons: [
      {
        icon: lineSymbol,
        offset: "0",
        repeat: "10px",
      },
    ],
  });
  poly.setMap(map);

  return poly;

}

function getUserSaveRecordedFlightPath(recorded_positions) {

  poly = new google.maps.Polyline({
    
    path: recorded_positions,
    geodesic: true,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 2,
    zIndex: 10
  });


  return poly;

}

function getUserFlightPlanPoly(planned_positions) {

  poly = new google.maps.Polyline({
    
    path: planned_positions,
    geodesic: true,
    strokeColor: '#cf4ddb',
    strokeOpacity: 0.5,
    strokeWeight: 5,
    zIndex: 5
  });


  return poly;

}

function active_flight_flash(display_text, timeout = null) {

  //remove info flash html
  $('#tips-and-tricks_flash').hide();

  $('#active_flight_flash_text').text(display_text);
  $("#active_flight_flash").show();
  if (timeout) {
    setTimeout(function () { $("#active_flight_flash").hide(); }, timeout);
  }
}

function recorded_flight_flash(display_text, timeout = null, status = 'danger') {

  //remove info flash html
  $('#tips-and-tricks_flash').hide();

  if (status=='success'){
    $('#recorded_flight_flash').removeClass("bg-danger");
    $('#recorded_flight_flash').addClass("bg-info");
  } else {
    $('#recorded_flight_flash').removeClass("bg-info");
    $('#recorded_flight_flash').addClass("bg-danger");
  }

  $('#recorded_flight_flash').text(display_text);
  $("#recorded_flight_flash").show();
  if (timeout) {
    setTimeout(function () { $("#recorded_flight_flash").hide(); }, timeout);
  }
}

//handles and distributes events from the active flight panel on the map
function activeFlightPanelHandler(e) {

  element_target = e.target;
  element_id = element_target.id;
  element_value = element_target.value;

  if (element_id == "af_autocenter") {
    if (element_value == "off") {
      element_target.value = "on";
      auto_center = true;
      user_panned_map = false;
    } else {
      element_target.value = "off";
      auto_center = false;
    }
  } else if (element_id == "af_show_trail") {
    if (element_value == "off") {
      element_target.value = "on";
      show_plane_trail = true;
    } else {
      element_target.value = "off";
      show_plane_trail = false;
      if (userMarkerInfo.poly != null) {
        //clear trail
        userMarkerInfo.poly.setMap(null);
      }
    }
  } else if (element_id == "af_show_flight_plan") {

    if (element_value == "off") {
      element_target.value = "on";
    } else {
      element_target.value = "off";

    }
    showFlightPlan(element_target.value);

  } else if (element_id == "af_poi_audio") {

    if (element_value == "off") {
      element_target.value = "on";
    } else {
      element_target.value = "off";

    }
    activeFlightPoiAudio(element_target.value);

  } else if (element_id == "af_record") {

    if (element_value == "off") {
      element_target.value = "on";
    } else {
      element_target.value = "off";

    }
    recordFlightHandler(element_target.value);

  } else if (element_id == "btn_save_flight") {

    saveRecordedFlight(recorded_flight_details, recorded_flight_positions);
    
  }

}

//handler for in-flight audio
function activeFlightPoiAudio(show_flag) {

  if (show_flag == 'on') {

    $('.pa_toolbar').removeClass("d-none");
    $('.tips-and-tricks').addClass("d-none");
    map.controls[google.maps.ControlPosition.TOP_CENTER].pop(searchPOIDiv);
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(paToolbarDiv);

    pa_init();

  } else {

    $('.pa_toolbar').addClass("d-none");
    map.controls[google.maps.ControlPosition.TOP_CENTER].pop(paToolbarDiv);
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(searchPOIDiv);
    paStop();
  }
}

function showFlightPlan(show_flag){

  if (show_flag == 'on') {

    // $('.pa_toolbar').removeClass("d-none");
    url = window.location.origin + '/users/get_active_flight_plan';
    encrypted_userid ='rjw' + String(user_id*34);

    $.ajax({
      url: url,
      method: "POST",
      dataType: "text",
      data: { user_id:encrypted_userid},
      success: function (response) {
      
        fp_data = JSON.parse(response)
        if (jQuery.isEmptyObject(fp_data)) {
          // flashMessage('No active flight plan detected.');
          console.log("No active flight plan detected");
          return;
        }

        flightplan_waypoints = [];
        fp_data_waypoints = fp_data['flightplan_data']['waypoint_data_list'];

        if (!fp_data_waypoints) {
          return; //no flight plan
        }

        for (let i = 0; i < fp_data_waypoints.length; i++) {

          waypoint = {'lat': fp_data_waypoints[i]['lat'], 'lng': fp_data_waypoints[i]['lng']};
          flightplan_waypoints.push(waypoint);

        }

        flightplan_poly = getUserFlightPlanPoly(flightplan_waypoints);
        flightplan_poly.setMap(map);
        //this is the user created flightplan path.  We will hide this if the user want to show the active flight flight plan
        flightPath.setVisible(false);
  
      },
      error: function () {
        flashMessage('Server error.  Please try again later.  If problem persists contact support.');
        console.log("No active flight plan detected");

        return [];
    
      }
    });

  } else {
    if(flightplan_poly){
      flightplan_poly.setMap(null);
      flightplan_poly = null;
    }
    

  }


}

function showMarkerInfoWindow(evt, marker, infowindow) {


  flight_details_dict = getAFDetails();

  user_lat = af_details['user_lat'];
  user_lng = af_details['user_lng'];
  altitude = af_details['altitude'];
  ground_speed = af_details['ground_speed'];
  ias = af_details['ias'];
  heading_true = af_details['heading_true'];
  last_update_ms = af_details['last_update_ms'];

  waypoint_name = 'test'

  flight_location = String(user_lat) + ', ' + String(user_lng);

  iw_content =
    "<head><link rel='stylesheet' href='static/css/style.css'/></head>" +
    "<div class='gm-style-iw' id='iw-container'>" +
    // '<div" class="">' +
    //   '<p class="">Latitude is ' + user_lat +'</p>'+
    //   '<p class="">Longitude is ' + user_lng +'</p>'+
    //   '<p class="">altitude is ' + altitude +'</p>'+
    // '</div>' +
    '<div id="btn_add_new_poi_airport_iw" class="">' +
    '<a href="/poi/new/' + flight_location + '" class="btn btn-primary btn-sm btn-block" role="button" aria-pressed="true">Create POI at this location</a>' +
    '</div>' +
    '</div>'

  infowindow.setContent(iw_content);
  infowindow.open({

    anchor: marker,
    map,
  });

}

//
function recordFlightHandler(record_flag) {

  if (record_flag == 'on') {
    record_blink_interval = setInterval(blink_recording_text, 1000);
    
    //reset recorder flight details
    recorded_flight_details = {};
    recorded_flight_positions = [];
    save_flight_alert = false;
    save_flight_dialog_shown = false;
    flight_agl = [];

    $('#af_record').prop('checked',true)
    $('#af_record').val('on');

    //recording flights details happens regardless
    $('#btn_save_flight').show();
  
  } else {
    clearInterval(record_blink_interval);
    $('.record_slider_text').html('Record Flight');
    $('.record_slider_text').css({"color" : "black"});
    $('#af_record').val('off');
    $('#af_record').prop('checked', false); 
    $('#btn_save_flight').hide();
    recorded_flight_details = {};
    recorded_flight_positions = [];
    save_flight_alert = false;
    start_recording_alert = false;
    save_flight_dialog_shown = false;
    flight_agl = [];

    
  };
  
}

function blink_recording_text() {

  $('.record_slider_text').html('Recording&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp');
  $('.record_slider_text').css({"color" : "red"});
  $('.record_slider_text').fadeOut(500);
  $('.record_slider_text').fadeIn(500);
}

function blink_save_flight_btn() {

  $('#btn_save_flight').fadeOut(500);
  $('#btn_save_flight').fadeIn(500);

}

function reset_recording_html() {


  clearInterval(record_blink_interval);
  clearInterval(save_flight_btn_blink_interval);
  $('.record_slider_text').finish().fadeOut().fadeIn();
  $('.record_slider_text').html('Record Flight');
  $('.record_slider_text').css({"color" : "black"});
  $('#af_record').val('off');
  $('#af_record').prop('checked', false); 
  // $("#record_flight_div").prop('hidden', true);
  $('#btn_save_flight').hide();
  $('#btn_save_flight').removeClass('btn-danger');
  $('#btn_save_flight').addClass('btn-primary');
  recorded_flight_details = {};
  recorded_flight_positions = [];
  save_flight_alert = false;
  start_recording_alert = false;
  save_flight_dialog_shown = false;
  flight_agl = [];

}

function reset_autocenter(){

  $("#af_autocenter").prop('checked', true); 
  $("#af_autocenter").val('on');
  user_panned_map = false;
  auto_center=true;

}

function reset_plane_trail(){

  $("#af_show_trail").prop('checked', true); 
  $("#af_show_trail").val('on');
  show_plane_trail = true;

}

function reset_poi_audio_slider_and_toolbar(){

  paStop();
  $("#poi_audio_div").prop('hidden', true);
  $("#af_poi_audio").val('on');
  $('#af_poi_audio').prop('checked',true)
  $('.pa_toolbar').addClass("d-none");
  $('.pa_toolbar').removeClass("d-flex");
  $("#pa_audio_toolbar").prop('hidden', true);
  map.controls[google.maps.ControlPosition.TOP_CENTER].pop(paToolbarDiv);
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(searchPOIDiv);

}

function reset_flightplan_details(){

  $("#af_show_flight_plan_div").prop('hidden', true);
  $("#af_show_flight_plan").val('off');
  $("#af_show_flight_plan").prop('checked',false)
  if(flightplan_poly){
    flightplan_poly.setMap(null);
    flightplan_poly = null;
    
  }
}

// function reset_flightplan_details(){

//   $("#af_show_flight_plan_div").prop('hidden', true);
//   $("#af_show_flight_plan").val('off');
//   $("#af_show_flight_plan").prop('checked',false)
//   if(flightplan_poly){
//     flightplan_poly.setMap(null);
//     flightplan_poly = null;
    
//   }
// }

function saveRecordedFlight(flight_details, flight_positions){

  recorded_flight = {};
  recorded_flight['recorded_flight_details'] = flight_details;
  recorded_flight['recorded_flight_positions'] = flight_positions;

  //save data to flask
  $.ajax({
    url: "/users/save_recorded_flight",
    method: "POST",
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify (recorded_flight)
  }).done(function (http) {

    if (http.status === 200) {
      recorded_flight_flash('Recorded flight has been saved', timeout = 15000, 'success');
      reset_recording_html();
      //create flight path zoom to the bounds of the recorded flight path
      let flightPlanCoordinates = [];
      let poly_bounds = new google.maps.LatLngBounds();
      var flight_coordinates_poly = [];

      for (let i = 0; i < flight_positions.length; i++) {
        lat = flight_positions[i]['user_lat'];
        lng = flight_positions[i]['user_lng'];
        position = {'lat':lat, 'lng':lng};
        poly_bounds.extend(new google.maps.LatLng(lat, lng));
        flight_coordinates_poly.push([lat, lng]);
        flightPlanCoordinates.push(position);
      }

      recorded_flight_poly = getUserSaveRecordedFlightPath(flightPlanCoordinates)
      recorded_flight_poly.setMap(map);
      map.fitBounds(poly_bounds);

      let recorded_flight_polygon = createRecordedFlightPolygon(flight_coordinates_poly);
      if (recorded_flight_polygon) {
        updatePOISVisited(recorded_flight_polygon);
        updateAirportsVisited(recorded_flight_polygon);
      }


    } else {

      console.log('HTTP STATUS IS: ' + String(http.status));
      recorded_flight_flash('Problem saving flight.  Please check your internet connection and try again. Report issue if problem persists', timeout = 15000);
      reset_recording_html();
    }

  }).fail(function (http) {

    if (http.status === 401) { 
      recorded_flight_flash('No recorded flight data to save', timeout = 15000);

    } else if (http.status === 402) { 
      recorded_flight_flash('Problem saving flight.  Please check your internet connection and try again. Report issue if problem persists', timeout = 15000);

    } else if (http.status === 403) { 
      recorded_flight_flash('You need to be logged in to save a recorded flight', timeout = 15000);
      reset_recording_html();

    } else {
      recorded_flight_flash('Problem saving flight.  Please check your internet connection and try again. Report issue if problem persists', timeout = 15000);

    }
  });

}


function closeSaveRecordedFlightModal(){
  removeUpdateAFSetInterval("No active flight detected.  Check that you are connected via the in-game Flight Sim Discovery toolbar panel (download at https://www.flightsim.to/) and try again");
  
}


function updatePOISVisited(flight_polygon){

  pois_visited = [];

  //calculate which pois fall inside this polygon
  for (const [poi_name, infowindow] of Object.entries(infowindow_dict)) {

    var poi_id = infowindow['id'];
    var latitude = infowindow['latitude'];
    var longitude = infowindow['longitude'];
    var latlng = new google.maps.LatLng(latitude,longitude);

    if (google.maps.geometry.poly.containsLocation(latlng, flight_polygon)) {
      pois_visited.push(poi_id);
    }
  }

  // console.log(pois_visited);

  //save this to the back end
  fetch(`/users/update_pois_visited`,
    {
        method: "POST",
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(pois_visited)
    })
    .then(function(res){ 
      // console.log(res.status);
      if (res.status==200) {
        // console.log('The following pois have been marked as visited from recorded flight:');
        // console.log(pois_visited);
      } else {
        console.log('Error - unable to mark pois as visited from recorded flight');
      }
    })
    // .then(function(data){ console.log( JSON.stringify( data ) ) })
    .catch(function (error) {  
        console.log('Could not update pois visited from recorded flight', error);  
    });

}

function updateAirportsVisited(flight_polygon){

  airports_visited = [];

  //calculate which airport fall inside this polygon
  for (let i = 0; i < default_airport_list.length; i++) { 

    var airport_id = default_airport_list[i]['id'];
    var latitude = default_airport_list[i]['lat'];
    var longitude = default_airport_list[i]['lon'];
    var latlng = new google.maps.LatLng(latitude,longitude);

    if (google.maps.geometry.poly.containsLocation(latlng, flight_polygon)) {
      airports_visited.push(airport_id);
    }
  }

  // console.log('Airports visited are: '+ airports_visited);

  //save this to the back end
  fetch(`/users/update_airports_visited`,
    {
        method: "POST",
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(airports_visited)
    })
    .then(function(res){ 
      console.log(res.status);
      if (res.status==200) {
        // console.log('The following airports have been marked as visited from recorded flight:');
        // console.log(airports_visited);
      } else {
        console.log('Error - unable to mark airports as visited from recorded flight');
      }
    })
    // .then(function(data){ console.log( JSON.stringify( data ) ) })
    .catch(function (error) {  
        console.log('Could not update airports visited from recorded flight', error);  
    });

}


function createRecordedFlightPolygon(flight_coordinates_poly) {

  //lets create the polygon coordinates using JSTS
  var distance = 0.03; // 3km either side of path

  geoInput = {
    type: "LineString",
    coordinates: flight_coordinates_poly
  };

  var geoReader = new jsts.io.GeoJSONReader();
  geoWriter = new jsts.io.GeoJSONWriter();
  var geometry = geoReader.read(geoInput).buffer(distance);
  var polygon = geoWriter.write(geometry);

  var polygonLatLng = [];
  var oCoordinates;
  oCoordinates = polygon.coordinates[0];

  for (var k = 0; k < oCoordinates.length; k++) {
    var oItem;
    oItem = oCoordinates[k];
    flight_point = { 'lat': parseFloat(oItem[0]), 'lng': parseFloat(oItem[1]) }
    polygonLatLng.push(flight_point);
  }


  var flight_polygon = new google.maps.Polygon({
    paths: polygonLatLng,
    strokeColor: "#FF0000",
    strokeOpacity: 0.35,
    strokeOpacity: 0,
    geodesic: true,
    fillColor: "#FF0000",
    fillOpacity: 0.20,
    map: map,
  });

  return flight_polygon;
}
  export function buildPoiInfoWindowContent(poi, hiddenDetails){

    console.log(poi);
    const rating = 9
    const HTMLContent = [
    "<head><link rel='stylesheet' href='/css/googlemap.css'/></head>",

    "<div class='gm-style-iw' id='iw-container'>",

    "<div class='gm-style-iw' id='iw-container'>",
    '<div class="iw-poi_header">',
    '<div style="cursor:pointer">',
    "<a href='https://www.google.com/search?q=" + poi.name + ", " + poi.country + "' target='_blank'>",
    '<h3 id="firstHeading">' + poi.name + '</h3>',
    '<h4 id="categoryHeading" class=" font-italic ">' + poi.category + '</h4>',
    '<h5 id="categoryHeading">Elevation: ' + poi.altitude + ' ft' + '</h5>' ,
    '</a>' ,
    '</div>' ,
    '<div class="mb-1">' ,
    '<span class="iw_rating_text" style="color: black;">Community rating: ' + rating + '</span>' ,
    '</div>' ,

    '<div ' + hiddenDetails + '>' ,
    '<div class="d-flex justify-content-center"' + hiddenDetails + '>' ,
    '<div class="IW_Rating">' ,
    '<form id="formIWrating" method="POST" action="/iw_post" target="dummyframe">' ,
    '<iframe name="dummyframe" id="dummyframe" style="display: none;"></iframe>' ,
    '<div class="poi_rating d-flex justify-content-center">' ,
    '<input id="ratingOptions5" name="ratingOptions" type="radio" value="5" class="radio-btn hide" onclick="this.form.submit()" />' ,
    '<label for="ratingOptions5" >☆</label>' ,
    '<input id="ratingOptions4" name="ratingOptions" type="radio" value="4" class="radio-btn hide" onclick="this.form.submit()"/>' ,
    '<label for="ratingOptions4" >☆</label>' ,
    '<input id="ratingOptions3" name="ratingOptions" type="radio" value="3" class="radio-btn hide" onclick="this.form.submit()"/>' ,
    '<label for="ratingOptions3" >☆</label>' ,
    '<input id="ratingOptions2" name="ratingOptions" type="radio" value="2" class="radio-btn hide" onclick="this.form.submit()"/>' ,
    '<label for="ratingOptions2" >☆</label>' ,
    '<input id="ratingOptions1" name="ratingOptions" type="radio" value="1" class="radio-btn hide" onclick="this.form.submit()"/>' ,
    '<label for="ratingOptions1" >☆</label>' ,
    '<div class="clear"></div>' ,
    '<input type="hidden" name="poi_id" value="' + poi.id + '">' ,
    '</div>' ,
    '</form>' ,
    '</div>' ,
    '</div>' ,
    '</div>' ,
    '<div class="iw_header_fas_icons "' + hiddenDetails + '>' ,

    // '<a style="cursor:pointer" onclick="iw_update_visited(\'' + id + '\')"><i id="iw_icon_visited" class="far ' + visitedCheck + ' fa-fw fa-lg" title="visited" style="color:#1a1a1a;"></i></a>' ,
    // '<a style="cursor:pointer" onclick="iw_update_favorite(\'' + id + '\')"><i id="iw_icon_fav" class=" ' + favoriteCheck + ' fa-heart fa-fw fa-lg" title="favorite" style="color:#9e0808;"></i></a>' ,
    '</div>' ,
    '</div>' ,
    // '<div id="bodyContent">' ,
    // iw_icons_html ,
    // '<div class="my-2">' +
    // '<p class="iw_description">' + description + '</p>' ,
    // '</div>' ,

    // '<div>' ,
    // defaults_airport_IW_HTML ,
    // '</div>' ,
    // '<hr class="my-2"/>' ,
    // '<div id="poi_flight_plans" class=" my-2"' + showFlightPlanTours + '>' ,
    // '<div class="card poi_flight_plans_card">' ,
    // '<div class="p-1 card-header poi_fp_header">' ,

    // '<p class="ml-2 iw_flightplan_header" >' ,
    // 'This POI is part of the following tours:' ,
    // '</p>' ,

    // '</div>' +
    // '<div class="px-2 py-1 poi_fp_body" >' ,
    // flightplan_tours_html ,
    // '</div>' ,
    // '</div>' ,

    // '</div>' ,
    // '<div>' ,
    // '<div id="btn_addPoiToFlightPlan" class="mt-3 mb-1 ' + showAddWaypointBtn + '">' ,
    // `<button class='btn btn-primary btn-sm mx-2 py-1'  onclick='addPoiToFlightPlan(` + latitude + `, ` + longitude + `, "` + poi.name.replaceAll("'", "&#39") + `", "` + category + `")'>Add to Flight Plan</button> ` ,
    // '</div>' ,
    // '<div id="btn_removePoiToFlightPlan" class="my-2 ' + showRemoveWaypointBtn + '">' ,
    // "<button class='btn btn-danger btn-sm mx-2 py-1' onclick='removePoiToFlightPlan(" + latitude + ", " + longitude + ", \"" + poi.name.replaceAll("'", "&#39") + "\")'>Remove from Flight Plan</button> " ,
    // '</div>' ,
    // '</div>' ,
    // '<div class="iw_update_delete_fas_icons "' + hiddenButtons + '>' ,
    // '<a class="iw_update_poi" style="cursor:pointer" href="#" onclick="{infowindow.close();iw_update_poi(' + id +')}"><i id="iw_image_update_poi" class="fas fa-edit fa-fw fa-lg" title="update" style="color:#5c5b5b;"></i></a>' ,
    // '<a class="iw_delete_poi" style="cursor:pointer" href="#" data-id="' + id + '" data-toggle="modal" data-target="#deleteModal"><i id="iw_image_delete_poi" class="far fa-trash-alt fa-fw fa-lg" title="delete" style="color:#9e0808;"></i></a>' ,
    // '</div>' ,
    // '<div id="iw_flag_icon" class="iw_flag_icon"' + flagIconDisplay + '>' ,
    // '<a style="cursor:pointer" href="#" data-id="' + id + '" data-toggle="modal" data-target="#flagReasonModal"><i id="iw_flagged_poi_icon" class="far fa-flag fa-fw fa-lg" title="Report POI" style="color:#f7c539;"></i></a>' ,
    // '</div>' ,
    // '</div>'
  ].join('');
  console.log(HTMLContent);
  return HTMLContent;
}
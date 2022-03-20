export async function buildAirportMarkers() {
  const icon = "/images/marker/ms_airport_marker.png";
  const icon_visited = "/images/marker/ms_airport_marker_visited.png";
  const icon_large = "/images/marker/ms_airport_marker_large.png";
  const icon_visited_large ="/images/marker/ms_airport_marker_visited_large.png";

  const airport_markers_list = [];

  let msfs_airports = await getAirports()

  for (var i = 0; i < msfs_airports.length; i++) {
    //airport information
    let airport_IW_details = msfs_airports[i];
    let icao = msfs_airports[i]["icao"];
    let airport_name = msfs_airports[i]["name"];
    let airport_city = msfs_airports[i]["city"];
    let airport_title = airport_name + " (" + icao + "), " + airport_city;
    let lat = parseFloat(msfs_airports[i]["latitude"]);
    let lng = parseFloat(msfs_airports[i]["longitude"]);
    let elevation = parseFloat(msfs_airports[i]["elevation"]);
    let show_on_map = msfs_airports[i]["Show_on_map"];
    let tower_freq = msfs_airports[i]["tower_frequency"];
    let id = msfs_airports[i]["id"];
    // let rating_score = getAirportRatingID(id);

    let search_name = airport_name + " airport ";

    if (show_on_map != 1) {
      continue;
    }

    //set airport icon depending on size and if user has visited the airport
    //   if (tower_freq && tower_freq != "0") {
    //     if (user_airports_visited.has(id)) {
    //       icon = icon_visited_large;
    //     } else {
    //       icon = icon_large;
    //     }
    //   } else {
    //     if (user_airports_visited.has(id)) {
    //       icon = icon_visited;
    //     } else {
    //       icon = icon;
    //     }
    //   }

    const category = "Airport";

    let airport_marker = new google.maps.Marker({
      position: { lat: lat, lng: lng },
      // map: map,
      icon: icon,
      title: airport_title,
    });

    //add marker if map zoom is > 7.  This may happen when coming from a datatable
    //   if (map_zoom > 7) {
    //     airport_marker.setMap(map);
    //   }

    //add markers to a list so we can add them to the map at a certain zoom range
    airport_markers_list.push(airport_marker);
  }
  console.log('finshed buuilder marker list byut havent called return');
  return airport_markers_list;
  
}

const getAirports = async () => {
  let response = await fetch("/data/FSD_airports.json");
  let airports = await response.json();
  return airports;
};

import { db } from "../firebase/config";
import { collection, onSnapshot,getDocs, query, where } from "firebase/firestore";

const favorite_marker = '/images/marker/favorite-marker.png'
const favorite_marker_airport = '/images/marker/favorite-marker_airport.png'
const visited_marker = '/images/marker/visited-marker.png'
const visited_marker_airport = '/images/marker/visited-marker_airport.png'
const user_marker = '/images/marker/user-marker.png'
const user_marker_airport = '/images/marker/user-marker_airport.png'
const airport_marker = '/images/marker/airport-marker.png'
const default_airport_marker = '/images/marker/default_airport_marker.png'
const normal_marker = '/images/marker/normal-marker.png'

const icon = "/images/marker/ms_airport_marker.png";
const icon_visited = "/images/marker/ms_airport_marker_visited.png";
const icon_large = "/images/marker/ms_airport_marker_large.png";
const icon_visited_large ="/images/marker/ms_airport_marker_visited_large.png";

export async function buildAirportMarkers() {


  const airport_markers_list = [];

  let msfs_airports = []

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

  return airport_markers_list;
  
}


export async function getPoisFromFB() {
  let pois = [];
  const querySnapshot = await getDocs(collection(db, "pois"));
  querySnapshot.forEach((doc) => {
    let data = doc.data();
    pois.push(data);
    // console.log(data);
  });
  // poisStore.setPois(pois)
  return pois
}

// export function get_marker_icon(poi, user_favorites, user_visited, user_pois){
export function get_marker_icon(poi){

    let is_airport = false;

    return normal_marker
    // if ('Airport' in poi.category) or ('Bush Strip' in poi.category):
    //     is_airport = True
    
    // if poi.id in user_pois:
    //     if is_airport:
    //         return user_marker_airport
    //     else:
    //         return user_marker
    // elif poi.id in user_visited:
    //     if is_airport:
    //         return visited_marker_airport
    //     else:
    //         return visited_marker
    // elif poi.id in user_favorites:
    //     if is_airport:
    //         return favorite_marker_airport
    //     else:
    //         return favorite_marker
    // elif is_airport:
    //     return airport_marker

    // else:
    //     return normal_marker
}
<template>
  <div></div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { ref, onMounted, onUnmounted, onBeforeMount, watch } from "vue";
import { useGoogleMapStore } from "../../store/googleMap.js";

//marker icons
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

const mapStore = useGoogleMapStore();
const props = defineProps(["poi"]);

let clickListener = null;
//const { isLoading } = storeToRefs(mapStore);

onMounted(async () => {
  if (props.poi) {
    // addMarker(props.poi);
  }
});

onUnmounted(async () => {
  if (clickListener) clickListener.remove();
});

const addMarker = (poi) => {

  const map = mapStore.map;
  const googlemaps = mapStore.googlemaps;
  const myLatLng = { lat: poi.latitude, lng: poi.longitude };

  let marker = new googlemaps.Marker({
    position: myLatLng,
    title: "Hello World!",
  });
  marker.setMap(map);
};



const getMarkerIcon = ((poi, user_favorites, user_visited, user_pois) =>{

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
});
</script>

<template>
  <div></div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { ref, onMounted, onUnmounted, onBeforeMount, watch } from "vue";

import {
  buildAirportMarkers,
  getPoisFromFB,
  get_marker_icon,
} from "../../googleMaps/googleMaps";
import { useGoogleMapStore } from "../../store/googleMap.js";
const mapStore = useGoogleMapStore();

const props = defineProps(["poi"]);

let clickListener = null;
const { isLoading } = storeToRefs(mapStore);

onMounted(async () => {
  if (props.poi) {
    addMarker(props.poi);
  }
});

// single ref
// watch(isLoading, (isLoaded) => {
//   console.log("in watch");
//   console.log(isLoaded);
//   const map = mapStore.map;
//   const googlemaps = mapStore.googlemaps;
//   if (!isLoaded) {
//     addMarker(props.poi);
//     buildAirportMarkers().then((airportMarkers) => {
//       //add a listener for map zoom so we can display airport markers at a certain zoom level
//       googlemaps.event.addListener(map, "zoom_changed", function () {
//         let zoom = map.getZoom();

//         if (zoom > 7) {
//           airportMarkers.forEach((marker) => {
//             marker.setMap(map);
//           });
//         } else if (zoom <= 7) {
//           airportMarkers.forEach((marker) => {
//             marker.setMap(null);
//           });
//         }
//       });
//     });

//     getPoisFromFB().then((pois) => {
//       // console.log(pois);
//       pois.forEach((poi) => {
//         let poiMarker = googlemaps.Marker({
//           position: { lat: poi.latitude, lng: poi.longitude },
//           // icon: icon,
//           icon: get_marker_icon(poi),
//           // icon: get_marker_icon(poi, user_favorites, user_visited, user_pois_list)
//           title: poi.name,
//         });
//         poiMarker.setMap(map);
//       });
//     });
//   }
// });

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
</script>

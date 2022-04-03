<template>
  <div ref="mapDiv" style="width: 100%; height: 85vh" />
  <slot></slot>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { ref, watch, onMounted, onUnmounted, onBeforeMount } from "vue";
import { Loader } from "@googlemaps/js-api-loader";
import { useGoogleMapStore } from "../../store/googleMap.js";
import { usePoisStore } from "../../store/pois.js";
import { useAirportsStore } from "../../store/airports.js";

const mapStore = useGoogleMapStore();

const poiStore = usePoisStore();
const airportStore = useAirportsStore();

const GM_API_KEY = process.env.GM_KEY;
const loader = new Loader({ apiKey: GM_API_KEY });

const mapDiv = ref(null);
let clickListener = null;

//Initliase global store data
poiStore.initialisePois();
airportStore.initialiseAirports().then(()=>{

  console.log('airport initialsation complete');

});

//add global listeners
const { isLoading } = storeToRefs(mapStore);

// watch(isLoading, () => {
//   const map = mapStore.map;
//   const googlemaps = mapStore.googlemaps;

//   googlemaps.event.addListener(map, "zoom_changed", function () {
//     console.log("zoom change listener called");

//     let zoom = map.getZoom();
//     console.log(zoom);

//     if (zoom > 4) {
//       const airportMarkers = getAirportMarkers();
//       console.log(airportMarkers);
//       airportMarkers.forEach((marker) => {
//         // console.log(marker);
//         marker.setMap(map);
//         marker.setVisible(true);
//       });
//     } else if (zoom <= 4) {
//       const airportMarkers = getAirportMarkers();
//       console.log('clearing airport markers');
//       airportMarkers.forEach((marker) => {
//         console.log('clearing marker');
//         marker.setVisible(false);
//       });
//     }
//   });
// });

function getAirportMarkers() {
  return airportStore.getMarkers;
}
onMounted(async () => {
  mapStore.createMap(mapDiv.value);
});

onUnmounted(async () => {
  if (clickListener) clickListener.remove();
});
</script>

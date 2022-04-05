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
//const loader = new Loader({ apiKey: GM_API_KEY });
//const initialiseComplete = ref(null);
const mapDiv = ref(null);
let clickListener = null;

//Initliase global store data
// initialiseGlobalData().then(() => {
//   console.log("initialisation of global data complete");
//   initialiseComplete.value = true;
// });

//add global listeners
const { isLoading } = storeToRefs(mapStore);

// const initialiseGlobalData  = async () => {
//   poiStore.initialisePois();
//   airportStore.initialiseAirports();
// };

// function getAirportMarkers() {
//   return airportStore.getMarkers;
// }
onMounted(async () => {
  mapStore.createMap(mapDiv.value);
});

onUnmounted(async () => {
  if (clickListener) clickListener.remove();
});
</script>

<template>
  <div ref="mapDiv" style="width: 100%; height: 85vh" />
  <slot></slot> 
</template>

<script setup>
/* eslint-disable no-undef */
import { ref, onMounted, onUnmounted, onBeforeMount } from "vue";
import { Loader } from "@googlemaps/js-api-loader";
import { useGoogleMapStore } from "../../store/googleMap.js";
import { usePoisStore } from "../../store/pois.js";
import { useAirportsStore } from "../../store/airports.js";

const mapStore = useGoogleMapStore();
const poiStore = usePoisStore();
const useAirportStore = useAirportsStore();

const GM_API_KEY = process.env.GM_KEY;
const loader = new Loader({ apiKey: GM_API_KEY });

const mapDiv = ref(null);
let clickListener = null;

//Iniiliase global store data
poiStore.initialisePois()
useAirportStore.initialiseAirports()

onMounted(async () => {
  mapStore.createMap(mapDiv.value)
  
});

onUnmounted(async () => {
  if (clickListener) clickListener.remove();
});

</script>
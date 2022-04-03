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
const useAirportStore = useAirportsStore();

const GM_API_KEY = process.env.GM_KEY;
const loader = new Loader({ apiKey: GM_API_KEY });

const mapDiv = ref(null);
let clickListener = null;

//Iniiliase global store data
poiStore.initialisePois();
useAirportStore.initialiseAirports();

//add global listeners
const { isLoading } = storeToRefs(useGoogleMapStore);

watch(isLoading, () => {
  const map = mapStore.map;
  const googlemaps = mapStore.googlemaps;

  googlemaps.event.addListener(map, "zoom_changed", function () {
    console.log("zoom change listener called");

    let zoom = map.getZoom();
    console.log(zoom);
    const airportMarkers = useAirportStore.getMarkers;
    console.log(airportMarkers);

    if (zoom > 7) {
      airportMarkers.forEach((marker) => {
        console.log(marker);
        marker.setMap(map);
      });
    } else if (zoom <= 7) {
      airportMarkers.forEach((marker) => {
        marker.setMap(null);
      });
    }
  });
});

onMounted(async () => {
  mapStore.createMap(mapDiv.value);
});

onUnmounted(async () => {
  if (clickListener) clickListener.remove();
});
</script>

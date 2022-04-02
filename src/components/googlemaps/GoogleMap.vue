<template>
  <div ref="mapDiv" style="width: 100%; height: 85vh" />
  <slot></slot> 
</template>

<script setup>
/* eslint-disable no-undef */
import { ref, onMounted, onUnmounted, onBeforeMount } from "vue";
import { Loader } from "@googlemaps/js-api-loader";
import { buildAirportMarkers, getPoisFromFB,get_marker_icon } from "../../googleMaps/googleMaps";
import { usePoisStore } from "../../store/pois.js";
import { useAuthStore } from "../../store/auth.js";
import { useGoogleMapStore } from "../../store/googleMap.js";

const authStore = useAuthStore();
const poisStore = usePoisStore();
const mapStore = useGoogleMapStore();

const GM_API_KEY = process.env.GM_KEY;
const loader = new Loader({ apiKey: GM_API_KEY });

const mapDiv = ref(null);
let clickListener = null;
let mapZoom = ref(5);

onMounted(async () => {
  mapStore.createMap(mapDiv.value)
});

onUnmounted(async () => {
  if (clickListener) clickListener.remove();
});

</script>
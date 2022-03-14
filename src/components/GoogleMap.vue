<template>
  <div ref="mapDiv" style="width: 100%; height: 80vh" />
</template>

<script setup>
/* eslint-disable no-undef */
import { ref, onMounted, onUnmounted } from "vue";
import { Loader } from "@googlemaps/js-api-loader";

const GM_API_KEY = process.env.GM_KEY
const loader = new Loader({ apiKey: GM_API_KEY });

const mapDiv = ref(null);
let map = ref(null);
let clickListener = null;

onMounted(async () => {
  await loader.load();
  map.value = new google.maps.Map(mapDiv.value, {
    center: { lat: -32.344, lng: 154.036 },
    // center: { lat: map_center_lat, lng: map_center_long },
    // zoom: map_zoom,
    zoom: 5,
    
    restriction: {
      latLngBounds: { north: 85, south: -85, west: -180, east: 180 },
      strictBounds: false,
    },
    options: {
      // gestureHandling: gestureHandling,
      // gestureHandling: 'greedy'
      
    },
    fullscreenControl: true,
    fullscreenControlOptions: {
      position: google.maps.ControlPosition.RIGHT_BOTTOM,
    },
    streetViewControl: false,
    zoomControl: true,
    clickableIcons: false,
    mapTypeControl: true,
    mapTypeId: "terrain",
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.DEFAULT,
      position: google.maps.ControlPosition.LEFT_BOTTOM,
      mapTypeIds: ["roadmap", "terrain", "satellite", "hybrid "],
    },
  });

  clickListener = map.value.addListener("click", ({ latLng: { lat, lng } }) =>
    alert(`${lat()},${lng()}`)
  );
});

onUnmounted(async () => {
  if (clickListener) clickListener.remove();
});
</script>

<style lang="scss" scoped>
.map_container {
  // width: 100%;
  height: 800px;
}
</style>

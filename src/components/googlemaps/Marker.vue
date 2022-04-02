<template>
  <div>hello</div>
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

let clickListener = null;

const {isLoading} = storeToRefs(mapStore)

// single ref
watch(isLoading, (isLoaded) => {
  console.log('in watch');
  console.log(isLoaded);
  if (!isLoaded) {
    addMarker()

  }
})

onUnmounted(async () => {
  if (clickListener) clickListener.remove();
});

const addMarker = () => {
 
  console.log("adding marker");
  const map = mapStore.map;
  const googlemaps = mapStore.googlemaps;
  console.log(map);
  const myLatLng = { lat: -33.5, lng: 154.2 };

  let marker = new googlemaps.Marker({
    position: myLatLng,
    title: "Hello World!",
  });
  marker.setMap(map);
};
</script>

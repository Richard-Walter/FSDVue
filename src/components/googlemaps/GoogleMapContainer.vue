<template>
  <GoogleMap>
    <Marker :key="index" :poi="poi" v-for="(poi, index) in poiStore.pois" />
  </GoogleMap>
</template>

<script setup>
import GoogleMap from "src/components/googlemaps/GoogleMap.vue";
import Marker from "src/components/googlemaps/Marker.vue";
import { useGoogleMapStore } from "../../store/googleMap.js";
import { usePoisStore } from "../../store/pois.js";
const mapStore = useGoogleMapStore();
const poiStore = usePoisStore();

const markers = [
  {
    lat: -34.093048,
    lng: 156.84212,
  },
  {
    lat: -34.198429,
    lng: 156.69529,
  },
  {
    lat: -31.165218,
    lng: 157.067116,
  },
  {
    lat: -31.09256,
    lng: 156.84074,
  },
];
</script>

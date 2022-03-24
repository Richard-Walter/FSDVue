<template>
  <div ref="mapDiv" style="width: 100%; height: 80vh" />
</template>

<script setup>
/* eslint-disable no-undef */
import { ref, onMounted, onUnmounted, onBeforeMount } from "vue";
import { Loader } from "@googlemaps/js-api-loader";
import { buildAirportMarkers, getPoisFromFB,get_marker_icon } from "../googleMaps/googleMaps";
import { usePoisStore } from "../store/pois.js";
import { useAuthStore } from "../store/auth.js";

const authStore = useAuthStore();
const poisStore = usePoisStore();

const GM_API_KEY = process.env.GM_KEY;
const loader = new Loader({ apiKey: GM_API_KEY });

const mapDiv = ref(null);

let map = ref(null);
let clickListener = null;

let mapZoom = ref(5);

onMounted(async () => {
  await loader.load();
  map.value = new google.maps.Map(mapDiv.value, {
    center: { lat: 51.5, lng: 0.13 },
    // center: { lat: map_center_lat, lng: map_center_long },
    zoom: mapZoom.value,
    // zoom: 5,

    restriction: {
      latLngBounds: { north: 85, south: -85, west: -180, east: 180 },
      strictBounds: false,
    },
    options: {
      // gestureHandling: gestureHandling,
      gestureHandling: "greedy",
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

  buildAirportMarkers(mapZoom.value).then((airportMarkers) => {
    //add a listener for map zoom so we can display airport markers at a certain zoom level
    google.maps.event.addListener(map.value, "zoom_changed", function () {
      let zoom = map.value.getZoom();

      if (zoom > 7) {
        airportMarkers.forEach((marker) => {
          marker.setMap(map.value);
        });
      } else if (zoom <= 7) {
        airportMarkers.forEach((marker) => {
          marker.setMap(null);
        });
      }
    });
  });

  getPoisFromFB().then((pois) => {
    // console.log(pois);
    pois.forEach((poi) => {
      let poi_marker = new google.maps.Marker({
        position: { lat: poi.latitude, lng: poi.longitude },
        // icon: icon,
        icon: get_marker_icon(poi),
        // icon: get_marker_icon(poi, user_favorites, user_visited, user_pois_list)
        title: poi.name,
      });
      poi_marker.setMap(map.value);
    });
  });
});

onUnmounted(async () => {
  if (clickListener) clickListener.remove();
});
</script>

<style lang="scss" scoped>
.map_container {
  height: 800px;
}
</style>

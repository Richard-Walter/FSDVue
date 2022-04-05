<template>
  <div ref="mapDiv" style="width: 100%; height: 80vh" />
</template>

<script setup>
/* eslint-disable no-undef */
import { ref, reactive, onMounted, onUnmounted, onBeforeMount } from "vue";
import { Loader } from "@googlemaps/js-api-loader";

import MarkerClusterer from "@googlemaps/markerclustererplus";
import {
  buildAirportMarkers,
  //getPoisFromFB,
  get_marker_icon,
} from "../../googleMaps/googleMaps";
import { buildCustomControl } from "../../googleMaps/customControls";
import { usePoisStore } from "../../store/pois.js";
import { useAuthStore } from "../../store/auth.js";
import { vueTemplateToString } from "../../utilities/HTMLParser";



const authStore = useAuthStore();
const poisStore = usePoisStore();

const GM_API_KEY = process.env.GM_KEY;
const loader = new Loader({ apiKey: GM_API_KEY });

const mapDiv = ref(null);

let map = reactive([]);

let clickListener = null;

//markers
let markerCluster = null;
//let markerCollection = [];
let clusterMarkers = [];

let mapZoom = ref(5);

// onBeforeMount(async () => {
//   await poisStore.initialisePois()
// })

onMounted(async () => {
  await loader.load();
  map = new google.maps.Map(mapDiv.value, {
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

  const centerControlDiv = document.createElement("div");
  buildCustomControl(centerControlDiv, map);
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

  buildAirportMarkers(mapZoom.value).then((airportMarkers) => {
    //add a listener for map zoom so we can display airport markers at a certain zoom level
    google.maps.event.addListener(map, "zoom_changed", function () {
      let zoom = map.getZoom();

      if (zoom > 7) {
        airportMarkers.forEach((marker) => {
          marker.setMap(map);
        });
      } else if (zoom <= 7) {
        airportMarkers.forEach((marker) => {
          marker.setMap(null);
        });
      }
    });
  });


  //build markers and cluster them
  poisStore.getPoisFromFB().then(async (pois) => {
    const src = '/html/InfowindowPOI.html'
    const poiIWHTML = await vueTemplateToString(src)
    console.log(poiIWHTML);
    pois.forEach((poi) => {
      let poiMarker = new google.maps.Marker({
        position: { lat: poi.latitude, lng: poi.longitude },
        // icon: icon,
        icon: get_marker_icon(poi),
        // icon: get_marker_icon(poi, user_favorites, user_visited, user_pois_list)
        title: poi.name,
      });
      // poiMarker.setMap(map.value);
      //markerCollection.push(poiMarker)
      clusterMarkers.push(poiMarker);

      //add info window here

      poiMarker.addListener("click", function (event) {

        console.log(poiIWHTML);
        const infoWindow = new google.maps.InfoWindow({
          
          content: poiIWHTML
        });

        infoWindow.open(map, poiMarker);

        google.maps.event.addListener(map, "click", function () {
          infoWindow.close();
        });
      });
    });

    // Marker Clustering
    markerCluster = new MarkerClusterer(map, clusterMarkers, {
      maxZoom: 10,
      imagePath:
        "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
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


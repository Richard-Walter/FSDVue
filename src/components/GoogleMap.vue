<template>
  <div ref="mapDiv" style="width: 100%; height: 80vh" />
</template>

<script setup>
/* eslint-disable no-undef */
import { ref, onMounted, onUnmounted, onBeforeMount } from "vue";
import { Loader } from "@googlemaps/js-api-loader";
import { buildAirportMarkers } from "../googleMaps/googleMaps";
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

 
  // poisStore.getPoisFromFB().then((pois) => {

  //   console.log(pois);

  //   let data = poisStore.pois
  //   console.log(data['first']);
  //   console.log(poisStore.pois);

  // });

  // await authStore.signup(email.value, password.value, name.value)

  // if (!authStore.error) {
  //   //success - route to site_details
  //   $q.notify({
  //     color: "positive",
  //     message: `Registration Successful`,
  //   });
  //   router.push("/");
  // } else {
  //   $q.notify({
  //     color: "negative",
  //     message: `${authStore.error}`,
  //   });
  //   // invalidLoginMsg.value = error.value + ".  Please try again.";
  // }

  // clickListener = map.value.addListener("click", ({ latLng: { lat, lng } }) =>
  //   alert(`${lat()},${lng()}`)
  // );
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

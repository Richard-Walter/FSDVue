<template>
  <q-page>
    <div style="height: calc(100vh - 50px)">
      <GMapMap
        ref="myMapRef"
        :center="center"
        :zoom="6"
        map-type-id="terrain"
        :options="{
          zoomControl: true,
          mapTypeControl: true,
          clickableIcons: false,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: true,
          restriction: {
            latLngBounds: { north: 85, south: -85, west: -180, east: 180 },
            strictBounds: true,
          },
        }"
      >
        <GMapCluster :zoomOnClick="true">
          <GMapMarker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :clickable="true"
            :draggable="true"
            @click="center = m.position"
          />
        </GMapCluster>
      </GMapMap>
    </div>
  </q-page>
</template>

<script setup>
import { ref, watch, computed, onMounted } from "vue";

import { useAuthStore } from "../store/auth.js";
// watch(myMapRef, (googleMap) => {
//   if (googleMap) {
//     googleMap.$mapPromise.then((map) => {
//       heatData.value = [
//         {
//           location: new google.maps.LatLng({
//             lat: 52.2985593,
//             lng: 104.2455337,
//           }),
//         },
//       ];
//     });
//   }
// });

const myMapRef = ref();
const center = { lat: 51.093048, lng: 6.84212 };
const markers = [
  {
    position: {
      lat: 51.093048,
      lng: 6.84212,
    },
  },
  {
    position: {
      lat: 51.198429,
      lng: 6.69529,
    },
  },
  {
    position: {
      lat: 51.165218,
      lng: 7.067116,
    },
  },
  {
    position: {
      lat: 51.09256,
      lng: 6.84074,
    },
  },
];

onMounted(() => {
  //console.log(this.$refs.myMapRef);
});
</script>

<style lang="scss" scoped>
.vue-map-container {
  height: 85vh;
  width: 100%;
}
</style>

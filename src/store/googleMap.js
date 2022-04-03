import { defineStore } from "pinia";

import { ref } from "vue";
import { Loader } from "@googlemaps/js-api-loader";

export const useGoogleMapStore = defineStore("googleMap", {
  state: () => ({
    map: ref(null),
    googlemaps: ref(null),
    isLoading: ref(true),
  }),
  getters: {

    getMap: (state) => {
      return state.map;
    },
  },
  actions: {
    async createMap(mapDiv) {
      const GM_API_KEY = process.env.GM_KEY;
      const loader = new Loader({ apiKey: GM_API_KEY });
      await loader.load();
      this.googlemaps = google.maps
      this.map = new google.maps.Map(mapDiv, {
        center: { lat: -33.5, lng: 154 },
        // center: { lat: map_center_lat, lng: map_center_long },
        zoom: 5,
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
      this.isLoading = false
    },
    
  },
});

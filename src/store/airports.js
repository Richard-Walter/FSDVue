import { defineStore } from "pinia";

import {getAirports} from "../googleMaps/googleMaps"
import { ref } from "vue";

export const useAirportsStore = defineStore("airports", {
  state: () => ({
    airports: ref([]),
    airportMarkers: [],
    isLoading: ref(true),
  }),
  getters: {
    getMarkers: (state) => state.airportMarkers,
  },
  actions: {
    async initialiseAirports() {

      let response = await fetch("/data/FSD_airports.json");
      //let response = await fetch("/data/FSD_airports-small.json");
      this.airports = await response.json();
      this.isLoading = false  
    },
    // addAirportMarker(airportMarker) {
    //   console.log('adding ariportmarker to collection');
    //   this.airportMarkers.push(airportMarker)
    // }
  },
});



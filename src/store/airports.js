import { defineStore } from "pinia";

import {getAirports} from "../googleMaps/googleMaps"
import { ref } from "vue";

export const useAirportsStore = defineStore("airports", {
  state: () => ({
    airports: ref([]),
    isLoading: ref(true),
  }),
  getters: {

  },
  actions: {
    async initialiseAirports() {
      // this.airports = await getAirports()
      // this.isLoading = false  
      let response = await fetch("/data/FSD_airports.json");
      this.airports = await response.json();
      this.isLoading = false  
    },
  },
});

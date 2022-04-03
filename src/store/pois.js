import { defineStore } from "pinia";
import { getPoisFromFB} from "../googleMaps/googleMaps"
import { ref } from "vue";

export const usePoisStore = defineStore("pois", {
  state: () => ({
    pois: ref([]),
    isLoading: ref(true),
  }),
  getters: {

  },
  actions: {
    async initialisePois() {
      const pois = await getPoisFromFB()
      this.pois = pois      
      this.isLoading = false
    },
  },
});

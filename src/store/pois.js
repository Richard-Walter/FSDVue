import { defineStore } from "pinia";

// firebase imports
import { db } from "../firebase/config";
import { collection, onSnapshot,getDocs, query, where } from "firebase/firestore";
import { ref } from "vue";


export const usePoisStore = defineStore("pois", {
  state: () => ({
    pois: ref([]),
    isLoading: ref(true),
  }),
  getters: {
    //euqivalent of computed values
    // doubleCount: (state) => state.counter * 2,
    getPOIS: (state) => {
      return pois
  },
  },
  actions: {
    setPois(payload) {
      this.pois = payload;
      console.log("Pois sotred globally");
    },
  },
});

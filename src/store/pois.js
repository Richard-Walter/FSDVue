import { defineStore } from "pinia";
//import { getPoisFromFB} from "../googleMaps/googleMaps"
import { ref } from "vue";
import { db } from "../firebase/config";
import { collection, onSnapshot,getDocs, query, where } from "firebase/firestore";

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

const getPoisFromFB = (async ()=>{
  let pois = [];
  const querySnapshot = await getDocs(collection(db, "pois"));
  querySnapshot.forEach((doc) => {
    let data = doc.data();
    pois.push(data);
    // console.log(data);
  });
  return pois
})


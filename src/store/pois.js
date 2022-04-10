import { defineStore } from "pinia";
//import { getPoisFromFB} from "../googleMaps/googleMaps"
import { ref } from "vue";
import { db } from "../firebase/config";
import { collection, onSnapshot,getDocs, query, where } from "firebase/firestore";

export const usePoisStore = defineStore("pois", {
  state: () => ({
    pois: ref([]),
    poisVisited: ref([]),
    poisFav: ref([]),
    poisFlagged: ref([]),
    poisRatings: ref([]),
    isLoading: ref(true),
    poiIWHTML: ref(''),
  }),
  getters: {
    getPOIIWHTML: (state) => state.poiIWHTML,
  },
  actions: {
    // async initialisePois() {
    //   const pois = await getPoisFromFB()
    //   const poiIWHTML = await vueTemplateToString()
    //   this.pois = pois      
    //   this.poiIWHTML = poiIWHTML      
    //   this.isLoading = false
    // },
      async getPois(){
      let pois = [];
      const querySnapshot = await getDocs(collection(db, "pois"));
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        pois.push(data);
        // console.log(data);
      });
      this.pois = pois
      return pois
    },
      async getPoisVisited(){
      let poisVisited = [];
      const querySnapshot = await getDocs(collection(db, "visited"));
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        poisVisited.push(data);
        // console.log(data);
      });
      this.poisVisited = poisVisited
      return poisVisited
    },
      async getPoisFav(){
      let poisFav = [];
      const querySnapshot = await getDocs(collection(db, "visited"));
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        poisFav.push(data);
        // console.log(data);
      });
      this.poisFav = poisFav
      return poisFav
    },
      async getPoisFlagged(){
      let poisFlagged = [];
      const querySnapshot = await getDocs(collection(db, "flagged"));
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        poisFlagged.push(data);
        // console.log(data);
      });
      this.poisFlagged = poisFlagged
      return poisFlagged
    },
      async getPoisRatings(){
      let poisRatings = [];
      const querySnapshot = await getDocs(collection(db, "ratings"));
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        poisRatings.push(data);
        // console.log(data);
      });
      this.poisRatings = poisRatings
      return poisRatings
    },
    

  },
});



import { defineStore } from "pinia";
//import { getPoisFromFB} from "../googleMaps/googleMaps"
import { ref } from "vue";
import { db } from "../firebase/config";
import { collection, onSnapshot,getDocs, query, where } from "firebase/firestore";

export const usePoisStore = defineStore("pois", {
  state: () => ({
    pois: ref([]),
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

const vueTemplateToString = (async ()=>{

  const src = '/html/InfowindowPOI.html'
  const response = await fetch(src);
  const html = await response.text()
  console.log(html);
  return html
})

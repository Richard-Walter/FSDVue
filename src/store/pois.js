import { defineStore } from "pinia";

// firebase imports
import { db } from "../firebase/config";
import { collection, onSnapshot,getDocs, query, where } from "firebase/firestore";


export const usePoisStore = defineStore("pois", {
  state: () => ({
    pois: [],
  }),
  getters: {
    //euqivalent of computed values
    // doubleCount: (state) => state.counter * 2,
    //   getUsername: (state) => {
    //     if (state.user){
    //       return state.user.displayName;
    //     }
    //     return 'Unknown'
    // },
  },
  actions: {
    async getPoisFromFB() {
      this.pois = [];
      const querySnapshot = await getDocs(collection(db, "test"));
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        this.pois.push(data);
        console.log(data);
      });
    },
  },
});

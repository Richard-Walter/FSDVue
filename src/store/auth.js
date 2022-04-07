import { defineStore } from "pinia";

// firebase imports
import { auth } from "../firebase/config";
import {
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  getAuth
} from "firebase/auth";


export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    admin: false,
    authIsReady: false,
    isPending: false,
    error: null,
  }),
  getters: {
    //euqivalent of computed values
    // doubleCount: (state) => state.counter * 2,
    getUserID: (state) => {
      if (state.user){
        return state.user.uid;
      }
      return null
    },
    getEmail: (state) => {
      if (state.user){
        return state.user.email;
      }
      return 'Unknown'
    },
    isSignedIn: (state) => {
      if (state.user){
        return true
      }
      return false
    },
    
  },
  actions: {
    setUser(payload) {
      this.user = payload;
      console.log("user state changed", this.user);
    },
    setAdmin(payload) {
      if (payload==true){
        this.admin = true;
        console.log("user is admin", this.user);
      }

    },
    setAuthIsReady(payload) {
      this.authIsReady = payload;
    },
    async signup(email, password, name) {
      this.error = null;
      this.isPending = true;

      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        if (!res) {
          this.error = "Could not complete signup.  Please try again later";
          this.isPending = false;
        } else {
          await updateProfile(res.user, {
            displayName: name,
          });
          this.setUser(res.user);
          this.error = null;
          this.isPending = false;
        }
      } catch (err) {
        console.log(err.message);
        this.error = mapAuthCodeToMessage(err.code);
        this.isPending = false;
      }
    },
    async login(email, password) {
      this.error = null;
      this.isPending = true;

      try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        if (!res) {
          this.error = "Could not sign in.  Please try again later";
          this.isPending = false;
        } else {
          
          // check to see if user is an admin
          const idTokenResult = await getAuth().currentUser.getIdTokenResult()
     
            // Confirm the user is an Admin.
          if (!!idTokenResult.claims.admin) {

              this.setAdmin(true);
          }
          this.setUser(res.user);
          this.error = null;
          this.isPending = false;
        }
      } catch (err) {
        console.log(err.message);
        this.error = mapAuthCodeToMessage(err.code);
        this.isPending = false;
      }
    },
    async logout() {
    
      this.isPending = true;

      try {
        await signOut(auth);
        this.setUser(null);
        this.isPending = false;
        
      } catch (err) {
        console.log(err.message);
        this.isPending = false;
      }
    },
  },
});

const authStore = useAuthStore()

// check on startup if user is logged in or not
const unsub = onAuthStateChanged(auth, (user) => {
  
  authStore.setAuthIsReady(true)
  authStore.setUser(user)
  //we only want to do this once at startup otherwise it will fire when ever a user loggins in or out
  unsub()
})

const mapAuthCodeToMessage = (authCode) => {
  switch (authCode) {
    case "auth/user-not-found":
      return "Incorrect email address.  Please try again.";
      
    case "auth/wrong-password":
      return "Incorrect Password.  Please try again.";

    case "auth/invalid-password":
      return "Password provided is not corrected";

    case "auth/invalid-email":
      return "Email provided is invalid";

    case "auth/email-already-in-use":
      return "Email address is already in use";

    default:
      return authCode;
  }
};

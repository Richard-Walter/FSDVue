import { defineStore } from "pinia";

// firebase imports
import { auth } from "../firebase/config";
import {
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    isPending: false,
    error: null,
  }),
  getters: {
    //euqivalent of computed values
    // doubleCount: (state) => state.counter * 2,
    getUsername: (state) => {
      if (state.user){
        return state.user.email;
      }
      return 'No user logged in'
  },
    
  },
  actions: {
    setUser(payload) {
      this.user = payload;
      console.log("user state changed", this.user);
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
        const res = await signOut(auth);
        if (!res) {
          console.log(res)
          this.error = "Could not sign out";
          this.isPending = false;
        } else {
        
          this.setUser(null);
          this.isPending = false;
        }
      } catch (err) {
        console.log(err.message);
        this.isPending = false;
      }
    },
  },
});

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

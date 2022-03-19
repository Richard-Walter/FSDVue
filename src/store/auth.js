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
    // doubleCount: (state) => state.counter * 2,
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
          this.user = this.setUser(res.user);
          this.error = null;
          this.isPending = false;
        }
      } catch (err) {
        console.log(err.message);
        this.error = mapAuthCodeToMessage(err.code);
        this.isPending = false;
      }
    },
  },
});

const mapAuthCodeToMessage = (authCode) => {
  switch (authCode) {
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

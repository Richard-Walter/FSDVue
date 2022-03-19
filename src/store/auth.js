import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {

    setUser(payload){
      this.user = payload
      console.log('user state changed', user);
    },
    
  },
});

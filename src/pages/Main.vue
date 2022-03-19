<template>
  <q-page class="">
    <HomeSlider />
    <HomeSearchBar />
    <p>Current user is: {{ authStore.getUsername}}</p>
    <TipsAndTricks />
    <GoogleMap />
    <PopularDestinations />
    <QuotesCarousel />
  </q-page>
</template>

<script setup>
import {ref, computed} from 'vue';
import HomeSlider from '../components/HomeCarousel.vue'
import HomeSearchBar from '../components/HomeSearchBar.vue';
import TipsAndTricks from 'src/components/TipsAndTricks.vue';
import GoogleMap from 'src/components/GoogleMap.vue';
import PopularDestinations from 'src/components/PopularDestinations.vue';
import QuotesCarousel from 'src/components/QuotesCarousel.vue';

// import getFlaskData from 'src/composables/getFlaskData';
// const flaskGreeting = ref("")
// const {flask_data, error, load} = getFlaskData('greeting')
// load()

import { useAuthStore } from '../store/auth.js'
const authStore = useAuthStore()
console.log( authStore.getUsername);

// const username = computed(()=> {
//   let user = authStore.user
//   if (user) {
//     return user.email
//   }
//   return ' no user logged in'

// })


</script>


<style lang="scss" scoped>

</style>

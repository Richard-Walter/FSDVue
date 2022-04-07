<template>
  <q-page class="">

    <p>Current user is: {{ authStore.getUsername}}</p>
    <TipsAndTricks />
       <ActiveFlightBar/>
    <GoogleMap />
    <GoogleMapModals/>
    <PopularDestinations />
    <QuotesCarousel />
  </q-page>

</template>

<script setup>
import {ref, computed} from 'vue';
import HomeSlider from '../components/HomeCarousel.vue'
import HomeSearchBar from '../components/HomeSearchBar.vue';
import TipsAndTricks from 'src/components/TipsAndTricks.vue';
import GoogleMap from 'src/components/googlemaps/GoogleMap.vue';
import GoogleMapModals from 'src/components/googlemaps/GoogleMapModals.vue';
import PopularDestinations from 'src/components/PopularDestinations.vue';
import QuotesCarousel from 'src/components/QuotesCarousel.vue';
import ActiveFlightBar from 'src/components/ActiveFlightBar.vue';

// import getFlaskData from 'src/composables/getFlaskData';
// const flaskGreeting = ref("")
// const {flask_data, error, load} = getFlaskData('greeting')
// load()

// import getCollection from '../composables/getCollection';
import { useAuthStore } from '../store/auth.js'

// const {pois} = getCollection('test')
// console.log(pois);

    //<HomeSlider />
    //<HomeSearchBar />

const authStore = useAuthStore()

</script>


<style lang="scss" scoped>

</style>

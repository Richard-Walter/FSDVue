<template>
  <q-page class="">
    <HomeSlider />
    <HomeSearchBar />
      <p>Current user is: {{ authStore.user }}</p>
    <TipsAndTricks />
    <GoogleMap />
    <PopularDestinations />
    <QuotesCarousel />
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import HomeSlider from '../components/HomeCarousel.vue'
import HomeSearchBar from '../components/HomeSearchBar.vue';
import TipsAndTricks from 'src/components/TipsAndTricks.vue';
import GoogleMap from 'src/components/GoogleMap.vue';
import PopularDestinations from 'src/components/PopularDestinations.vue';
import QuotesCarousel from 'src/components/QuotesCarousel.vue';

// import getFlaskData from 'src/composables/getFlaskData';

import { useAuthStore } from '../store/auth.js'

// const flaskGreeting = ref("")
// const {flask_data, error, load} = getFlaskData('greeting')
// load()

const authStore = useAuthStore()
authStore.setUser('Richard')

</script>


<style lang="scss" scoped>

</style>

<template>
  <q-page class="">
    <HomeSlider />
    <HomeSearchBarVue />
    <p class="">{{ flask_data.greeting }}</p>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import HomeSlider from '../components/HomeCarousel.vue'
import HomeSearchBarVue from 'src/components/HomeSearchBar.vue';
import getFlaskData from 'src/composables/getFlaskData';

const flaskGreeting = ref("")
const {flask_data, error, load} = getFlaskData('greeting')

load()

</script>

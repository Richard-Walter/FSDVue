<template>
  <q-img class="" src="..\assets\img\banner\contact_us.png" alt="" />
</template>

<script setup>
import { ref } from 'vue';
import getFlaskData from 'src/composables/getFlaskData';

const greeting = ref("Hello, from Vue!")
const flaskGreeting = ref("")
const {flask_data, error, load} = getFlaskData('greeting')

load()

</script>

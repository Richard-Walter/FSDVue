<template>
  <q-img class="" src="..\assets\img\banner\account_bg.png" alt="" />
</template>

<script setup>
import { ref } from 'vue';
import getFlaskData from 'src/composables/getFlaskData';

const greeting = ref("Hello, from Vue!")
const flaskGreeting = ref("")
const {flask_data, error, load} = getFlaskData('greeting')

load()

</script>

<!-- 
<template>
  <q-img class="" src="images\banner\about_us.jpg" alt="" />
</template>


<script setup>
import { ref } from 'vue';
import getFlaskData from 'src/composables/getFlaskData';

const greeting = ref("Hello, from Vue!")
const flaskGreeting = ref("")
const {flask_data, error, load} = getFlaskData('greeting')

load()

</script> -->

<template>
  <div>
    <p>hello</p>
    <q-toggle v-model="store.counter" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCounterStore } from '../store/test.js'

const store = useCounterStore()

</script>
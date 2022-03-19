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

<script>
import { computed } from 'vue'
import { useCounterStore } from '../store/example-store.js'

export default {
  setup () {
    const store = useCounterStore()

    return {
      // you can return the whole store instance to use it in the template
      store
    }
  }
}
</script>
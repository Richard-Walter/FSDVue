<template>
  <q-layout containerview="hHh lpR fff" class="body">
    <q-header class="bg-white text-black site_header">
      <Navbar />
    </q-header>

    <q-page-container class="page_container">
      <router-view />
    </q-page-container>

    <q-footer elevated class="q-pa-lg text-center site_footer">
      <div>Copyright © 2022 All rights reserved | Images from MSFS website</div>
    </q-footer>
  </q-layout>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'


</script>

<!-- <script>
import { ref } from "vue";

export default {
  setup() {
    const rightDrawerOpen = ref(false);

    return {
      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
    };
  },
};
</script> -->

<style scoped>
.navbar_logo {
  margin-left: 1em;
  margin-right: 2em;
  background-color: white;
}
.body {
  /* max-width: 100em; */
  margin-left: auto;
  margin-right: auto;
}
.site_footer {
  color: #7a838b;
  background-color: #040e27;
  font-size: 0.8rem;
}
.site_header {
  display: flex;
  align-items: center;
  background-color: white;
  height: 6em;
}
.page_container {
  margin-left: auto;
  margin-right: auto;
  max-width: 130em;
  background-color: #ffffff;
}
.navbar-brand {
  display: inline-block;
  padding-top: 0.3125rem;
  padding-bottom: 0.3125rem;
  margin-right: 1rem;
  font-size: 1.25rem;
  line-height: inherit;
  white-space: nowrap;
}
</style>

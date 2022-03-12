<template>
  <q-toolbar class="navbar">
    <!-- <q-toolbar-title class="q-ma-md"> -->
    <div class="navbar_logo">
      <router-link to="/">
        <a class="navbar-brand mr-5" href="/">
          <img src="../assets/img/logo.png" />
        </a>
      </router-link>
    </div>

    <!-- All users -->
    <q-tabs
      v-if="$q.screen.gt.sm"
      indicator-color="transparent"
      active-color="light-blue-4"
      align="left"
      inline-label
    >
      <!-- <q-route-tab to="/" label="Home" /> -->
      <q-route-tab to="/stats" label="Stats" />
      <q-route-tab to="/about" label="About" />
      <q-route-tab to="/Contact" label="contact" />
    </q-tabs>
    <q-space></q-space>
    <!-- logged out users -->
    <div v-if="!user">
      <q-tabs
        v-if="$q.screen.gt.sm"
        indicator-color="transparent"
        active-color="light-blue-4"
        align="left"
        inline-label
      >
        <!-- <q-route-tab to="/" label="Home" /> -->
        <q-route-tab to="/login" label="Login" />
        <q-route-tab to="/register" label="Register" />
      </q-tabs>
    </div>

    <!-- logged in users -->
    <div v-if="user">
      <q-btn dense flat no-wrap icon="account_circle">
        <q-icon name="arrow_drop_down" size="16px" />

        <q-menu auto-close style="width: 10rem">
          <q-list dense>
            <q-item class="GL__menu-link-signed-in">
              <q-item-section>
                <div>Signed in as</div>
                <div><strong>Geomatix</strong></div>
              </q-item-section>
            </q-item>
            <q-separator />
            <q-separator />
            <q-item clickable class="GL__menu-link">
              <q-item-section>Points of Interest</q-item-section>
            </q-item>
            <q-item clickable class="GL__menu-link">
              <q-item-section>Recorded Flights</q-item-section>
            </q-item>
            <q-item clickable class="GL__menu-link">
              <q-item-section>Flight Plans</q-item-section>
            </q-item>
            <q-item clickable class="GL__menu-link">
              <q-item-section>Airports</q-item-section>
            </q-item>
            <q-item clickable class="GL__menu-link">
              <q-item-section>Update Account</q-item-section>
            </q-item>
            <q-item clickable class="GL__menu-link">
              <q-item-section @click="signOutUser">Sign out</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>
    <q-btn
      v-if="$q.screen.gt.sm"
      @click="$router.replace('https://www.buymeacoffee.com/FSDiscovery')"
      label="Donate"
      class="q-ml-md"
      style="color: white; background-color: #dc3545"
    />

    <!-- Right=hand Drawer-->
    <q-btn
      v-if="$q.screen.lt.md"
      flat
      @click="drawer = !drawer"
      round
      dense
      icon="menu"
    />
    <q-drawer
      v-model="drawer"
      side="right"
      :width="200"
      :breakpoint="500"
      bordered
      overlay
      class="bg-grey-3"
    >
      <q-list>
        <template v-for="(menuItem, index) in menuList" :key="index">
          <div v-if="menuItem.display === 'all'">
            <q-item clickable :to="menuItem.route" v-ripple>
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index" v-if="menuItem.separator" />
          </div>
          <div v-if="user">
            <div v-if="menuItem.display === 'logged_in'">
              <q-item clickable :to="menuItem.route" v-ripple>
                <q-item-section avatar>
                  <q-icon :name="menuItem.icon" />
                </q-item-section>
                <q-item-section>
                  {{ menuItem.label }}
                </q-item-section>
              </q-item>
              <q-separator :key="'sep' + index" v-if="menuItem.separator" />
            </div>
          </div>
          <div v-if="!user">
            <div v-if="menuItem.display === 'logged_out'">
              <q-item clickable :to="menuItem.route" v-ripple>
                <q-item-section avatar>
                  <q-icon :name="menuItem.icon" />
                </q-item-section>
                <q-item-section>
                  {{ menuItem.label }}
                </q-item-section>
              </q-item>
              <q-separator :key="'sep' + index" v-if="menuItem.separator" />
            </div>
          </div>
        </template>
      </q-list>
    </q-drawer>
  </q-toolbar>
</template>

<script setup>
import { ref } from "vue";
const menuList = ref([
  {
    icon: "insights",
    label: "Stats",
    route: "/stats",
    separator: false,
    display: "all",
  },
  {
    icon: "info",
    label: "About",
    route: "/about",
    separator: false,
    display: "all",
  },
  {
    icon: "mail",
    label: "Contact",
    route: "/contact",
    separator: false,
    display: "all",
  },
  {
    icon: "login",
    label: "Login",
    route: "/login",
    separator: false,
    display: "logged_out",
  },
]);
const drawer = ref(false);
const user = ref(false);
</script>

<style scoped>
.navbar_logo {
  margin-left: 1em;
  margin-right: 2em;
  background-color: white;
}
</style>

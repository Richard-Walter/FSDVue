<template>
  <div class="container">
    <div id="home_search_bar_container">
      <div class="q-mx-md text-h6">Where you want to explore?</div>
      <div>
        <q-select
          outlined
          v-model="model"
          :options="options"
          label="Category"
          dark
          label-color="grey"
          color="primary"
        />
      </div>
      <div>
        <q-select
          outlined
          v-model="model"
          :options="options"
          label="Region"
          dark
          label-color="grey"
          color="primary"
        />
      </div>
      <div>
        <q-select
          outlined
          v-model="model"
          :options="options"
          label="Country"
          dark
          label-color="grey"
          color="primary"
        />
      </div>
      <div>
        <q-select
          outlined
          v-model="model"
          :options="options"
          label="Rating"
          dark
          label-color="grey"
          color="primary"
        />
      </div>
      <div>
        <q-btn
          @click="searchPois"
          class="search_btn"
          label="Search"
          size="1.1em"
          color="negative"
          no-caps
        />
      </div>
    </div>
    <div class="show_my_flights_container">
      <q-checkbox
        dark
        size="xs"
        v-model="showFlights"
        label="show my flights"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

const model = ref(null);
const showFlights = ref(false);
const options = ["Google", "Facebook", "Twitter", "Apple", "Oracle"];
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Nothing+You+Could+Do&display=swap");


.container{
  background-color: $dark_blue;
  color: white;
  padding: 2em;
  color: white;

}
#home_search_bar_container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.show_my_flights_container {
}



.q-field {
  min-width: 10em;
  margin-right: 2em;
}

.search_btn:hover {
  background: #1dc6b6 !important;
  color: #fff !important;
}
</style>

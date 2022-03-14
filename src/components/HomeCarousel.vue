<template>
  <div class="">
    <q-carousel
      animated
      v-model="slide"
      infinite
      :autoplay="autoplay"
      arrows
      transition-prev="slide-right"
      transition-next="slide-left"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
    >
      <q-carousel-slide
        
        v-for="(item, index) in banner_items"
        :key="item.id"
        :name="index"
        :img-src="item.image_url"
      >
        <div class="absolute-center custom-caption">
          <div class="text-h1">{{ item.text }}</div>
          <a
            href="#where_togo_area"
            class="explore_now_btn"
            data-value="46.818188, 8.227512, 7"
            >Explore Now</a
          >
        </div>
      </q-carousel-slide>

    </q-carousel>
  </div>
</template>

<script setup>
import { ref } from "vue";

const slide = ref(1);
const autoplay = ref(true);
const banner_items = [
  { id: 2, text: "France", image_url: "images/banner/banner2.jpg" },
  { id: 1, text: "Australia", image_url: "images/banner/banner1.jpg" },
];
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Nothing+You+Could+Do&display=swap");
.custom-caption {
  font-family: "Nothing You Could Do", cursive;
  text-align: center;
  padding: 12px;
  color: white;
}

.explore_now_btn {
  background: #1ec6b6;
  color: #fff;
  display: inline-block;
  padding: 18px 41px;
  font-family: "Rubik", sans-serif;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  border: 0;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  text-align: center;
  text-transform: capitalize;
  -webkit-transition: 0.3s;
  -moz-transition: 0.3s;
  -o-transition: 0.3s;
  transition: 0.3s;
  cursor: pointer;
}

.explore_now_btn:hover {
  background: #ff4a52;
  color: #fff !important;
}

.explore_now_btn:focus {
  outline: none;
}
</style>

<template>
  <div class="tips-and-tricks">
    <q-carousel
      animated
      v-model="slide"
      infinite
      :autoplay="9999"
      transition-prev="slide-right"
      transition-next="slide-left"
    >
      <q-carousel-slide
        div
        v-for="(item, index) in display_items"
        :key="item.id"
        :name="index"
      >
        <div class="flex-center">
          <div class="text-small q-mb-sm">{{ item.text }}</div>
        </div>
      </q-carousel-slide>

      <!-- <q-carousel-slide
        :name="2"
        img-src="..\assets\img\banner\banner2.jpg"
      >
        <div class="absolute-center custom-caption">
          <div class="text-h1">Australia</div>
          <a href="#where_togo_area" class="explore_now_btn" data-value="46.818188, 8.227512, 7">Explore Now</a>
        </div>
      </q-carousel-slide>
      <q-carousel-slide
        :name="1"
        img-src="..\assets\img\banner\banner1.jpg"
      >
        <div class="absolute-center custom-caption">
          <div class="text-h1">Australia</div>
          <a href="#where_togo_area" class="explore_now_btn" data-value="46.818188, 8.227512, 7">Explore Now</a>
        </div>
      </q-carousel-slide> -->
    </q-carousel>
  </div>
</template>

<script setup>
import { ref } from "vue";

const slide = ref(1);

const display_items = [
  { id: 3, text: "Flights can now be recorded and displayed on the map by downloading the in-game mod at https://flightsim.to/file/20403/flight-sim-discovery-vr-compatible"},
  { id: 2, text: "Right-click on map to add a custom waypoint to flightplan"},
  { id: 1, text: "Special thanks to everyone that has donated. Total money raised for the ORBIS Flying Eye Hospital is $50.00"},
];
</script>

<style lang="scss" scoped>

.flex-center{

  display: flex;
  justify-content: center;
  align-content: center;

}
.q-carousel{
  background-color: $positive;
  height: 4em;
  width: 100%;
  color: white;
}

</style>

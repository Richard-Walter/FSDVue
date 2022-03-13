<template>
  <q-carousel
    animated
    v-model="slide"
    infinite
    height="12em"
    navigation
    swipeable
    control-color="red"
    :autoplay="6000"
    transition-prev="slide-right"
    transition-next="slide-left"
  >
    <q-carousel-slide
      class="flex-center column no-wrap"
      div
      v-for="(item, index) in display_items"
      :key="item.id"
      :name="index"
    >
      <div class="text-body1 text-italic text-weight-medium">{{ item.text }}</div>
      <div class="text-subtitle2 q-mt-sm" style="color:#7a7264">{{ item.author }}</div>
    </q-carousel-slide>
  </q-carousel>
</template>

<script setup>
import { ref } from "vue";

const slide = ref(1);

const display_items = [
  {
    id: 3,
    text: "“We were meant to explore this earth like children do,unhindered by fear, propelled by curiosity and a sense of discovery.”",
    author: "- Laurel Bleadon Maffei",
  },
  {
    id: 2,
    text: "“I haven't been everywhere, but its on my list.”",
    author: "- Susan Sontag",
  },
  {
    id: 1,
    text: "If we were meant to stay in one place we’d have roots instead of feet.",
    author: "- Rachel Wolchin",
  },
];
</script>

<style lang="scss" scoped>
.q-carousel {
  background-color: #f7fafd;
  width: 100%;
  color: black;
}
</style>

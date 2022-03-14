<template>
  <div class="text-h4 q-mt-xl" style="text-align: center">
    Popular Desitnations
  </div>
  <div
    class="text-subtitle1 q-mt-sm q-mb-lg"
    style="color: #7a7264; text-align: center"
  >
    Come and explore the most popular places visited by flight sim users
  </div>
  <div class="q-pa-md">
    <div class="q-col-gutter-md row items-start">
      <div
        v-for="(item) in pop_dest_items"
        :key="item.id"
        :class="[col_class, 'top_ten']"
      >
        <q-img 
          :src=item.img_src>
          <div
            class="absolute-bottom text-subtitle1 text-center top_ten_caption"
          >
            {{item.region}} <a :href=item.href> top 10</a>
          </div>
        </q-img>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();
const col_class = computed(() => {
  return $q.screen.lt.md ? "col-6" : "col-4";
});

const pop_dest_items = [
  { id: 6, region: "Africa", img_src:"images/destination/Africa.jpg", href: "/topten_pois/africa"},
  { id: 5, region: "Asia", img_src:"images/destination/Asia.jpg", href: "/topten_pois/asia"},
  { id: 4, region: "Europe", img_src:"images/destination/Europe.jpg", href: "/topten_pois/Europe"},
  { id: 3, region: "South America", img_src:"images/destination/South_America.jpg", href: "/topten_pois/south_america"},
  { id: 2, region: "North America", img_src:"images/destination/North_America.jpg", href: "/topten_pois/north_america"},
  { id: 1, region: "Oceania", img_src:"images/destination/Oceania.jpg", href: "/topten_pois/oceania"},

];
</script>

<style lang="scss" scoped>
.top_ten a {
  text-decoration: none;
  display: inline-block;
  background: #1ec6b6;
  font-size: 12px;
  border-radius: 30px;
  font-weight: 400;
  padding: 0px 12px;
  height: 25px;
  line-height: 25px;
  color: #fff;
  margin-left: 10px;
  transition: 0.3s;
}

.top_ten:hover {
  transform: translateY(-10px);
}

.top_ten:hover .top_ten_caption {
  color: $negative;
}
.top_ten:hover a {
  background-color: $negative;
}
</style>

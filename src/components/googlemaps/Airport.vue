<template>
  <div></div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { ref, onMounted, onUnmounted, onBeforeMount, watch } from "vue";
import { useGoogleMapStore } from "../../store/googleMap.js";

const mapStore = useGoogleMapStore();
const props = defineProps(["airport"]);

let clickListener = null;
const { isLoading } = storeToRefs(mapStore);

// onMounted(() => {
//   if (props.airport) {
//     addAirportMarker(props.airport);
//   }
// });
watch(isLoading, () => {
  console.log('watch called')
  if (props.airport) {
    addAirportMarker(props.airport);
  }
})

onUnmounted(async () => {
  if (clickListener) clickListener.remove();
});

const addAirportMarker = (airport) => {

  console.log(airport);
  const icon = "/images/marker/ms_airport_marker.png";
  const icon_visited = "/images/marker/ms_airport_marker_visited.png";
  const icon_large = "/images/marker/ms_airport_marker_large.png";
  const icon_visited_large = "/images/marker/ms_airport_marker_visited_large.png";

  const map = mapStore.map;
  const googlemaps = mapStore.googlemaps;
  console.log(map, googlemaps);

  let icao = airport["icao"];
  let airport_name = airport["name"];
  let airport_city = airport["city"];
  let airport_title = airport_name + " (" + icao + "), " + airport_city;
  let lat = parseFloat(airport["latitude"]);
  let lng = parseFloat(airport["longitude"]);
  let elevation = parseFloat(airport["elevation"]);
  let show_on_map = airport["Show_on_map"];
  let tower_freq = airport["tower_frequency"];
  let id = airport["id"];
  // let rating_score = getAirportRatingID(id);

  let search_name = airport_name + " airport ";

  if (show_on_map != 1) return;

  //set airport icon depending on size and if user has visited the airport
  //   if (tower_freq && tower_freq != "0") {
  //     if (user_airports_visited.has(id)) {
  //       icon = icon_visited_large;
  //     } else {
  //       icon = icon_large;
  //     }
  //   } else {
  //     if (user_airports_visited.has(id)) {
  //       icon = icon_visited;
  //     } else {
  //       icon = icon;
  //     }
  //   }

  const category = "Airport";

  let airportMarker = new googlemaps.Marker({
    position: { lat: lat, lng: lng },
    icon:icon,
    title: airport_title,
  });

  airportMarker.setMap(map);
};
</script>

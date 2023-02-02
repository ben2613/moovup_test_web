<script setup>
import { onMounted } from 'vue';
import { Loader } from '@googlemaps/js-api-loader';
const props = defineProps({
  center: Object,
})

function initMap() {
  const loader = new Loader({
    apiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
    version: "weekly",
    libraries: ["drawing"]
  });
  loader.loadCallback(e => {
    // The location of Uluru
    const friend = props.center;
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: friend,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
      position: friend,
      map: map,
    });
  })
}

onMounted(initMap)

</script>
<template>
<div id="map"></div>
</template>
<style>
#map {
  height: 400px; /* The height is 400 pixels */
  width: 100%; /* The width is the width of the web page */
}
</style>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useFriendsStore } from '@/stores/friends'
import GoogleMapEmbed from '@/components/GoogleMapEmbed.vue'

const route = useRoute()
const store = useFriendsStore()
const friend = computed(() => {
  return typeof store.friends[route.params.id] === 'undefined' ? null :
    store.friends[route.params.id]
})
const msg = 'hi'
</script>

<template>
  <div>
    <div v-if="friend.location.longitude === null">
      I am getting null at this location.longitude, if this is not expected please check your API
    </div>
    <GoogleMapEmbed v-if="friend" :center="{lat: friend.location.latitude ?? 0, lng: friend.location.longitude ?? 0}" />
    {{ friend?.name.last }}

  </div>
</template>

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
    <v-alert type="warning" class="mb-2" v-if="friend !== null && friend.location.longitude === null">
      I am getting null value at this location.longitude, if this is not expected please check your API
    </v-alert>
    <v-card v-if="friend" class="mx-auto">
      <GoogleMapEmbed :center="{lat: friend.location.latitude ?? 0, lng: friend.location.longitude ?? 0}" />
      <v-list-item
        :title="friend.name.first + ' ' + friend.name.last"
        :prepend-avatar="friend.picture"
        :subtitle="friend.email"
      />
    </v-card>

  </div>
</template>

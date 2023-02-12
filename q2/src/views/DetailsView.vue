<script setup>
import { watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFriendsStore } from '@/stores/friends'
import GoogleMapEmbed from '@/components/GoogleMapEmbed.vue'

const route = useRoute()
const router = useRouter()
const store = useFriendsStore()
const friend = computed(() => {
  return typeof store.friends[route.params.id] === 'undefined' ? null :
    store.friends[route.params.id]
})

const isFriendListReady = computed(() => {
  return store.friends.length > 0;
})
watch(isFriendListReady, async(newValue, oldValue) => {
  console.log(newValue)
  console.log(friend.value === null)
  if (newValue && friend.value === null) {
    router.push('/404')
  }
})
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

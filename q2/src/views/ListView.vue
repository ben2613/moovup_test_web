<script setup>
import { useFriendsStore } from '@/stores/friends'
const store = useFriendsStore()
console.log(store.friends)
</script>

<template>
  <v-list>
    <v-list-item
      v-for="(item, index) in store.friends" :key="index"
      :title="item.name.first + item.name.last"
      :prepend-avatar="item.picture"
      >
    </v-list-item>
  </v-list>
</template>

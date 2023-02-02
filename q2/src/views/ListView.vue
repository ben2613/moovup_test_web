<script setup>
import { useFriendsStore } from '@/stores/friends'
const store = useFriendsStore()
</script>

<template>
  <v-list>
    <v-list-item
      v-for="(item, index) in store.friends" :key="index"
      :title="item.name.first + ' ' + item.name.last"
      :prepend-avatar="item.picture"
      :to="'/friends/' + index"
      >
    </v-list-item>
  </v-list>
</template>

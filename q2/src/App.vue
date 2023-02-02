<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
import { useFriendsStore } from '@/stores/friends'

const store = useFriendsStore()
const friends = ref(store.friends)

console.log(friends)
</script>

<template>
  <header>

  </header>

  <RouterView />
</template>

<style scoped>
</style>

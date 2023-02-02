<script setup>
import { RouterView } from 'vue-router'
import { useFriendsStore } from '@/stores/friends'

useFriendsStore() // init when enter apps

</script>

<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-nav-icon>
        <v-icon v-if="$route.path === '/'" icon="mdi-home" />
        <v-btn v-else icon :to="{name:'home'}"><v-icon icon="mdi-arrow-left"></v-icon></v-btn>
      </v-app-bar-nav-icon>
      <v-app-bar-title>
        {{ $route.meta.title }} 
      </v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row justify="center" align="center">
          <v-col cols="12" sm="8">
            <RouterView />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
</style>

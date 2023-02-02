import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'

export const useFriendsStore = defineStore('friends', () => {
  const friends = ref([]);

  function getFriends() {
    fetch(import.meta.env.VITE_API_URL, {
      headers: {Authorization: 'Bearer ' + import.meta.env.VITE_API_PUBLIC_KEY}
    })
      .then(response => response.json())
      .then(data => {
        friends.value = data
        console.log('Friends fetched')
      })
      .catch((error) => {
        console.log(error)
      })
  };

  onMounted(getFriends);

  return {
    friends,
    getFriends
  }
})

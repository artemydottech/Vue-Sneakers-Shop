<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import CardList from '../components/CardList.vue'

const favoritesItems = ref([])

const fetchFavorites = async () => {
  try {
    // isCreatingOrder.value = true
    const { data: favorites } = await axios.get(`https://3c5b6e4314bc9170.mokky.dev/favorites`)

    const favoritesSneakers = favorites.map((favorite) => {
      return favorite.parentId
    })

    const params = { id: favoritesSneakers, sortBy: 'title' }

    const { data } = await axios.get(`https://3c5b6e4314bc9170.mokky.dev/sneakers`, {
      params
    })

    console.log(favorites)
    console.log(data)
    favoritesItems.value = data.map((item) => ({
      ...item,
      isFavorite: true
    }))
  } catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  await fetchFavorites()
})
</script>

<template>
  <CardList :items="favoritesItems" />
</template>

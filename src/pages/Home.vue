<!-- eslint-disable no-unused-vars -->
<script setup>
import axios from 'axios'
import { inject, ref, reactive, watch, onMounted, computed, watchEffect } from 'vue'
import { useMainStore } from '../stores/MainStore.ts'
import CardList from '../components/CardList.vue'

const { addToCart, removeFromCart, cart } = inject('cartActions')

const mainStore = useMainStore()

const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}

const onChangeSearchInput = (event) => {
  filters.searchQuery = event.target.value
}

const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}

const items = ref([])

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    }

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }

    const { data } = await axios.get(`https://91e076eff4e58ce7.mokky.dev/sneakers`, {
      params
    })

    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      favoriteId: null,
      isAdded: false
    }))
  } catch (err) {
    console.log(err)
  }
}

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        parentId: item.id
      }

      item.isFavorite = true

      const { data } = await axios.post(`https://91e076eff4e58ce7.mokky.dev/favorites`, obj)

      item.favoriteId = data.id
    } else {
      item.isFavorite = false
      await axios.delete(`https://91e076eff4e58ce7.mokky.dev/favorites/${item.favoriteId}`)
      item.favoriteId = null
    }
  } catch (err) {
    console.log(err)
  }
}

const fetchFavorites = async () => {
  try {
    // isCreatingOrder.value = true
    const { data: favorites } = await axios.get(`https://91e076eff4e58ce7.mokky.dev/favorites`)

    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.parentId === item.id)

      if (!favorite) {
        return item
      }

      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id
      }
    })
  } catch (err) {
    console.log(err)
  }
}

watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false
  }))
})

watch(filters, fetchItems)

watch(
  cart,
  () => {
    console.log(cart.value)
  },
  {
    deep: true
  }
)

onMounted(async () => {
  const localCart = localStorage.getItem('cart')

  cart.value = localCart ? JSON.parse(localCart) : []

  await fetchItems()
  await fetchFavorites()

  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
  }))
})
</script>

<template>
  <div class="flex justify-between items-center search__wrapper">
    <h2 class="text-3xl font-bold mb-8">Все кроссовки</h2>

    <div class="flex gap-4 filters__wrapper">
      <select @change="onChangeSelect" class="py-2 px-3 border rounded-md outline-none">
        <option value="title">По названию</option>
        <option value="price">По цене (Дешевые)</option>
        <option value="-price">По цене (Дорогие)</option>
      </select>

      <div class="relative">
        <img class="absolute left-4 top-3" src="/search.svg" alt="search" />
        <input
          @change="onChangeSearchInput"
          class="border rounded-md py-1.5 pl-11 pr-4 outline-none focus:border-gray-400"
          placeholder="Поиск..."
        />
      </div>
    </div>
  </div>

  <div class="mt-10">
    <CardList :items="items" @add-to-favorite="addToFavorite" @add-to-cart="onClickAddPlus" />
  </div>
</template>

<style lang="scss">
@media screen and (max-width: 1200px) {
  .search__wrapper {
    flex-direction: column;
  }
}

@media screen and (max-width: 720px) {
  .filters__wrapper {
    flex-direction: column;
  }
}
</style>

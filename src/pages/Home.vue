<script setup lang="ts">
import axios from 'axios'
import { ref, reactive, computed, onMounted, watch } from 'vue'
import CardList from '../components/CardList.vue'
import { useCart } from '../composables/useCart'

const { addToCart, removeFromCart, cart } = useCart()

const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})

const onChangeSelect = (event: InputEvent) => {
  const target = event.target as HTMLSelectElement
  filters.sortBy = target.value
}

const onChangeSearchInput = (event: Event) => {
  filters.searchQuery = (event.target as HTMLInputElement).value
}

const isInCart = computed(() => {
  const ids = new Set(cart.value.map((item: any) => item.id))
  return (id: number) => ids.has(id)
})

const onClickAddPlus = (item: any) => {
  if (isInCart.value(item.id)) {
    removeFromCart(item)
  } else {
    addToCart(item)
  }
}

const items = ref<any[]>([])

const fetchItems = async () => {
  try {
    const params = { sortBy: filters.sortBy }
    const { data } = await axios.get(`https://91e076eff4e58ce7.mokky.dev/sneakers`, { params })

    items.value = data.map((obj: any) => ({
      ...obj,
      isFavorite: false,
      favoriteId: null,
      isAdded: isInCart.value(obj.id)
    }))
  } catch (err) {
    console.log(err)
  }
}

const addToFavorite = async (item: any) => {
  try {
    if (!item.isFavorite) {
      const params = { parentId: item.id }
      item.isFavorite = true
      const { data } = await axios.post(`https://91e076eff4e58ce7.mokky.dev/favorites`, params)
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
    const { data: favorites } = await axios.get(`https://91e076eff4e58ce7.mokky.dev/favorites`)

    items.value = items.value.map((item: any) => {
      const favorite = favorites.find((f: any) => f.parentId === item.id)
      if (!favorite) return item

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

watch(filters, fetchItems, { deep: true })

onMounted(async () => {
  await fetchItems()
  await fetchFavorites()

  items.value = items.value.map((item: any) => ({
    ...item,
    isAdded: isInCart.value(item.id)
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
          @input="onChangeSearchInput"
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

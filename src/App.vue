<script setup>
import { ref, watch, provide, computed } from 'vue'
import axios from 'axios'

import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'
import Footer from './components/Footer.vue'
//Корзина!
const cart = ref([])
const drawerState = ref(false)
const isCreatingOrder = ref(false)
const totalPrice = computed(() => {
  return cart.value.reduce((acc, item) => acc + item.price, 0)
})
const vatPrice = computed(() => {
  return Math.round((totalPrice.value * 5) / 100)
})

const isEmptyCart = computed(() => cart.value.length === 0)
const cartButtonDisabled = computed(() => {
  return isEmptyCart.value || isCreatingOrder.value
})

const closeDrawer = () => {
  drawerState.value = false
}

const openDrawer = () => {
  drawerState.value = true
}

const addToCart = (item) => {
  cart.value.push(item)
  item.isAdded = true
}

const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}

const createOrder = async () => {
  try {
    isCreatingOrder.value = true
    const { data } = await axios.post('https://91e076eff4e58ce7.mokky.dev/orders', {
      items: cart.value,
      totalPrice: totalPrice.value + vatPrice.value
    })

    cart.value = []

    return data
  } catch (err) {
    console.log('Ошибка при создании заказа: ', err)
  } finally {
    isCreatingOrder.value = false
  }
}
//Корзина end

//Глубокая проверка, где при каждом добавлении/удалении товара из корзины watch это отслеживает

// Неглубокая проверка на watch

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  {
    deep: true
  }
)

//Provide's, используемые в других файлах
provide('cartActions', {
  cart,
  closeDrawer,
  openDrawer,
  addToCart,
  removeFromCart
})
</script>

<template>
  <Drawer
    v-if="drawerState"
    :total-price="totalPrice"
    :vatPrice="vatPrice"
    :cartButtonDisabled="cartButtonDisabled"
    :is-creating-order="isCreatingOrder"
    :cart="cart"
    @create-order="createOrder"
  />
  <div class="app-container bg-white rounded-xl shadow-xl">
    <Header :total-price="totalPrice" @open-drawer="openDrawer" />

    <div class="content p-10 bg-sky-100">
      <router-view></router-view>
    </div>
    <Footer />
  </div>
</template>

<style scoped>
html,
body {
  height: 100%;
  margin: 0;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}

.content {
  flex: 1;
}
</style>

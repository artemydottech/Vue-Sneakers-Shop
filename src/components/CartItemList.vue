<script setup>
<<<<<<< HEAD
import { inject } from 'vue'
import CartItem from './CartItem.vue'

const { cart, removeFromCart } = inject('cartActions')
</script>

<template>
  <div class="flex flex-col gap-4 flex-1" v-auto-animate>
    <CartItem
      v-for="item in cart"
      :key="item.id"
      :title="item.title"
      :price="item.price"
      :image-url="item.imageUrl"
      @on-click-remove="() => removeFromCart(item)"
    />
=======
import CartItem from './CartItem.vue'
</script>

<template>
  <div class="flex flex-col gap-4 flex-1">
    <CartItem />
    <CartItem />
    <CartItem />
    <CartItem />
    <CartItem />
>>>>>>> 92226327ca8c82e7fbcc3e69e321266e4bfcb895
  </div>
</template>

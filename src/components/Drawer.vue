<script setup>
<<<<<<< HEAD
import { inject } from 'vue'
import DrawerHead from './DrawerHead.vue'
import CartItemList from './CartItemList.vue'
import InfoBlock from './InfoBlock.vue'
const { closeDrawer } = inject('cartActions')
const props = defineProps({
  totalPrice: Number,
  vatPrice: Number,
  cartButtonDisabled: Boolean,
  isCreatingOrder: Boolean,
  cart: Array
})

const emit = defineEmits(['createOrder'])
</script>

<template v-auto-animate>
  <div @click="closeDrawer" class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-40"></div>
  <div
    v-auto-animate
    class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8 flex flex-col justify-between"
  >
    <div>
      <DrawerHead />

      <CartItemList />
    </div>

    <div v-if="cart?.length == 0" class="flex h-full items-center">
      <InfoBlock
        title="Корзина пустая"
        description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
        image-url="public/empty-box.png"
      />
    </div>

    <div v-if="totalPrice" class="flex flex-col gap-5 mt-7">
      <div class="flex gap-2">
        <span>Итого:</span>
        <div class="flex-1 border-b border-dash"></div>
        <b>{{ props.totalPrice + ' ₽' }}</b>
=======
import DrawerHead from './DrawerHead.vue'
import CartItemList from './CartItemList.vue'
</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-40"></div>
  <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
    <DrawerHead />

    <CartItemList />

    <div class="flex flex-col gap-5 mt-7">
      <div class="flex gap-2">
        <span>Итого:</span>
        <div class="flex-1 border-b border-dash"></div>
        <b>12990 руб.</b>
>>>>>>> 92226327ca8c82e7fbcc3e69e321266e4bfcb895
      </div>

      <div class="flex gap-2">
        <span>Налог НДС:</span>
        <div class="flex-1 border-b border-dash"></div>
<<<<<<< HEAD
        <b>{{ props.vatPrice + ' ₽' }}</b>
      </div>

      <button
        :disabled="cartButtonDisabled"
        class="mt-4 bg-lime-500 w-full rounded-xl py-3 text-white hover:bg-lime-600 transition active:bg-lime-700 disabled:bg-slate-300"
        @click="() => emit('createOrder')"
      >
        {{ !isCreatingOrder ? 'Оформить заказ' : 'Загрузка...' }}
=======
        <b>1024 руб.</b>
      </div>

      <button
        disabled="true"
        class="mt-4 bg-lime-500 w-full rounded-xl py-3 text-white hover:bg-lime-600 transition active:bg-lime-700 disabled:bg-slate-300 cursor-pointer"
      >
        Оформить заказ
>>>>>>> 92226327ca8c82e7fbcc3e69e321266e4bfcb895
      </button>
    </div>
  </div>
</template>

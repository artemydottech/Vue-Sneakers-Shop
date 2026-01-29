<script setup lang="ts">
import { isDeviceMobile } from '@/utils'

const emit = defineEmits(['openDrawer'])

defineProps({
  totalPrice: Number
})
</script>

<template>
  <header class="flex justify-between border-b border-slate-200 px-10 py-3 header">
    <div class="header__text">
      <router-link to="/" class="flex items-center gap-4">
        <div class="header__text">
          <h2 class="text-xl font-bold uppercase">Sneakers Shop</h2>
          <p class="text-slate-400">Магазин лучших кроссовок</p>
        </div>
      </router-link>
    </div>

    <div class="flex items-center">
      <ul class="flex items-center gap-10 header__list" v-auto-animate>
        <router-link
          to="/favorites"
          class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer"
        >
          <img src="/heart.svg" alt="Cart" />
          <span v-if="!isDeviceMobile">Закладки</span>
        </router-link>

        <router-link
          to="/profile"
          class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer"
        >
          <img src="/profile.svg" alt="Cart" />
          <span v-if="!isDeviceMobile">Профиль</span>
        </router-link>

        <li
          v-auto-animate
          @click="() => emit('openDrawer')"
          class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer"
        >
          <img src="/cart.svg" alt="Cart" />
          <b v-if="!isDeviceMobile">{{ `${totalPrice} руб.` }}</b>
        </li>
      </ul>
    </div>
  </header>
</template>

<style lang="scss">
.header {
  position: sticky;
  background: #fff;
  top: 0;
  z-index: 2;
}

@media screen and (max-width: 1200px) {
  .header {
    a {
      margin-bottom: 10px;
      text-align: left;
    }

    .header__list {
      justify-content: flex-end;

      align-items: center;
      a {
        margin-bottom: 0px;
      }
    }
  }
}

@media screen and (max-width: 720px) {
  .header__text {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
}
</style>

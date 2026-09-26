<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import UiIcon from './ui-icon.vue'

const props = defineProps<{
  images: string[]
  alt: string
}>()

const activeIndex = ref(0)

watch(
  () => props.images,
  () => {
    activeIndex.value = 0
  }
)

const activeImage = computed(() => props.images[activeIndex.value] ?? props.images[0])
const hasMany = computed(() => props.images.length > 1)

const step = (delta: number) => {
  const count = props.images.length
  activeIndex.value = (activeIndex.value + delta + count) % count
}
</script>

<template>
  <div class="flex flex-col gap-3 lg:flex-row-reverse">
    <div
      class="relative aspect-[4/3] flex-1 overflow-hidden border-rule border-ink bg-tissue"
      role="group"
      aria-roledescription="галерея"
      :aria-label="`Фото ${activeIndex + 1} из ${images.length}`"
      tabindex="0"
      @keydown.left.prevent="step(-1)"
      @keydown.right.prevent="step(1)"
    >
      <Transition
        mode="out-in"
        enter-from-class="opacity-0"
        enter-active-class="transition-opacity duration-pull"
        leave-to-class="opacity-0"
        leave-active-class="transition-opacity duration-100"
      >
        <img :key="activeImage" :src="activeImage" :alt="alt" class="size-full object-cover" />
      </Transition>

      <template v-if="hasMany">
        <button
          type="button"
          aria-label="Предыдущее фото"
          class="absolute bottom-0 left-0 grid size-12 place-items-center border-r-rule border-t-rule border-ink bg-tissue hover:bg-ink hover:text-tissue"
          @click="step(-1)"
        >
          <UiIcon name="arrowLeft" />
        </button>
        <button
          type="button"
          aria-label="Следующее фото"
          class="absolute bottom-0 right-0 grid size-12 place-items-center border-l-rule border-t-rule border-ink bg-tissue hover:bg-ink hover:text-tissue"
          @click="step(1)"
        >
          <UiIcon name="arrowRight" />
        </button>
        <p
          class="absolute bottom-0 left-1/2 -translate-x-1/2 border-x-rule border-t-rule border-ink bg-tissue px-3 py-1.5 font-mono text-xs"
          aria-hidden="true"
        >
          {{ activeIndex + 1 }} / {{ images.length }}
        </p>
      </template>
    </div>

    <div v-if="hasMany" class="flex gap-3 lg:w-24 lg:flex-col">
      <button
        v-for="(image, index) in images"
        :key="image"
        type="button"
        :aria-label="`Показать фото ${index + 1}`"
        :aria-current="index === activeIndex"
        class="aspect-square w-20 shrink-0 overflow-hidden border-rule border-ink bg-tissue transition-transform duration-pull ease-pull lg:w-full"
        :class="
          index === activeIndex
            ? '-translate-y-1 outline outline-2 outline-offset-2 outline-ink'
            : 'hover:-translate-y-1'
        "
        @click="activeIndex = index"
      >
        <img :src="image" alt="" class="size-full object-cover" loading="lazy" />
      </button>
    </div>
  </div>
</template>

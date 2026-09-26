<script setup lang="ts">
import type { SizeStock } from '@/types'
import { SIZE_SYSTEMS, formatSize, type SizeSystem } from '@/utils/sizes'

defineProps<{
  sizes: SizeStock[]
  hasError?: boolean
}>()

const selected = defineModel<Nullable<number>>({ required: true })
const system = defineModel<SizeSystem>('system', { default: 'eu' })

const LOW_STOCK = 2
</script>

<template>
  <fieldset>
    <div class="flex flex-wrap items-center justify-between gap-3">
      <legend class="label-caps float-left text-2xl">Размер</legend>

      <div role="radiogroup" aria-label="Система размеров" class="flex border-rule border-ink">
        <button
          v-for="(label, key) in SIZE_SYSTEMS"
          :key="key"
          type="button"
          role="radio"
          :aria-checked="system === key"
          class="px-3 py-1.5 font-mono text-xs font-bold transition-colors [&:not(:first-child)]:border-l-rule [&:not(:first-child)]:border-ink"
          :class="system === key ? 'bg-ink text-tissue' : 'hover:bg-tissue'"
          @click="system = key"
        >
          {{ label }}
        </button>
      </div>
    </div>

    <div
      class="mt-4 grid grid-cols-4 border-l-rule border-t-rule border-ink sm:grid-cols-6"
      :class="hasError ? 'outline outline-2 outline-offset-4 outline-brick' : ''"
    >
      <label
        v-for="size in sizes"
        :key="size.eu"
        class="relative flex h-14 cursor-pointer items-center justify-center overflow-hidden border-b-rule border-r-rule border-ink font-mono text-base transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:-outline-offset-4 has-[:focus-visible]:outline-ink"
        :class="[
          size.stock === 0
            ? 'cursor-not-allowed bg-board-side/40 line-through decoration-1'
            : selected === size.eu
              ? 'bg-ink font-bold text-tissue'
              : 'bg-tissue hover:bg-white'
        ]"
      >
        <input
          v-model="selected"
          type="radio"
          name="size"
          class="sr-only"
          :value="size.eu"
          :disabled="size.stock === 0"
        />
        <Transition
          mode="out-in"
          enter-from-class="translate-y-3 opacity-0"
          enter-active-class="transition duration-pull ease-pull"
          leave-to-class="-translate-y-3 opacity-0"
          leave-active-class="transition duration-100"
        >
          <span :key="system">{{ formatSize(size.eu, system) }}</span>
        </Transition>
        <span v-if="size.stock === 0" class="sr-only">— нет в наличии</span>
        <span
          v-else-if="size.stock <= LOW_STOCK"
          class="absolute right-1 top-1 size-1.5 bg-brick"
          :title="`Осталось ${size.stock} шт.`"
        />
      </label>
    </div>

    <p class="mt-3 flex items-center gap-2 font-mono text-xs">
      <span class="size-1.5 bg-brick" aria-hidden="true" />
      Последние пары · зачёркнуто — нет в наличии
    </p>
  </fieldset>
</template>

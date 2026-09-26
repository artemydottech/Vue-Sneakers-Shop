<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  CATEGORY_LABELS,
  GENDER_LABELS,
  type CatalogueFilters,
  type Category,
  type Gender
} from '@/types'
import { DEFAULT_FILTERS } from '@/utils/catalogue-filters'
import { SIZE_TABLE, formatSize } from '@/utils/sizes'

const props = defineProps<{
  filters: CatalogueFilters
  brands: string[]
  priceRange: Nullable<{ min: number; max: number }>
}>()

const emit = defineEmits<{
  apply: [filters: CatalogueFilters]
}>()

const cloneFilters = (filters: CatalogueFilters): CatalogueFilters => ({
  ...filters,
  brands: [...filters.brands],
  categories: [...filters.categories],
  genders: [...filters.genders],
  sizes: [...filters.sizes]
})

const draft = ref<CatalogueFilters>(cloneFilters(props.filters))

watch(
  () => props.filters,
  (value) => {
    draft.value = cloneFilters(value)
  },
  { deep: true }
)

const isDirty = computed(() => JSON.stringify(draft.value) !== JSON.stringify(props.filters))

const toggle = <T,>(list: T[], value: T): T[] =>
  list.includes(value) ? list.filter((item) => item !== value) : [...list, value]

const toggleCategory = (category: Category) => {
  draft.value.categories = toggle(draft.value.categories, category)
}
const toggleGender = (gender: Gender) => {
  draft.value.genders = toggle(draft.value.genders, gender)
}
const toggleBrand = (brand: string) => {
  draft.value.brands = toggle(draft.value.brands, brand)
}
const toggleSize = (size: number) => {
  draft.value.sizes = toggle(draft.value.sizes, size)
}

const parsePrice = (event: Event): Nullable<number> => {
  const value = (event.target as HTMLInputElement).value
  if (!value) return null
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null
}

const priceError = computed(() =>
  draft.value.priceMin !== null &&
  draft.value.priceMax !== null &&
  draft.value.priceMin > draft.value.priceMax
    ? 'Минимальная цена больше максимальной'
    : null
)

const apply = () => {
  if (priceError.value) return
  emit('apply', cloneFilters(draft.value))
}

const reset = () => {
  emit('apply', { ...DEFAULT_FILTERS, search: props.filters.search, sortBy: props.filters.sortBy })
}

const chipClass = (isActive: boolean) =>
  [
    'border-rule border-ink px-3 py-2 text-sm transition-colors',
    isActive ? 'bg-ink text-tissue' : 'bg-tissue hover:bg-white'
  ].join(' ')
</script>

<template>
  <form class="space-y-8" @submit.prevent="apply">
    <fieldset>
      <legend class="label-caps mb-3 text-xl">Категория</legend>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="(label, category) in CATEGORY_LABELS"
          :key="category"
          type="button"
          :aria-pressed="draft.categories.includes(category)"
          :class="chipClass(draft.categories.includes(category))"
          @click="toggleCategory(category)"
        >
          {{ label }}
        </button>
      </div>
    </fieldset>

    <fieldset>
      <legend class="label-caps mb-3 text-xl">Для кого</legend>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="(label, gender) in GENDER_LABELS"
          :key="gender"
          type="button"
          :aria-pressed="draft.genders.includes(gender)"
          :class="chipClass(draft.genders.includes(gender))"
          @click="toggleGender(gender)"
        >
          {{ label }}
        </button>
      </div>
    </fieldset>

    <fieldset>
      <legend class="label-caps mb-3 text-xl">Бренд</legend>
      <ul class="grid grid-cols-2 gap-x-4 gap-y-1">
        <li v-for="brand in brands" :key="brand">
          <label class="flex cursor-pointer items-center gap-2.5 py-1.5 text-sm">
            <input
              type="checkbox"
              class="size-4 cursor-pointer accent-ink"
              :checked="draft.brands.includes(brand)"
              @change="toggleBrand(brand)"
            />
            {{ brand }}
          </label>
        </li>
      </ul>
    </fieldset>

    <fieldset>
      <legend class="label-caps mb-3 text-xl">Размер EU</legend>
      <div class="grid grid-cols-4 border-l-rule border-t-rule border-ink">
        <button
          v-for="row in SIZE_TABLE"
          :key="row.eu"
          type="button"
          :aria-pressed="draft.sizes.includes(row.eu)"
          class="h-10 border-b-rule border-r-rule border-ink font-mono text-sm transition-colors"
          :class="
            draft.sizes.includes(row.eu)
              ? 'bg-ink font-bold text-tissue'
              : 'bg-tissue hover:bg-white'
          "
          @click="toggleSize(row.eu)"
        >
          {{ formatSize(row.eu) }}
        </button>
      </div>
    </fieldset>

    <fieldset>
      <legend class="label-caps mb-3 text-xl">Цена, ₽</legend>
      <div class="grid grid-cols-2 gap-3">
        <label class="block">
          <span class="mb-1 block font-mono text-xs">от</span>
          <input
            type="number"
            inputmode="numeric"
            min="0"
            step="500"
            class="field font-mono"
            :placeholder="priceRange ? String(priceRange.min) : ''"
            :value="draft.priceMin ?? ''"
            @input="draft.priceMin = parsePrice($event)"
          />
        </label>
        <label class="block">
          <span class="mb-1 block font-mono text-xs">до</span>
          <input
            type="number"
            inputmode="numeric"
            min="0"
            step="500"
            class="field font-mono"
            :placeholder="priceRange ? String(priceRange.max) : ''"
            :value="draft.priceMax ?? ''"
            @input="draft.priceMax = parsePrice($event)"
          />
        </label>
      </div>
      <p v-if="priceError" class="mt-2 text-sm font-semibold text-ink" role="alert">
        {{ priceError }} — поменяйте местами.
      </p>
    </fieldset>

    <label class="flex cursor-pointer items-center gap-3 text-sm">
      <input v-model="draft.onlySale" type="checkbox" class="size-4 cursor-pointer accent-ink" />
      Только со скидкой
    </label>

    <div class="sticky bottom-0 flex gap-3 border-t-rule border-ink bg-board-shelf py-4">
      <button type="submit" class="btn-solid flex-1" :disabled="!isDirty || Boolean(priceError)">
        Применить
      </button>
      <button type="button" class="btn-line" @click="reset">Сбросить</button>
    </div>
  </form>
</template>

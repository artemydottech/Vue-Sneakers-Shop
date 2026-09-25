<script setup lang="ts">
const PATHS = {
  search: ['M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13Z', 'm20 20-4.8-4.8'],
  bag: ['M5 8h14l-1 12H6L5 8Z', 'M9 8V6.5a3 3 0 0 1 6 0V8'],
  heart: ['M12 20 4.6 12.7a4.6 4.6 0 0 1 6.5-6.5l.9.9.9-.9a4.6 4.6 0 0 1 6.5 6.5L12 20Z'],
  close: ['m6 6 12 12', 'M18 6 6 18'],
  arrowRight: ['M4 12h15', 'm13 6 6 6-6 6'],
  arrowLeft: ['M20 12H5', 'm11 6-6 6 6 6'],
  chevronDown: ['m6 9 6 6 6-6'],
  filter: ['M4 7h10', 'M18 7h2', 'M4 17h4', 'M12 17h8', 'M14 5v4', 'M8 15v4'],
  plus: ['M12 5v14', 'M5 12h14'],
  minus: ['M5 12h14'],
  check: ['m5 12.5 4.5 4.5L19 7.5'],
  truck: [
    'M3 6h11v10H3z',
    'M14 10h4l3 3v3h-7',
    'M7 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z',
    'M17 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z'
  ],
  returnBox: ['M4 9h16v11H4z', 'M3 5h18v4H3z', 'M10 13h4'],
  ruler: ['M3 15 15 3l6 6L9 21l-6-6Z', 'm7 11 2 2', 'm10 8 2 2', 'm13 5 2 2'],
  star: ['m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9L12 3.5Z'],
  menu: ['M4 7h16', 'M4 12h16', 'M4 17h16']
} as const

export type IconName = keyof typeof PATHS

defineProps<{
  name: IconName
  filled?: boolean
}>()
</script>

<template>
  <svg
    viewBox="0 0 24 24"
    :fill="filled ? 'currentColor' : 'none'"
    stroke="currentColor"
    stroke-width="1.6"
    stroke-linecap="square"
    stroke-linejoin="miter"
    aria-hidden="true"
    class="size-5 shrink-0"
  >
    <path v-for="path in PATHS[name]" :key="path" :d="path" />
  </svg>
</template>

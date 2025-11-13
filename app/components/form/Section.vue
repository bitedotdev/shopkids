<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div class="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
    <h3 class="mb-4 text-lg font-semibold text-gray-800">
      {{ title }}
    </h3>
    <div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div class="p-6 rounded-md shadow-md bg-white">
    <h4 class="font-bold text-2xl">
      {{ title }}
    </h4>
  </div>
</template>

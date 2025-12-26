<script setup lang="ts">
const items = [
  '/images/banner_sale_2.png',
  '/images/banner_sale_3.png',
]
</script>

<template>
  <UCarousel
    v-slot="{ item }"
    loop
    :autoplay="{ delay: 3000 }"
    :items="items"
    :ui="{
      item: 'basis-full',
      container: 'h-full',
    }"
    class="w-full overflow-hidden bg-gray-100"
  >
    <img
      :src="item"
      class="w-full h-100 md:h-150 object-cover object-center"
      draggable="false"
      alt="Banner promocional"
    >
  </UCarousel>
</template>

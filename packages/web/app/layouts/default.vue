<script setup lang="ts">
const route = useRoute()

const isHomePage = computed(() => route.path === '/')
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-gray-950">
    <div 
      class="transition-colors duration-500"
      :class="isHomePage ? 'bg-yellow-50 dark:bg-gray-900' : 'bg-white dark:bg-gray-950'"
    >
      <AppHeader />
    </div>
    
    <main>
      <slot />
    </main>
  </div>
</template>

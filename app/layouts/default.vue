<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-gray-950">
    <AppHeader />
    <main>
      <slot />
    </main>
    <WhatsAppButton />
    <AppFooter />
  </div>
</template>

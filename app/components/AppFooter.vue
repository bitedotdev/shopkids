<script lang="ts" setup>
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="w-full border-t border-gray-100 bg-white py-6 mt-auto">
    <div class="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs md:text-sm text-gray-500">
      <div class="flex items-center text-center md:text-left">
        <span class="font-medium">
          &copy; {{ currentYear }} <span class="font-bold text-gray-800">Shopkids</span>.
          Todos los derechos reservados.
        </span>
      </div>

      <div class="flex items-center gap-1.5">
        <span>Desarrollado con</span>
        <UIcon name="i-ph-heart-fill" class="text-red-400 w-4 h-4 animate-pulse" />
        <span>por</span>
        <a
          href="https://sebastiandotdev.xyz"
          target="_blank"
          rel="noopener noreferrer"
          class="font-bold text-primary hover:text-primary-600 hover:underline transition-colors flex items-center gap-1"
        >
          sebastiandotdev
          <UIcon name="i-ph-arrow-up-right-bold" class="w-3 h-3" />
        </a>
      </div>
    </div>
  </footer>
</template>

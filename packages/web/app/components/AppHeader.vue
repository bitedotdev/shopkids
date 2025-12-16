<script lang="ts" setup>
import { useCart } from '~/store/cart'

const cart = useCart()
</script>

<template>
  <header class="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50">
    <UContainer class="h-16 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold">
          S
        </div>
        <span class="text-xl font-bold text-gray-900 dark:text-white">Shopkids</span>
      </div>
      <div>
        <figure class="w-fit h-fit relative">
          <UBadge v-if="cart.storage.length >= 1" size="sm" class="absolute -top-1.5 -right-1.5 rounded-full size-4">
            {{ cart.storage.length }}
          </UBadge>
          <UButton block variant="outline" color="neutral" size="lg" icon="i-lucide-shopping-cart" to="cart" />
        </figure>
      </div>
    </UContainer>
  </header>
</template>

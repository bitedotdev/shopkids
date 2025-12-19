<script lang="ts" setup>
import { useCart } from '~/store/cart'
import { useFavorite } from '~/store/favorite'

const cart = useCart()
const favorite = useFavorite()
</script>

<template>
  <header class="sticky top-0 z-50 px-4 pt-4">
    <div class="max-w-7xl mx-auto bg-primary text-white rounded-t-4xl px-6 py-2 flex items-center justify-between text-xs md:text-sm font-bold">
      <div class="flex items-center gap-2">
        <UIcon name="i-ph-sparkle-fill" />
        <span>¡Bienvenidos a Shopkids!</span>
      </div>
      <a href="tel:+573014414663" class="flex items-center gap-2 hover:underline">
        <UIcon name="i-ph-phone-fill" />
        +57 (301) 4414 663
      </a>
    </div>

    <div class="max-w-7xl mx-auto bg-white/90 backdrop-blur-xl shadow-lg rounded-b-4xl px-6 h-20 flex items-center justify-between transition-all">
      <NuxtLink to="/" class="flex items-center gap-3 group">
        <div class="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-[4px_4px_0px_0px_#861043] group-hover:translate-y-1 group-hover:shadow-none transition-all">
          S
        </div>
        <span class="text-2xl font-black tracking-tight text-gray-800 uppercase">
          Shop<span class="text-primary">kids</span>
        </span>
      </NuxtLink>

      <div class="flex items-center gap-2 md:gap-4">
        <div class="relative">
          <UButton 
            to="/favorite" 
            icon="i-ph-heart-bold" 
            color="primary" 
            variant="ghost" 
            size="xl" 
            class="rounded-full hover:bg-primary-50"
          />
          <UBadge v-if="favorite.storage.length" size="xs" class="absolute -top-1 -right-1 rounded-full px-1.5 font-black bg-pink-500">
            {{ favorite.storage.length }}
          </UBadge>
        </div>

        <div class="relative">
          <UButton 
            to="/cart" 
            icon="i-ph-shopping-cart-simple-bold" 
            color="primary" 
            variant="solid" 
            size="xl" 
            class="rounded-2xl shadow-md shadow-primary"
          />
          <UBadge v-if="cart.storage.length" size="xs" class="absolute -top-1 -right-1 rounded-full px-1.5 font-black bg-yellow-400 text-yellow-900">
            {{ cart.storage.length }}
          </UBadge>
        </div>        
      </div>
    </div>
  </header>
</template>

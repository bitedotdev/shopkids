<script setup lang="ts">
import { useCart } from '~/store/cart'
import { useFavorite } from '~/store/favorite'

const props = defineProps<{ product: ProductCart }>()

const cart = useCart()
const favorite = useFavorite()

const currency = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

const isInCart = computed(() => {
  return cart.storage.some(item => item._id === props.product._id)
})
const isInFavorite = computed(() => {
  return favorite.storage.some(item => item._id === props.product._id)
})
</script>

<template>
  <div class="group relative flex flex-col bg-white rounded-[2.5rem] p-4 transition-all duration-300 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] border-2 border-transparent hover:border-pink-100 active:scale-[0.98]">
    
    <div class="relative aspect-[1/1.1] overflow-hidden rounded-4xl bg-gray-50 border-4 border-white shadow-inner">
      <NuxtLink :to="`/p/${product.slug}`" class="cursor-pointer">
        <SanityImage
          v-if="product.imageAssetId"
          :asset-id="product.imageAssetId"
          class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </NuxtLink>

      <div v-if="product.badge" class="absolute top-4 left-4">
        <span class="bg-yellow-400 text-yellow-950 text-xs font-black px-4 py-1.5 rounded-full shadow-lg border-2 border-white uppercase -rotate-6 block">
          {{ product.badge }}
        </span>
      </div>

      <UButton
        :icon="isInFavorite ? 'i-ph-heart-fill' : 'i-ph-heart-bold'"
        :color="isInFavorite ? 'primary' : 'neutral'"
        variant="solid"
        class="absolute top-4 right-4 rounded-full shadow-lg z-10 transition-transform hover:scale-125"
        @click="favorite.add(product)"
      />
    </div>

    <div class="mt-5 flex-1 flex flex-col">
      <div class="px-2 space-y-1">
        <span class="inline-block text-[10px] font-black uppercase text-primary bg-pink-50 px-3 py-1 rounded-full tracking-widest">
          {{ product.category }}
        </span>
        
        <h3 class="font-bold text-gray-800 text-xl leading-snug line-clamp-2 min-h-12 group-hover:text-primary transition-colors">
          {{ product.name }}
        </h3>
      </div>

      <div class="mt-auto px-2">
        <div class="mb-4">
          <span class="text-2xl font-black text-gray-900 tracking-tight">
            {{ currency.format(product.price) }}
          </span>
        </div>

        <UButton
          block
          size="xl"
          :color="isInCart ? 'success' : 'primary'"
          variant="solid"
          class="h-14 rounded-2xl font-black text-lg active:translate-y-1 transition-all"
          :class="isInCart ? 'bg-green-500 hover:bg-green-600' : 'bg-primary hover:bg-pink-600'"
          @click="isInCart ? cart.remove(product._id) : cart.add(product)"
        >
          <template #leading>
            <UIcon :name="isInCart ? 'i-ph-check-circle-bold' : 'i-ph-shopping-cart-simple-bold'" class="text-2xl" />
          </template>
          {{ isInCart ? '¡En el Carrito!' : 'Lo quiero' }}
        </UButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.group:hover img {
  filter: brightness(1.05);
}
</style>

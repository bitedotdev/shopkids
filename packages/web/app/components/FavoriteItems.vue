<script lang="ts" setup>
import { useFavorite } from '~/store/favorite'
import { useCart } from '~/store/cart'

const props = defineProps<{ product: any }>()
const favorite = useFavorite()
const cart = useCart()

const currency = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

const isInCart = computed(() => cart.storage.some(item => item._id === props.product._id))
</script>

<template>
  <article class="group relative flex flex-col sm:flex-row gap-6 p-5 bg-white rounded-[2.5rem] border-2 border-transparent hover:border-pink-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300">
    
    <figure class="w-full sm:w-36 h-36 shrink-0 overflow-hidden rounded-4xl border-4 border-white shadow-md bg-gray-50 relative">
      <SanityImage
        :asset-id="product.imageAssetId" 
        auto="format" 
        :w="200" 
        :h="200"
        fit="crop"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div class="absolute bottom-2 inset-x-2">
        <span class="block text-[8px] font-black text-center bg-white/90 backdrop-blur-sm text-primary-500 py-1 rounded-full uppercase tracking-tighter shadow-sm">
          {{ product.category }}
        </span>
      </div>
    </figure>

    <div class="flex-1 flex flex-col justify-between">
      <div class="space-y-1">
        <div class="flex justify-between items-start">
          <h2 class="font-black text-2xl text-gray-800 leading-tight group-hover:text-pink-500 transition-colors">
            {{ product.name }}
          </h2>
          <UButton 
            variant="ghost" 
            color="error" 
            icon="i-ph-heart-break-bold" 
            class="rounded-full hover:bg-red-50 -mt-2"
            title="Quitar de mis tesoros"
            @click="favorite.remove(product._id)" 
          />
        </div>
        <p class="text-sm text-gray-500 line-clamp-1 font-medium">
          ¡Un tesoro increíble que espera por ti!
        </p>
      </div>

      <div class="flex flex-wrap items-center justify-between gap-4 mt-6">
        <p class="font-black text-2xl text-gray-900 tracking-tight">
          {{ currency.format(product.price) }}
        </p>

        <UButton
          size="lg"
          :color="isInCart ? 'success' : 'primary'"
          class="rounded-2xl px-6 font-black shadow-[0_4px_0_0_rgba(0,0,0,0.1)] active:shadow-none active:translate-y-1 transition-all"
          @click="cart.add(product)"
        >
          <template #leading>
            <UIcon :name="isInCart ? 'i-ph-check-circle-bold' : 'i-ph-shopping-cart-simple-bold'" class="text-xl" />
          </template>
          {{ isInCart ? '¡En el carrito!' : 'Lo quiero' }}
        </UButton>
      </div>
    </div>
  </article>
</template>

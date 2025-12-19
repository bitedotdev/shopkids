<script lang="ts" setup>
import { useCart } from '~/store/cart'

const props = defineProps<{ product: any }>()
const cart = useCart()

const count = ref<number>(1)

const currency = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})
</script>

<template>
  <article class="group relative flex flex-col sm:flex-row gap-6 p-4 bg-white rounded-[2.5rem] border-2 border-gray-50 shadow-sm hover:shadow-md transition-all">
    <figure class="w-full sm:w-32 h-32 shrink-0 overflow-hidden rounded-4xl border-4 border-white shadow-md bg-gray-50">
      <SanityImage
        :asset-id="product.imageAssetId" 
        auto="format" 
        :w="160" 
        :h="160"
        fit="crop"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
    </figure>

    <div class="flex-1 flex flex-col justify-between py-1">
      <div class="space-y-1">
        <div class="flex justify-between items-start gap-2">
          <h2 class="font-black text-xl text-gray-800 leading-tight">
            {{ product.name }}
          </h2>
          <UButton 
            variant="ghost" 
            color="error" 
            icon="i-ph-trash-bold" 
            class="rounded-full hover:bg-red-50"
            @click="cart.remove(product._id)" 
          />
        </div>
        <p class="text-xs font-bold text-primary-400 uppercase tracking-widest">
          {{ product.category }}
        </p>
      </div>

      <div class="flex flex-wrap items-center justify-between gap-4 mt-4">
        <div class="flex items-center bg-gray-100 p-1 rounded-2xl border-b-4 border-gray-200">
          <UButton 
            :disabled="count <= 1" 
            size="sm" 
            variant="ghost" 
            color="neutral" 
            icon="i-ph-minus-bold" 
            class="rounded-xl hover:bg-white"
            @click="count--" 
          />
          <span class="w-10 text-center font-black text-gray-700">{{ count }}</span>
          <UButton 
            size="sm" 
            variant="ghost" 
            color="neutral" 
            icon="i-ph-plus-bold" 
            class="rounded-xl hover:bg-white"
            @click="count++" 
          />
        </div>

        <p class="font-black text-2xl text-gray-900">
          {{ currency.format(product.price * count) }}
        </p>
      </div>
    </div>
  </article>
</template>

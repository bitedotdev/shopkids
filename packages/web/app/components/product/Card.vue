<script setup lang="ts">
import { useCart } from '~/store/cart'

defineProps<{ product: any }>()

const cart = useCart()

const currency = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' })

onMounted(() => {
  cart.loadFromStorage()
})

function isInCart(id: string) {
  return cart.storage.some(item => item._id === id)
}
</script>

<template>
  <UCard class="group h-full flex flex-col overflow-hidden transition-all hover:shadow-lg hover:ring-2 hover:ring-primary-500/20" :class="{ 'ring-2 ring-primary-500/20': isInCart(product._id) }">
    <div class="relative overflow-hidden aspect-3/4 bg-gray-100 dark:bg-gray-800">
      <SanityImage
        v-if="product.imageAssetId"
        :asset-id="product.imageAssetId"
        auto="format"
        :w="400"
        :h="533"
        fit="crop"
      >
        <template #default="{ src }">
          <img
            :src="src"
            :alt="product.name"
            loading="lazy"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            :class="{ 'scale-110': isInCart(product._id) }"
          >
        </template>
      </SanityImage>
      <UBadge
        v-if="product.badge"
        class="absolute top-2 left-2 z-10"
        variant="solid"
      >
        {{ product.badge }}
      </UBadge>

      <div class="absolute bottom-4 left-0 right-0 px-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300" :class="{ '!translate-y-0': isInCart(product._id) }">
        <UButton v-if="isInCart(product._id)" block variant="solid" icon="i-lucide-shopping-cart" class="shadow-md text-gray-900" @click="cart.remove(product._id)">
          Eliminar del carrito
        </UButton>
        <UButton v-else block variant="solid" icon="i-lucide-shopping-cart" class="shadow-md text-gray-900" @click="cart.add(product)">
          Agregar al carrito
        </UButton>
      </div>

      <UButton
        icon="i-lucide-heart"
        variant="ghost"
        class="absolute top-2 right-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      />
    </div>

    <div class="p-4 flex flex-col gap-1">
      <span class="text-xs text-gray-500 uppercase tracking-wider">{{ product.category }}</span>
      <h3 class="font-medium text-gray-900 dark:text-white truncate">
        {{ product.name }}
      </h3>
      <div class="flex items-center justify-between mt-2">
        <span class="font-bold text-lg">{{ currency.format(product.price) }}</span>
      </div>
    </div>
  </UCard>
</template>

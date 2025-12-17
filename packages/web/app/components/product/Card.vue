<script setup lang="ts">
import { useCart } from '~/store/cart'

const props = defineProps<{ product: ProductCart }>()

const cart = useCart()

const currency = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

const isInCart = computed(() => {
  return cart.storage.some(item => item._id === props.product._id)
})

const cardState = computed(() => ({
  ringColor: isInCart.value ? 'ring-primary-500' : 'ring-transparent',
  imageOpacity: isInCart.value ? 'opacity-90' : 'opacity-100',
  buttonIcon: isInCart.value ? 'i-lucide-check' : 'i-lucide-plus',
  buttonVariant: isInCart.value ? 'solid' : 'solid',
  buttonColor: isInCart.value ? 'primary' : 'white',
}))
</script>

<template>
  <div class="group relative flex flex-col gap-3">
    <div
      class="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 transition-all duration-300 ring-2 ring-offset-2 dark:ring-offset-gray-900"
      :class="[cardState.ringColor]"
    >
      <NuxtLink :to="`/p/${product.slug}`" class="block w-full h-full cursor-pointer">
        <SanityImage
          v-if="product.imageAssetId"
          :asset-id="product.imageAssetId"
          auto="format"
          :w="500"
          :h="667"
          fit="crop"
          class="h-full w-full object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-105"
          :class="cardState.imageOpacity"
        />
      </NuxtLink>

      <span
        v-if="product.badge"
        class="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/90 dark:bg-black/80 backdrop-blur-sm rounded-md shadow-sm"
      >
        {{ product.badge }}
      </span>

      <UButton
        icon="i-fluent-heart-24-filled"
        variant="outline"
        color="neutral"
        class="absolute top-5 right-3 p-2 transform -translate-y-2.5 transition-all rounded-full"
        aria-label="Agregar a favoritos"
      />

      <div class="absolute bottom-3 right-3 z-10">
        <UTooltip :text="isInCart ? 'Eliminar' : 'Agregar'" :popper="{ placement: 'left' }">
          <UButton
            :icon="isInCart ? 'i-fluent-delete-24-filled' : 'i-fluent-add-24-filled'"
            :color="isInCart ? 'error' : 'primary'"
            :variant="isInCart ? 'solid' : 'solid'"
            size="lg"
            class="shadow-lg transition-all duration-300 transform active:scale-90 hover:scale-110"
            @click="isInCart ? cart.remove(product._id) : cart.add(product)"
          />
        </UTooltip>
      </div>
    </div>

    <div class="flex flex-col px-1">
      <div class="flex justify-between items-start gap-4">
        <div class="space-y-1">
          <h3 class="font-medium text-gray-900 dark:text-white leading-tight group-hover:text-primary-500 transition-colors cursor-pointer">
            {{ product.name }}
          </h3>
          <p class="text-xs text-gray-500 dark:text-gray-400 font-medium">
            {{ product.category }}
          </p>
        </div>

        <div class="flex flex-col items-end">
          <span class="font-bold text-gray-900 dark:text-white whitespace-nowrap">
            {{ currency.format(product.price) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

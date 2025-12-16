<script lang="ts" setup>
import CartItems from '~/components/product/CartItems.vue'
import { useCart } from '~/store/cart'

const cart = useCart()

onMounted(() => {
  cart.loadFromStorage()
})

const cartItems = computed(() => cart.storage)
</script>

<template>
  <NuxtLayout>
    <div class="max-w-3xl mx-auto py-6">
      <figure class="grid grid-cols-3 items-center">
        <div>
          <UButton to="/" variant="outline" icon="lucide:chevron-left" color="neutral" />
        </div>
        <h2 class="text-center font-bold text-2xl">
          Carrito De Compras
        </h2>
      </figure>
      <template v-if="cartItems.length > 0">
        <div v-for="item in cartItems" :key="item._id" class="mt-6">
          <CartItems :product="item" />
        </div>
      </template>
      <template v-else>
        <div>
          <p class="text-center mt-6 text-lg">
            Tu carrito está vacío.
          </p>
        </div>
      </template>
    </div>
  </NuxtLayout>
</template>

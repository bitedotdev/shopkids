<script lang="ts" setup>
import CartItems from '~/components/CartItems.vue'
import { useCart } from '~/store/cart'

const cart = useCart()

const currency = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

const breadcrumbItems = [
  {
    label: 'Inicio',
    to: '/',
  },
  {
    label: 'Carrito',
    class: 'font-bold text-primary',
  },
]

const subtotal = computed(() => {
  return cart.storage.reduce((acc, item) => {
    const price = item.offer || item.price || 0
    return acc + price
  }, 0)
})

const total = computed(() => subtotal.value)
</script>

<template>
  <NuxtLayout>
    <div class="min-h-screen py-12">
      <UContainer>
        <div class="mb-10 space-y-4">
          <UBreadcrumb :items="breadcrumbItems" class="font-bold text-primary-400" />
          <div class="flex items-center gap-4">
            <h1 class="text-5xl font-black text-gray-900 tracking-tight">
              Tu <span class="text-primary italic">Carrito</span>
            </h1>
            <UBadge color="primary" variant="solid" size="lg" class="rounded-full px-4 font-black text-lg shadow-lg rotate-3">
              {{ cart.storage.length }}
            </UBadge>
          </div>
        </div>

        <div v-if="cart.storage.length > 0" class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div class="lg:col-span-7 xl:col-span-8 space-y-6">
            <div v-for="item in cart.storage" :key="item._id">
              <CartItems :product="item" />
            </div>
          </div>

          <div class="lg:col-span-5 xl:col-span-4">
            <div class="bg-white rounded-[3rem] shadow-xl border-4 border-pink-50 p-8 lg:sticky lg:top-32 relative overflow-hidden">
              <div class="absolute -top-10 -right-10 w-32 h-32 bg-yellow-100 rounded-full opacity-50 blur-2xl" />
              
              <h2 class="text-2xl font-black text-gray-800 mb-8 flex items-center gap-2">
                <UIcon name="i-ph-receipt-bold" class="text-primary" />
                Resumen mágico
              </h2>

              <dl class="space-y-6">
                <div class="flex items-center justify-between text-gray-500 font-bold">
                  <dt>Subtotal</dt>
                  <dd>{{ currency.format(subtotal) }}</dd>
                </div>

                <div class="pt-6 border-t-4 border-dashed border-gray-100 flex items-center justify-between">
                  <dt class="text-xl font-black text-gray-900">Total a pagar</dt>
                  <dd class="text-3xl font-black text-primary">
                    {{ currency.format(total) }}
                  </dd>
                </div>
              </dl>

              <div class="mt-10 space-y-4">
                <UButton
                  to="/cart/checkout"
                  block
                  size="xl"
                  color="primary"
                  class="h-16 rounded-[1.5rem] font-black text-xl shadow-[0_8px_0_0_#0369a1] active:shadow-none active:translate-y-1 transition-all"
                >
                  Continuar a Pagar
                </UButton>
                
                <div class="flex items-center justify-center gap-2 text-gray-400 font-bold text-sm">
                  <UIcon name="i-ph-shield-check-bold" />
                  Compra 100% segura
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-24 bg-white rounded-[4rem] border-4 border-dashed border-primary-100 shadow-inner px-6">
          <div class="relative w-32 h-32 mx-auto mb-8">
            <div class="absolute inset-0 bg-pink-100 rounded-full animate-ping opacity-20" />
            <div class="relative bg-pink-50 w-full h-full rounded-full flex items-center justify-center">
              <UIcon name="i-ph-shopping-bag-open-bold" class="w-16 h-16 text-primary" />
            </div>
          </div>
          
          <h3 class="text-3xl font-black text-gray-800 mb-4">
            ¡Tu carrito tiene hambre!
          </h3>
          <p class="text-lg text-gray-500 max-w-sm mx-auto mb-10 font-medium leading-relaxed">
            Parece que aún no has encontrado ningún tesoro para llevar a casa.
          </p>
          
          <UButton 
            to="/" 
            color="primary" 
            size="xl" 
            class="rounded-2xl px-10 h-14 font-black shadow-lg hover:scale-105 transition-transform"
          >
            Ir a buscar juguetes
          </UButton>
        </div>
      </UContainer>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import CartItems from '~/components/product/CartItems.vue'
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
    <div class="min-h-screen bg-gray-50 dark:bg-gray-950 py-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <UBreadcrumb :items="breadcrumbItems" class="mb-3" />

        <div class="flex items-center gap-4 mb-8">
          <h4 class="text-3xl font-bold text-gray-900 dark:text-white">
            Tu Carrito
          </h4>
          <UBadge color="neutral" variant="soft" size="lg" class="rounded-full">
            {{ cart.storage.length }} items
          </UBadge>
        </div>

        <div v-if="cart.storage.length > 0" class="lg:grid lg:grid-cols-12 lg:gap-12 items-start">
          <div class="lg:col-span-7 xl:col-span-8">
            <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-800 border-t border-b dark:border-gray-800 lg:border-t-0 lg:border-b-0">
              <li v-for="item in cart.storage" :key="item._id" class="py-6 sm:py-6">
                <CartItems :product="item" />
              </li>
            </ul>
          </div>

          <div class="lg:col-span-5 xl:col-span-4 mt-8 lg:mt-0">
            <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 lg:sticky lg:top-24">
              <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-6">
                Resumen del pedido
              </h2>

              <dl class="space-y-4">
                <div class="flex items-center justify-between">
                  <dt class="text-sm text-gray-600 dark:text-gray-400">
                    Subtotal
                  </dt>
                  <dd class="text-sm font-medium text-gray-900 dark:text-white">
                    {{ currency.format(subtotal) }}
                  </dd>
                </div>

                <div class="flex items-center justify-between border-t border-gray-200 dark:border-gray-800 pt-4">
                  <dt class="text-base font-bold text-gray-900 dark:text-white">
                    Total
                  </dt>
                  <dd class="text-base font-bold text-gray-900 dark:text-white">
                    {{ currency.format(total) }}
                  </dd>
                </div>
              </dl>

              <div class="mt-8">
                <UButton
                  to="/checkout"
                  block
                  size="xl"
                  color="neutral"
                  class="rounded-full font-bold"
                >
                  Continuar a Pagar
                </UButton>
                <p class="mt-4 text-xs text-center text-gray-500">
                  Los costos de envío e impuestos se calculan en el siguiente paso.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-20 bg-white dark:bg-gray-900 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700">
          <div class="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <UIcon name="i-lucide-shopping-bag" class="w-8 h-8 text-gray-400" />
          </div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">
            Tu carrito está vacío
          </h3>
          <p class="mt-1 text-gray-500 max-w-sm mx-auto mb-6">
            Parece que aún no has añadido nada. Explora nuestra colección y encuentra algo único.
          </p>
          <UButton to="/" color="neutral" variant="solid" size="lg" class="rounded-full">
            Ir al catálogo
          </UButton>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

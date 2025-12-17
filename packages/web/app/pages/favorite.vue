<script lang="ts" setup>
import FavoriteItems from '~/components/product/FavoriteItems.vue'
import { useFavorite } from '~/store/favorite'

const favorite = useFavorite()

const breadcrumbItems = [
  {
    label: 'Inicio',
    to: '/',
  },
  {
    label: 'Favoritos',
    class: 'font-bold text-primary',
  },
]
</script>

<template>
  <NuxtLayout>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-950 py-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <UBreadcrumb :items="breadcrumbItems" class="mb-3" />

        <div class="flex items-center gap-4 mb-8">
          <h4 class="text-3xl font-bold text-gray-900 dark:text-white">
            Favoritos
          </h4>
          <UBadge color="neutral" variant="soft" size="lg" class="rounded-full">
            {{ favorite.storage.length }} items
          </UBadge>
        </div>

        <div v-if="favorite.storage.length > 0" class="max-w-2xl mx-auto">
          <div>
            <ul
              role="list"
              class="divide-y divide-gray-200 dark:divide-gray-800 border-t border-b dark:border-gray-800 lg:border-t-0 lg:border-b-0"
            >
              <li v-for="item in favorite.storage" :key="item._id" class="py-6 sm:py-6">
                <FavoriteItems :product="item" />
              </li>
            </ul>
          </div>
        </div>

        <div
          v-else
          class="text-center py-20 bg-white dark:bg-gray-900 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700"
        >
          <div
            class="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <UIcon name="i-fluent:heart-12-filled" class="w-8 h-8 text-gray-400" />
          </div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">
            No hay productos en tus favoritos
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

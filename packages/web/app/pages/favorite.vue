<script lang="ts" setup>
import FavoriteItems from '~/components/FavoriteItems.vue'
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
    <div class="min-h-screen bg-pink-50/30 dark:bg-gray-950 py-12">
      <div class="max-w-4xl mx-auto px-4 sm:px-6">
        
        <div class="mb-10 text-center sm:text-left">
          <UBreadcrumb :items="breadcrumbItems" class="justify-center sm:justify-start font-bold text-pink-400 mb-4" />
          <div class="flex flex-col sm:flex-row items-center gap-4">
            <h1 class="text-5xl font-black text-gray-900 dark:text-white tracking-tight">
              Mis <span class="text-pink-500 italic">Tesoros</span>
            </h1>
            <UBadge color="primary" variant="solid" size="lg" class="rounded-full px-5 font-black text-lg shadow-lg -rotate-2">
              {{ favorite.storage.length }}
            </UBadge>
          </div>
        </div>

        <div v-if="favorite.storage.length > 0" class="space-y-6">
          <div v-for="item in favorite.storage" :key="item._id">
            <FavoriteItems :product="item" />
          </div>

          <div class="bg-white/50 border-2 border-dashed border-pink-200 rounded-4xl p-6 text-center">
            <p class="text-pink-400 font-bold text-sm flex items-center justify-center gap-2">
              <UIcon name="i-ph-magic-wand-bold" />
              ¡Estos productos guardados te esperan para jugar!
            </p>
          </div>
        </div>

        <div
          v-else
          class="text-center py-24 bg-white dark:bg-gray-900 rounded-[4rem] shadow-xl border-4 border-white relative overflow-hidden px-6"
        >
          <div class="absolute -top-20 -right-20 w-64 h-64 bg-pink-50 rounded-full blur-3xl opacity-50" />
          
          <div class="relative">
            <div class="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
              <UIcon name="i-ph-heart-straight-break-fill" class="w-12 h-12 text-pink-500" />
            </div>
            
            <h3 class="text-3xl font-black text-gray-800 dark:text-white mb-4">
              ¿Dónde están los tesoros?
            </h3>
            <p class="text-lg text-gray-500 max-w-sm mx-auto mb-10 font-medium leading-relaxed">
              Tu lista de favoritos está un poco triste. ¡Dale amor al catálogo y guarda lo que más te guste!
            </p>
            
            <UButton 
              to="/" 
              color="primary" 
              size="xl" 
              class="rounded-2xl px-12 h-14 font-black shadow-lg hover:scale-105 transition-transform"
            >
              ¡Ir a explorar!
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

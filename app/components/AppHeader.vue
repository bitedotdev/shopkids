<script lang="ts" setup>
import { useCart } from '~/store/cart'
import { useFavorite } from '~/store/favorite'

const input = useTemplateRef('input')
const cart = useCart()
const favorite = useFavorite()
const sanity = useSanity()

const search = ref('')
const searchResults = ref<any[]>([])
const isLoading = ref(false)

let searchTimeout: NodeJS.Timeout | null = null

defineShortcuts({
  k: () => {
    input.value?.inputRef?.focus()
  },
})

watch(search, (newVal) => {
  if (searchTimeout)
    clearTimeout(searchTimeout)

  if (!newVal || newVal.length < 3) {
    searchResults.value = []
    return
  }

  searchTimeout = setTimeout(async () => {
    isLoading.value = true
    try {
      const query = groq`*[_type == "product" && name match $term + "*"][0...5] {
        _id,
        name,
        slug,
        image
      }`

      searchResults.value = await sanity.fetch(query, { term: newVal })
    }
    catch (e) {
      console.error('Error buscando:', e)
    }
    finally {
      isLoading.value = false
    }
  }, 400)
})

function clearSearch() {
  search.value = ''
  searchResults.value = []
}
</script>

<template>
  <header class="sticky top-0 z-50 w-full shadow-md">
    <div class="w-full bg-primary text-white py-2 px-4 md:px-8 flex items-center justify-between text-xs md:text-sm font-bold">
      <div class="flex items-center gap-2">
        <UIcon name="i-ph-sparkle-fill" />
        <span>¡Bienvenidos a Shopkids!</span>
      </div>
      <a href="tel:+573014414663" class="flex items-center gap-2 hover:underline">
        <UIcon name="i-ph-phone-fill" />
        +57 (301) 4414 663
      </a>
    </div>

    <div class="w-full bg-white/95 backdrop-blur-xl h-20 px-4 md:px-8 flex items-center justify-between gap-4 transition-all">
      <NuxtLink to="/" class="shrink-0 hover:opacity-80 transition-opacity">
        <img
          src="/logo_shopkids.jpg"
          alt="Shopkids Logo"
          class="h-12 md:h-14 w-auto object-contain"
        >
      </NuxtLink>

      <div class="flex-1 max-w-2xl mx-2 md:mx-6 relative">
        <UInput
          ref="input"
          v-model="search"
          icon="i-ph-magnifying-glass"
          placeholder="¿Qué estás buscando hoy?"
          size="lg"
          class="w-full rounded-full bg-gray-100 hover:bg-gray-50 focus:ring-2 ring-primary border-0"
        >
          <template #trailing>
            <UKbd class="hidden md:inline-flex">
              ⌘K
            </UKbd>
          </template>
        </UInput>

        <div
          v-if="search.length >= 3 && searchResults.length > 0"
          class="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-60"
        >
          <ul>
            <li v-for="product in searchResults" :key="product._id">
              <NuxtLink
                :to="`/p/${product.slug.current}`"
                class="flex items-center gap-4 p-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                @click="clearSearch"
              >
                <div class="h-12 w-12 shrink-0 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                  <SanityImage
                    :asset-id="product.image?.asset?._ref || null"
                    class="w-full h-full object-cover"
                  />
                </div>

                <div class="flex flex-col">
                  <span class="text-sm font-semibold text-gray-800 line-clamp-1">
                    {{ product.name }}
                  </span>
                  <span class="text-xs text-gray-500">Ver producto</span>
                </div>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div
          v-else-if="search.length >= 3 && !isLoading && searchResults.length === 0"
          class="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-xl p-4 text-center text-sm text-gray-500 z-60"
        >
          No encontramos productos con "{{ search }}"
        </div>
      </div>

      <div class="flex items-center gap-2 md:gap-4 shrink-0">
        <div class="relative">
          <UButton
            to="/favorite"
            icon="i-ph-heart-bold"
            color="neutral"
            variant="ghost"
            size="xl"
          />
          <UBadge v-if="favorite.storage.length" size="xs" class="absolute top-1 right-1 rounded-full px-1.5 font-black bg-pink-500 ring-2 ring-white">
            {{ favorite.storage.length }}
          </UBadge>
        </div>

        <div class="relative">
          <UButton
            to="/cart"
            icon="i-ph-shopping-cart-simple-bold"
            color="neutral"
            variant="ghost"
            size="xl"
          />
          <UBadge v-if="cart.storage.length" size="xs" class="absolute -top-1 -right-1 rounded-full px-1.5 font-black bg-yellow-400 text-yellow-900 ring-2 ring-white">
            {{ cart.storage.length }}
          </UBadge>
        </div>
      </div>
    </div>
  </header>
</template>

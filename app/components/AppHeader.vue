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
  <header class="sticky top-0 z-50 w-full shadow-md bg-white/80 backdrop-blur-md">
    <div class="w-full bg-primary text-white py-2 px-4 md:px-8 flex items-center justify-between text-xs md:text-sm font-bold">
      <div class="flex items-center gap-2">
        <UIcon name="i-ph-sparkle-fill" />
        <span class="hidden xs:inline">¡Bienvenidos a Shopkids!</span>
        <span class="xs:hidden">Shopkids</span>
      </div>
      <a href="tel:+573014414663" class="flex items-center gap-2 hover:underline">
        <UIcon name="i-ph-phone-fill" />
        <span class="hidden sm:inline">+57 (301) 4414 663</span>
        <span class="sm:hidden">Llamar</span>
      </a>
    </div>

    <div class="w-full px-4 md:px-8 py-3 md:py-0 md:h-24 flex flex-wrap md:flex-nowrap items-center justify-between gap-y-3 transition-all">
      <NuxtLink to="/" class="order-1 shrink-0 hover:opacity-80 transition-opacity mr-auto md:mr-0">
        <img
          src="/logo_shopkids_removebg_preview.png"
          alt="Shopkids Logo"
          class="h-10 md:h-14 w-auto object-contain"
        >
      </NuxtLink>

      <div class="order-2 md:order-3 flex items-center gap-2 md:gap-3 shrink-0 ml-auto md:ml-0">
        <div class="relative group">
          <UButton
            to="/favorite"
            icon="i-ph-heart-bold"
            label="Mis Favoritos"
            color="neutral"
            variant="ghost"
            size="lg"
          />
          <span
            v-if="favorite.storage.length"
            class="absolute top-0 right-0 md:top-1 md:right-1 block h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-pink-500 ring-2 ring-white transform translate-x-1/4 -translate-y-1/4"
          />
        </div>

        <USeparator orientation="vertical" class="h-6 hidden md:block" />

        <div class="relative group">
          <UButton
            to="/cart"
            icon="i-ph-shopping-cart-simple-bold"
            label="Mi Carrito"
            color="neutral"
            variant="ghost"
            size="lg"
          />
          <UBadge
            v-if="cart.storage.length"
            size="xs"
            class="absolute -top-1 -right-1 md:top-0 md:right-0 rounded-full px-1.5 font-black bg-yellow-400 text-yellow-950 ring-2 ring-white z-10 pointer-events-none"
          >
            {{ cart.storage.length }}
          </UBadge>
        </div>
      </div>

      <div class="order-3 md:order-2 w-full md:w-auto md:flex-1 md:max-w-xl mx-0 md:mx-6 relative">
        <UInput
          ref="input"
          v-model="search"
          icon="i-ph-magnifying-glass"
          placeholder="Buscar ropa, juguetes..."
          variant="none"
          size="lg"
          class="w-full bg-gray-100 hover:bg-gray-200/70 focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/50 focus-within:shadow-lg transition-all duration-300 rounded-2xl"
        >
          <template #trailing>
            <div class="flex items-center gap-1">
              <UButton
                v-if="search"
                color="neutral"
                variant="link"
                icon="i-ph-x-circle-fill"
                :padded="false"
                @click="clearSearch"
              />
              <UKbd class="hidden md:inline-flex bg-white/50">
                ⌘K
              </UKbd>
            </div>
          </template>
        </UInput>

        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <div
            v-if="search.length >= 3"
            class="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-60"
          >
            <ul v-if="searchResults.length > 0">
              <li v-for="product in searchResults" :key="product._id">
                <NuxtLink
                  :to="`/p/${product.slug.current}`"
                  class="flex items-center gap-4 p-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 group"
                  @click="clearSearch"
                >
                  <div class="h-12 w-12 shrink-0 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 group-hover:border-primary/30 transition-colors">
                    <SanityImage
                      :asset-id="product.image?.asset?._ref || null"
                      class="w-full h-full object-cover"
                    />
                  </div>

                  <div class="flex flex-col">
                    <span class="text-sm font-semibold text-gray-800 group-hover:text-primary transition-colors line-clamp-1">
                      {{ product.name }}
                    </span>
                    <span class="text-xs text-gray-500">Ver producto</span>
                  </div>

                  <UIcon name="i-ph-caret-right-bold" class="ml-auto text-gray-300 group-hover:text-primary" />
                </NuxtLink>
              </li>
            </ul>

            <div
              v-else-if="!isLoading"
              class="p-8 text-center flex flex-col items-center justify-center text-gray-500"
            >
              <UIcon name="i-ph-smiley-sad" class="text-3xl mb-2 text-gray-400" />
              <p class="text-sm">
                No encontramos nada con "<strong>{{ search }}</strong>"
              </p>
            </div>

            <div v-if="isLoading" class="p-4 text-center text-primary">
              <UIcon name="i-ph-spinner-gap" class="animate-spin text-xl" />
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </header>
</template>

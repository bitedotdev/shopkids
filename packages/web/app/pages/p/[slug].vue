<script setup lang="ts">
import { useCart } from '~/store/cart'

const route = useRoute()
const cart = useCart()
const sanity = useSanity()


const query = groq`*[_type == "product" && slug.current == $slug][0] {
  _id,
  name,
  description,
  price,
  offer,
  status,
  gender,
  "categories": categories[]->name,
  image,
  images,
  badge,
  "imageAssetId": image.asset._ref
}`

const { data: product, pending, error } = await useAsyncData<any>(
  `product-${route.params.slug}`,
  () => sanity.fetch(query, { slug: route.params.slug })
)

if (!product.value && !pending.value) {
  throw createError({ statusCode: 404, statusMessage: 'Producto no encontrado', fatal: true })
}

const { projectId, dataset } = sanity.config

const currency = new Intl.NumberFormat('es-CO', { 
  style: 'currency', 
  currency: 'COP', 
  maximumFractionDigits: 0 
})

const items = computed(() => {  
  const categoryName = product.value?.categories?.[0] || 'Catálogo'
  
  return [
    {
      label: 'Inicio',      
      to: '/'
    },
    {
      label: categoryName,          
    },
    {
      label: product.value?.name || 'Cargando...',
      class: 'font-bold truncate max-w-[150px] sm:max-w-none'
    }
  ]
})

const isInCart = computed(() => {
  return product.value ? cart.storage.some(item => item._id === product.value!._id) : false
})

const allImages = computed(() => {
  if (!product.value) return []
  const main = product.value.image ? [product.value.image] : []
  const gallery = product.value.images || []
  return [...main, ...gallery]
})

useSeoMeta({
  title: () => product.value?.name,
  description: () => product.value?.description?.slice(0, 160),
  ogTitle: () => product.value?.name,
  ogDescription: () => product.value?.description?.slice(0, 160),
  ogImage: () => product.value?.imageAssetId 
    ? `https://cdn.sanity.io/images/${projectId}/${dataset}/${product.value.imageAssetId}` 
    : null,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <NuxtLayout>
    
    <div v-if="pending" class="min-h-[60vh] flex items-center justify-center">
      <UIcon name="i-lucide-loader-2" class="animate-spin w-10 h-10 text-gray-400" />
    </div>

    <div v-else-if="product" class="bg-white dark:bg-gray-950 pb-20">
      <section class="max-w-7xl mx-auto px-4 lg:px-8 pt-6">
        <div class="mb-6 lg:mb-10">
    <UBreadcrumb :items="items" />
  </div>

        <div class="lg:grid lg:grid-cols-12 lg:gap-12">
          
          <div class="lg:col-span-7 space-y-4">
            
            <div class="flex lg:hidden overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 px-4 pb-4">
              <div 
                v-for="(img, idx) in allImages" 
                :key="idx" 
                class="snap-center shrink-0 w-[85vw] sm:w-[60vw] aspect-square relative mr-4 last:mr-0 rounded-xl overflow-hidden"
              >
                <SanityImage
                  :asset-id="img.asset._ref"
                  auto="format"
                  fit="crop"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>

            <div class="hidden lg:grid grid-cols-2 gap-4">
              <div 
                v-for="(img, idx) in allImages" 
                :key="idx" 
                class="relative bg-gray-50 dark:bg-gray-900 rounded-2xl overflow-hidden cursor-zoom-in"
                :class="{ 'col-span-2 aspect-4/5': idx === 0, 'aspect-3/4': idx > 0 }"
              >
                <SanityImage
                  :asset-id="img.asset._ref"
                  auto="format"
                  :w="idx === 0 ? 1200 : 800"
                  fit="crop"
                  class="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>

          <div class="lg:col-span-5 relative pt-6 lg:pt-0">
            <div class="lg:sticky lg:top-24 space-y-8">
              
              <div class="space-y-2">
                <div class="flex items-center gap-2 text-sm text-gray-500 font-medium uppercase tracking-wider">
                  <span v-for="cat in product.categories" :key="cat">{{ cat }}</span>
                  <span v-if="product.gender !== 'none'" class="text-gray-300">•</span>
                  <span v-if="product.gender !== 'none'">{{ product.gender }}</span>
                </div>
                
                <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                  {{ product.name }}
                </h1>

                <div class="flex items-baseline gap-4 pt-2">
                  <span class="text-2xl font-bold text-gray-900 dark:text-white">
                    {{ currency.format(product.offer || product.price) }}
                  </span>
                  <span v-if="product.offer" class="text-lg text-gray-400 line-through decoration-gray-400">
                    {{ currency.format(product.price) }}
                  </span>
                  <UBadge v-if="product.offer" color="error" variant="soft" size="md">
                    Oferta
                  </UBadge>
                </div>
              </div>

                <USeparator />

              <div class="prose prose-sm dark:prose-invert text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>{{ product.description || 'Sin descripción disponible para este producto.' }}</p>
              </div>

              <div class="space-y-3 pt-4">
                <UButton 
                  block 
                  size="xl" 
                  color="neutral"
                  :variant="isInCart ? 'outline' : 'solid'"                
                  class="transition-all duration-300 rounded-full"
                  :icon="isInCart ? 'i-lucide-check' : 'i-lucide-shopping-bag'"
                  @click="isInCart ? cart.remove(product._id) : cart.add(product)"
                >
                  {{ isInCart ? 'Quitar del Carrito' : 'Agregar al Carrito' }}
                </UButton>
                
                <p v-if="product.status === 'out of stock'" class="text-center text-red-500 font-medium text-sm">
                  Producto agotado momentáneamente
                </p>
              </div>

              <div class="pt-8 space-y-0 divide-y dark:divide-gray-800 border-t dark:border-gray-800">
                <UAccordion 
                  :items="[
                    { label: 'Envíos y Devoluciones', content: 'Envíos gratis a todo el país por compras superiores a $200.000. Tienes 30 días para devoluciones.' },
                    { label: 'Composición y Cuidados', content: 'Lavar a máquina en frío. No usar blanqueador.' }
                  ]"                
                  color="gray"
                  variant="ghost"
                  class="w-full"
                />
              </div>

            </div>
          </div>

        </div>
      </section>
    </div>
  </NuxtLayout>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

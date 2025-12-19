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
  () => sanity.fetch(query, { slug: route.params.slug }),
)

if (!product.value && !pending.value) {
  throw createError({ statusCode: 404, statusMessage: 'Producto no encontrado', fatal: true })
}

const { projectId, dataset } = sanity.config

const currency = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

const items = computed(() => {
  const categoryName = product.value?.categories?.[0] || 'Catálogo'

  return [
    {
      label: 'Inicio',
      to: '/',
    },
    {
      label: categoryName,
    },
    {
      label: product.value?.name || 'Cargando...',
      class: 'font-bold truncate max-w-[150px] sm:max-w-none',
    },
  ]
})

const isInCart = computed(() => {
  return product.value ? cart.storage.some(item => item._id === product.value!._id) : false
})

const allImages = computed(() => {
  if (!product.value)
    return []
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
    <div v-if="product" class="bg-linear-to-b from-white to-pink-50/30 pb-20">
      <UContainer class="pt-8">
        <UBreadcrumb :items="items" class="mb-8 font-bold italic text-pink-400" />

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div class="lg:col-span-7 space-y-6">
            <div class="relative aspect-4/5 rounded-[3rem] overflow-hidden shadow-2xl bg-white border-8 border-white">
              <SanityImage
                :asset-id="product.imageAssetId"
                class="w-full h-full object-cover"
              />
              <UBadge v-if="product.badge" class="absolute top-6 left-6 px-4 py-2 rounded-2xl text-lg font-black bg-yellow-400 text-yellow-900 shadow-xl uppercase">
                {{ product.badge }}
              </UBadge>
            </div>

            <div class="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
              <div v-for="(img, idx) in allImages" :key="idx" class="w-32 h-32 shrink-0 rounded-[1.5rem] overflow-hidden border-4 border-white shadow-md hover:border-pink-400 transition-colors cursor-pointer">
                <SanityImage :asset-id="img.asset._ref" class="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          <div class="lg:col-span-5 space-y-8">
            <div class="bg-white p-8 rounded-[3rem] shadow-xl border border-pink-50">
              <div class="space-y-4">
                <div class="flex gap-2">
                  <UBadge v-for="cat in product.categories" :key="cat" variant="subtle" size="lg" class="rounded-full font-bold uppercase tracking-widest px-4">
                    {{ cat }}
                  </UBadge>
                </div>
                
                <h1 class="text-4xl font-black text-gray-900 leading-tight">
                  {{ product.name }}
                </h1>

                <div class="flex items-center gap-4">
                  <span class="text-4xl font-black text-primary">
                    {{ currency.format(product.offer || product.price) }}
                  </span>
                  <span v-if="product.offer" class="text-xl text-gray-400 line-through font-bold">
                    {{ currency.format(product.price) }}
                  </span>
                </div>
              </div>

              <div class="mt-8 prose prose-p:text-gray-600 font-medium">
                <p>{{ product.description }}</p>
              </div>

              <div class="mt-10 space-y-4">
                <UButton
                  block
                  size="xl"
                  :color="isInCart ? 'success' : 'primary'"
                  class="h-16 rounded-[1.5rem] text-xl font-black shadow-lg shadow-pink-200 transition-all active:scale-95"
                  :icon="isInCart ? 'i-ph-check-circle-fill' : 'i-ph-shopping-bag-fill'"
                  @click="isInCart ? cart.remove(product._id) : cart.add(product)"
                >
                  {{ isInCart ? '¡Ya en el carrito!' : 'Agregar al carrito' }}
                </UButton>

                <UButton
                  block
                  variant="outline"
                  size="xl"
                  color="success"
                  class="h-16 rounded-[1.5rem] text-lg font-bold border-2"
                  icon="i-ph-whatsapp-logo-fill"
                  :to="`https://wa.me/573013726605?text=Hola! Me interesa este producto: ${product.name}`"
                  target="_blank"
                >
                  Preguntar por WhatsApp
                </UButton>
              </div>
            </div>

            <UAccordion
              :items="[{ label: '✨ Envíos y Cuidados', content: 'Cuidamos cada detalle para que llegue perfecto.' }]"
              class="bg-white rounded-3xl p-2 shadow-sm border border-gray-100"              
            />
          </div>
        </div>
      </UContainer>
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

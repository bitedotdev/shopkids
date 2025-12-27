<script setup lang="ts">
useHead({
  title: 'Shopkids | Compra utilidades',
})

const { products, status, clearFilters } = useCatalog()
</script>

<template>
  <NuxtLayout>
    <Hero />

    <div class="bg-white -mt-10 relative z-10 pt-10 pb-6 rounded-t-[3rem]">
      <UContainer>
        <div class="mb-12">
          <ProductFilters />
        </div>

        <USeparator class="mb-12" label="¡Explora el catálogo!" :ui="{ label: 'text-primary font-black uppercase tracking-[0.2em]' }" />

        <div v-if="status === 'pending'" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div v-for="n in 8" :key="n" class="space-y-4">
            <USkeleton class="h-80 w-full rounded-4xl" />
            <USkeleton class="h-6 w-3/4 mx-auto" />
          </div>
        </div>

        <div v-else id="catalog" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <ProductCard
            v-for="product in products"
            :key="product._id"
            :product="product"
          />
        </div>

        <div v-if="products.length === 0 && status !== 'pending'" class="text-center py-20 bg-gray-50 rounded-[3rem] border-4 border-dashed border-gray-200">
          <UIcon name="i-ph-magnifying-glass-bold" class="text-6xl text-gray-300 mb-4" />
          <h3 class="text-2xl font-black text-gray-800">
            ¡Ups! No hay tesoros aquí
          </h3>
          <p class="text-gray-500 mb-6 font-medium">
            Prueba buscando con otros filtros
          </p>
          <UButton color="primary" variant="subtle" size="xl" class="rounded-full" @click="clearFilters">
            Ver todo el catálogo
          </UButton>
        </div>
      </UContainer>
    </div>
  </NuxtLayout>
</template>

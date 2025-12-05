<script setup lang="ts">
useHead({
  title: 'Shopkids | Compra utilidades',
})

const { products, status, clearFilters } = useCatalog()

const items = ref(['Backlog', 'Todo', 'In Progress', 'Done'])
const value = ref('Backlog')
const isMobileFiltersOpen = ref(false)
</script>

<template>
  <NuxtLayout>
    <div class="min-h-screen bg-white dark:bg-gray-950 font-sans">
      <Hero
        title="Redefine tu Estilo Diario"
        subtitle="Lanzamiento Invierno 2024"
        description="Encuentra el equilibrio perfecto entre comodidad y elegancia con nuestra nueva colección de ropa urbana sostenible."
        image-src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop"
        cta-text="Ver Catálogo"
      />
    </div>

    <UContainer id="shop-section" class="py-12">
      <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-gray-100 dark:border-gray-800 pb-6">
        <div>
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
            Últimos Lanzamientos
          </h2>
          <p class="text-gray-500 mt-1">
            {{ products.length }}
          </p>
        </div>

        <div class="flex items-center gap-3">
          <USlideover v-model:open="isMobileFiltersOpen" side="bottom">
            <UButton
              class="lg:hidden"
              icon="i-lucide-filter"
              variant="solid"
              @click="isMobileFiltersOpen = true"
            >
              Filtros
            </UButton>

            <template #body>
              <UCard class="flex flex-col flex-1">
                <template #header>
                  <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                      Filtros
                    </h3>
                    <UButton variant="ghost" icon="i-lucide-x" class="-my-1" @click="isMobileFiltersOpen = false" />
                  </div>
                </template>

                <ProductFilters />

                <template #footer>
                  <div class="flex gap-4">
                    <UButton block variant="outline" class="flex-1" @click="clearFilters">
                      Limpiar
                      Limpiar
                    </UButton>
                    <UButton block class="flex-1" @click="isMobileFiltersOpen = false">
                      Ver Resultados
                    </UButton>
                  </div>
                </template>
              </UCard>
            </template>
          </USlideover>

          <USelectMenu
            class="w-48"
            placeholder="Ordenar por"
            :options="['Más relevantes', 'Menor precio', 'Mayor precio', 'Más recientes']"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside class="hidden lg:block lg:col-span-1">
          <div class="sticky top-24">
            <ProductFilters />
          </div>
        </aside>

        <div class="lg:col-span-3">
          <div v-if="status === 'pending'" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            <div v-for="n in 6" :key="n">
              <USkeleton class="h-[300px] w-full rounded-xl" />
              <USkeleton class="h-4 w-3/4 mt-2" />
              <USkeleton class="h-4 w-1/2 mt-2" />
            </div>
          </div>

          <div v-else class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            <ProductCard
              v-for="product in products"
              :key="product.id"
              :product="product"
            />
          </div>

          <div v-if="products.length > 0" class="mt-16 flex flex-col items-center gap-2">
            <span class="text-sm text-gray-500">Mostrando {{ products.length }} resultados</span>
            <UButton variant="outline" size="lg" class="px-8">
              Cargar más
            </UButton>
          </div>
        </div>
      </div>
    </UContainer>

    <USelect v-model="value" :items="items" />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { categories, filters } = useCatalog()

function toggleSelection(list: string[], value: string, checked: boolean) {
  if (checked) {
    if (!list.includes(value))
      list.push(value)
  }
  else {
    const index = list.indexOf(value)
    if (index > -1)
      list.splice(index, 1)
  }
}
</script>

<template>
  <div class="w-full space-y-10 py-4">
    <div class="relative">
      <div class="flex items-center gap-6 overflow-x-auto pb-6 px-4 no-scrollbar">
        <div
          v-for="cat in categories"
          :key="cat._id"
          class="shrink-0 cursor-pointer group flex flex-col items-center gap-3"
          @click="toggleSelection(filters.categories, cat._id, !filters.categories.includes(cat._id))"
        >
          <div
            class="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 transition-all duration-300 relative overflow-hidden shadow-md"
            :class="[
              filters.categories.includes(cat._id)
                ? 'border-primary-500 scale-110 shadow-primary-200 ring-4 ring-primary-100'
                : 'border-white bg-white group-hover:border-primary-200',
            ]"
          >
            <SanityImage
              v-if="cat.image?.asset?._ref"
              :asset-id="cat.image.asset._ref"
              :w="200"
              :h="200"
              auto="format"
              fit="crop"
              class="w-full h-full object-cover"
              :class="{ 'grayscale-[0.5]': !filters.categories.includes(cat._id) }"
            />
            <div v-else class="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
              <UIcon name="i-ph-star-bold" class="text-3xl" />
            </div>

            <div
              v-if="filters.categories.includes(cat._id)"
              class="absolute inset-0 bg-primary-500/20 flex items-center justify-center"
            >
              <div class="bg-primary-500 text-white rounded-full p-1 shadow-lg translate-y-8">
                <UIcon name="i-ph-check-bold" />
              </div>
            </div>
          </div>

          <span
            class="text-xs font-black uppercase tracking-tighter text-center transition-colors"
            :class="filters.categories.includes(cat._id) ? 'text-primary-600 scale-110' : 'text-gray-500'"
          >
            {{ cat.name }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

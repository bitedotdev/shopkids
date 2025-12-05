<script setup lang="ts">
import type { AccordionItem } from '@nuxt/ui'
import { GENDER_OPTIONS } from '@/composables/useCatalog'

const { categories, filters, clearFilters, status } = useCatalog()

const items: AccordionItem[] = [
  {
    label: 'Categoría',
    slot: 'category',
    value: 'category',
  },
  {
    label: 'Género',
    slot: 'gender',
    value: 'gender',
  },
]

const defaultOpenItems = ['category', 'gender']

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
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="font-bold text-xl text-gray-900 dark:text-white">
        Filtros
      </h2>
      <UButton variant="link" size="xs" :disabled="status === 'pending'" @click.prevent="clearFilters">
        Limpiar todo
      </UButton>
    </div>

    <UAccordion
      type="multiple"
      :items="items"
      :default-value="defaultOpenItems"
    >
      <template #category-body>
        <div class="space-y-2">
          <div v-if="!categories && status === 'pending'" class="space-y-2">
            <USkeleton v-for="i in 3" :key="i" class="h-4 w-3/4" />
          </div>

          <div v-else class="flex flex-col gap-2 max-h-60 overflow-y-auto custom-scrollbar">
            <UCheckbox
              v-for="cat in categories"
              :key="cat._id"
              :label="`${cat.name} (${cat.count})`"
              :model-value="filters.categories.includes(cat._id)"
              @update:model-value="(v) => toggleSelection(filters.categories, cat._id, v as boolean)"
            />
          </div>
        </div>
      </template>

      <template #gender-body>
        <div class="space-y-2">
          <UCheckbox
            v-for="option in GENDER_OPTIONS"
            :key="option.value"
            :label="option.label"
            :model-value="filters.genders.includes(option.value)"
            @update:model-value="(v) => toggleSelection(filters.genders, option.value, v as boolean)"
          />
        </div>
      </template>
    </UAccordion>
  </div>
</template>

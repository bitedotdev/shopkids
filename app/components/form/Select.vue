<script setup lang="ts">
import { computed } from 'vue'

interface SelectOption {
  label: string
  value: string | number | boolean | null | string[]
}

withDefaults(defineProps<{
  label?: string
  description?: string
  required?: boolean
  options: SelectOption[]
}>(), {
  required: false,
})

const model = defineModel<string | number | boolean | null | string[]>()

const uuid = computed(() => crypto.randomUUID())
</script>

<template>
  <div>
    <label v-if="label" :for="uuid" class="mb-1 block text-sm font-medium text-gray-700">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <select
      :id="uuid"
      v-model="model"
      :required="required"
      class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
    >
      <option
        v-for="option in options"
        :key="option.value as string"
        :value="option.value"
        :disabled="option.value === null"
      >
        {{ option.label }}
      </option>
    </select>
    <p v-if="description" class="mt-1 text-xs text-gray-500">
      {{ description }}
    </p>
  </div>
</template>

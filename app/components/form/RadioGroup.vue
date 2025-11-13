<script setup lang="ts">
interface RadioOption {
  label: string
  value: string
}

defineProps<{
  label: string
  options: RadioOption[]
}>()

const model = defineModel<string>()
</script>

<template>
  <div class="mt-4">
    <label class="mb-1 block text-sm font-medium text-gray-700">
      {{ label }}
    </label>
    <div class="flex flex-wrap items-center gap-x-6 gap-y-2">
      <div v-for="option in options" :key="option.value" class="flex items-center">
        <input
          :id="option.value"
          v-model="model"
          :value="option.value"
          type="radio"
          name="discount-type"
          class="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
        >
        <label :for="option.value" class="ml-2 block text-sm text-gray-800">
          {{ option.label }}
        </label>
      </div>
    </div>
  </div>
</template>

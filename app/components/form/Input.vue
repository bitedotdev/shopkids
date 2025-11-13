<script setup lang="ts">
withDefaults(defineProps<{
  label?: string
  placeholder?: string
  description?: string
  type?: 'text' | 'number' | 'email' | 'password'
  required?: boolean
}>(), {
  type: 'text',
  required: false,
})

const model = defineModel<string | number | null>()

const uuid = computed(() => crypto.randomUUID())
</script>

<template>
  <div>
    <label v-if="label" :for="uuid" class="mb-1 block text-sm font-medium text-gray-700">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <input
      :id="uuid"
      v-model="model"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
    >
    <p v-if="description" class="mt-1 text-xs text-gray-500">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  label?: string
  accept?: string
  description?: string
}>(), {
  label: '',
  accept: 'image/*',
  description: 'PNG, JPG, JPEG',

})

const model = defineModel<File | null>({ default: null })

const fileInputRef = ref<HTMLInputElement | null>(null)
const isDragging = ref(false)
const previewUrl = ref<string | null>(null)

watch(
  model,
  (newFile) => {
    if (newFile) {
      previewUrl.value = URL.createObjectURL(newFile)
    }
    else {
      if (previewUrl.value) {
        URL.revokeObjectURL(previewUrl.value)
      }
      previewUrl.value = null
    }
  },
  { immediate: true },
)

function handleFile(file: File) {
  const fileType = file.type.split('/')[1] as string

  if (file && props.accept.includes(fileType)) {
    model.value = file
  }
  else {
    console.warn('Tipo de archivo no permitido')
    model.value = null
  }
}

function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    const file = target.files[0] as File
    handleFile(file)
  }
}

function onDrop(event: DragEvent) {
  isDragging.value = false
  if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
    const data = event.dataTransfer.files[0] as File
    handleFile(data)
  }
}

function triggerFileInput() {
  fileInputRef.value?.click()
}

function onDragOver() {
  isDragging.value = true
}
function onDragLeave() {
  isDragging.value = false
}

function clearFile() {
  model.value = null
  if (fileInputRef.value) {
    fileInputRef.value.value = ''
  }
}
</script>

<template>
  <div>
    <label v-if="label" class="mb-1 block text-sm font-medium text-gray-700">
      {{ label }}
    </label>

    <div v-if="previewUrl" class="relative rounded-lg border border-gray-300">
      <img :src="previewUrl" alt="Thumbnail preview" class="h-auto w-full rounded-lg object-cover">
      <button
        type="button"
        class="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-white shadow-md transition-all hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        aria-label="Remove image"
        @click="clearFile"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>

    <div
      v-else
      class="flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors"
      :class="isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'"
      @click="triggerFileInput"
      @dragover.prevent="onDragOver"
      @dragleave.prevent="onDragLeave"
      @drop.prevent="onDrop"
    >
      <svg
        class="h-12 w-12 text-gray-400"
        :class="isDragging ? 'text-blue-500' : ''"
        stroke="currentColor"
        fill="none"
        viewBox="0 0 48 48"
        aria-hidden="true"
      >
        <path
          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <span class="mt-2 text-sm text-gray-500" :class="isDragging ? 'text-blue-600' : ''">
        Arrastra o haz clic para subir
      </span>
      <p class="mt-1 text-xs text-gray-400">
        {{ description }}
      </p>
    </div>

    <input
      ref="fileInputRef"
      type="file"
      :accept="accept"
      class="hidden"
      @change="onFileChange"
    >
  </div>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  description: z.string().optional(),
  basePrice: z.number().min(0, 'El precio debe ser positivo'),
  discountType: z.enum(['none', 'percentage', 'fixed']),
  taxClass: z.string().min(1, 'La clase de impuesto es requerida'),
  vatAmount: z.number().min(0, 'El IVA debe ser positivo'),
  category: z.string().nullable(),
  tags: z.array(z.string()).optional(),
  status: z.enum(['published', 'draft']),
  template: z.string(),
})

// 2. Definimos el tipo basado en el esquema
type Schema = z.output<typeof schema>

// 3. Definimos el estado reactivo del formulario
const state = reactive<Partial<Schema>>({
  name: undefined,
  description: undefined,
  basePrice: undefined,
  discountType: 'none',
  taxClass: undefined,
  vatAmount: undefined,
  category: null,
  tags: [],
  status: 'published',
  template: 'default',
})

// 4. Estado para los archivos (no forman parte del `state` de UForm)
const thumbnailFile = ref<File | null>(null)
const mediaFiles = ref(null)

// 5. Opciones para los selects y radios
const discountOptions = [
  { label: 'No Discount', value: 'none' },
  { label: 'Percentage %', value: 'percentage' },
  { label: 'Fixed Price', value: 'fixed' },
]

const taxOptions = [
  { label: 'Select an option', value: '' },
  { label: 'Taxable Goods', value: 'taxable' },
  { label: 'No Tax', value: 'none' },
]

const statusOptions = [
  { label: 'Published', value: 'published' },
  { label: 'Draft', value: 'draft' },
]

// 6. Handler para el submit
async function onSubmit(event: FormSubmitEvent<Schema>) {
  // La validación se ejecuta automáticamente
  console.log('Formulario válido:', event.data)
  console.log('Archivo de Thumbnail:', thumbnailFile.value)
  console.log('Archivos de Media:', mediaFiles.value)

  // Aquí construirías tu FormData para enviar a la API
}

// Opcional: validación manual si no se usa Zod
// const validate = (state: any): FormError[] => {
//   const errors = []
//   if (!state.name) errors.push({ path: 'name', message: 'Required' })
//   return errors
// }
</script>

<template>
  <UForm :schema="schema" :state="state" class="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3" @submit="onSubmit">
    <div class="flex flex-col gap-6 lg:col-span-2">
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold leading-6">
            General
          </h3>
        </template>

        <div class="space-y-4">
          <UFormField label="Product Name" name="name" :required="true">
            <UInput v-model="state.name" placeholder="Product Name" class="w-full" />
          </UFormField>

          <UFormField label="Description" name="description">
            <UTextarea v-model="state.description" :rows="6" class="w-full" />
            <template #description>
              Set a description to the product for better visibility.
            </template>
          </UFormField>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold leading-6">
            Media
          </h3>
        </template>

        <UFormField label="Media files" name="mediaFiles">
          <UFileUpload v-model="mediaFiles" multiple />
        </UFormField>
      </UCard>

      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold leading-6">
            Pricing
          </h3>
        </template>

        <div class="space-y-4">
          <UFormField label="Base Price" name="basePrice" :required="true">
            <UInput v-model.number="state.basePrice" type="number" placeholder="Product price" class="w-full" />
          </UFormField>

          <UFormField label="Discount Type" name="discountType">
            <URadioGroup v-model="state.discountType" :options="discountOptions" />
          </UFormField>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UFormField label="Tax Class" name="taxClass" :required="true">
              <USelect v-model="state.taxClass" :options="taxOptions" class="w-full" />
            </UFormField>
            <UFormField label="VAT Amount (%)" name="vatAmount" :required="true">
              <UInput v-model.number="state.vatAmount" type="number" class="w-full" />
            </UFormField>
          </div>
        </div>
      </UCard>
    </div>

    <div class="flex flex-col gap-6 lg:col-span-1">
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold leading-6">
            Thumbnail
          </h3>
        </template>

        <UFormField label="Product thumbnail" name="thumbnailFile">
          <UFileUpload
            v-model="thumbnailFile"
            icon="i-lucide-image"
            label="Drop your image here"
            description="SVG, PNG, JPG or GIF (max. 2MB)"
            class="w-full min-h-48"
          />
        </UFormField>
      </UCard>

      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold leading-6">
            Status
          </h3>
        </template>
        <UFormField label="Product Status" name="status">
          <USelect v-model="state.status" :options="statusOptions" />
        </UFormField>
      </UCard>

      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold leading-6">
            Product Details
          </h3>
        </template>
        <div class="space-y-4">
          <UFormField label="Categories" name="category">
            <USelect
              v-model="state.category"
              :options="[{ label: 'Select an option', value: null }, { label: 'Electronics', value: 'electronics' }]"
              class="w-full"
            />
          </UFormField>

          <UButton label="+ Create New Category" variant="link" :padded="false" />

          <UFormField label="Tags" name="tags">
            <USelectMenu
              v-model="state.tags"
              multiple
              creatable
              searchable
              placeholder="Select or add tags..."
              class="w-full"
            />
          </UFormField>
        </div>
      </UCard>
    </div>

    <div class="flex items-center gap-3 lg:col-span-3">
      <UButton type="submit" label="Save Changes" />
      <UButton label="Cancel" variant="outline" color="neutral" type="button" />
    </div>
  </UForm>
</template>

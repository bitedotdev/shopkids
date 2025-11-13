<script setup lang="ts">
interface Product {
  name: string
  description: string
  basePrice: number | null
  discountType: 'none' | 'percentage' | 'fixed'
  taxClass: string | null
  vatAmount: number | null
  category: string | null
  tags: string[]
  status: 'published' | 'draft'
  template: string
}

const thumbnailFile = ref<File | null>(null)

const product = reactive<Product>({
  name: '',
  description: '',
  basePrice: null,
  discountType: 'none',
  taxClass: null,
  vatAmount: null,
  category: null,
  tags: [],
  status: 'published',
  template: 'default',
})

function handleSave() {
  console.log('Producto a guardar:', product)
}
</script>

<template>
  <div>
    <TheNav />
    <section class="container p-6 md:p-12">
      <Banner title="Crear producto" />

      <form class="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3" @submit.prevent="handleSave">
        <div class="flex flex-col gap-6 lg:col-span-2">
          <FormSection title="General">
            <FormInput
              v-model="product.name"
              label="Product Name"
              placeholder="Product Name"
              description="A product name is required and recommended to be unique."
              :required="true"
            />
            <div class="mt-4">
              <label class="mb-1 block text-sm font-medium text-gray-700">Description</label>
              <textarea
                v-model="product.description"
                rows="6"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <p class="mt-1 text-xs text-gray-500">
                Set a description to the product for better visibility.
              </p>
            </div>
          </FormSection>

          <FormSection title="Media">
            <div class="flex h-32 w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 text-gray-500">
              <span class="flex items-center gap-2">

                Drop files here or click to upload.
              </span>
            </div>
          </FormSection>

          <FormSection title="Pricing">
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormInput
                v-model.number="product.basePrice"
                label="Base Price"
                placeholder="Product price"
                type="number"
                :required="true"
              />
            </div>
            <FormRadioGroup
              v-model="product.discountType"
              label="Discount Type"
              :options="[
                { label: 'No Discount', value: 'none' },
                { label: 'Percentage %', value: 'percentage' },
                { label: 'Fixed Price', value: 'fixed' },
              ]"
            />
            <div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormSelect
                v-model="product.taxClass"
                label="Tax Class"
                :required="true"
                :options="[
                  { label: 'Select an option', value: null },
                  { label: 'Taxable Goods', value: 'taxable' },
                  { label: 'No Tax', value: 'none' },
                ]"
              />
              <FormInput
                v-model.number="product.vatAmount"
                label="VAT Amount (%)"
                type="number"
                :required="true"
              />
            </div>
          </FormSection>
        </div>

        <div class="flex flex-col gap-6 lg:col-span-1">
          <FormSection title="Thumbnail">
            <FormFileUpload
              v-model="thumbnailFile"
              accept="image/png, image/jpeg, image/jpg"
              description="*.png, *.jpg and *.jpeg"
            />
          </FormSection>

          <FormSection title="Status">
            <FormSelect
              v-model="product.status"
              label="Status"
              :options="[
                { label: 'Published', value: 'published' },
                { label: 'Draft', value: 'draft' },
              ]"
            />
          </FormSection>

          <FormSection title="Product Details">
            <FormSelect
              v-model="product.category"
              label="Categories"
              :options="[
                { label: 'Select an option', value: null },
                { label: 'Electronics', value: 'electronics' },
                { label: 'Clothing', value: 'clothing' },
              ]"
            />
            <button
              type="button"
              class="mt-2 text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              + Create New Category
            </button>

            <div class="mt-4">
              <FormSelect
                v-model="product.tags"
                label="Tags"
                :options="[{ label: 'Select tags...', value: [] }]"
              />
            </div>
          </FormSection>

          <FormSection title="Product Template">
            <FormSelect
              v-model="product.template"
              label="Select a product template"
              :options="[{ label: 'Default template', value: 'default' }]"
            />
          </FormSection>
        </div>

        <div class="flex items-center justify-start gap-3 lg:col-span-3">
          <button
            type="submit"
            class="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Save Changes
          </button>
          <button
            type="button"
            class="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100"
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  </div>
</template>

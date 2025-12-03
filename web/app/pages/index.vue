<script setup lang="ts">
const TAB_INDEX_ZERO = '0'
const TAB_INDEX_ONE = '1'

const items = [
  {
    label: 'Productos',
    icon: 'i-fluent-database-arrow-right-16-filled',
    slot: 'product-list',
  },
  {
    label: 'Crear producto',
    icon: 'i-fluent-add-circle-16-filled',
    slot: 'create-product-form',
  },
]

const activeTab = ref()
const title = ref('')

watch(activeTab, (value) => {
  if (value === TAB_INDEX_ZERO) {
    title.value = 'Ver productos'
  }
  else if (value === TAB_INDEX_ONE) {
    title.value = 'Crear producto'
  }
  else {
    title.value = 'Ver productos'
  }
}, { immediate: true })
</script>

<template>
  <div class="container mx-auto">
    <TheNav />
    <section class="container p-6 md:p-12">
      <UPageHeader :title="title" />
      <UTabs v-model="activeTab" :items="items">
        <template #create-product-form>
          <ProductForm />
        </template>

        <template #product-list>
          <ProductList />
        </template>
      </UTabs>
    </section>
  </div>
</template>

<script setup lang="ts">
const items = ref([
  [
    {
      label: 'Administrador',
      avatar: {
        src: '#',
      },
      type: 'label',
    },
  ],
  [
    {
      label: 'Ver web',
      icon: 'i-fluent-window-new-16-filled',
    },
    {
      label: 'API',
      icon: 'i-fluent-braces-16-filled',
      disabled: true,
    },
    {
      label: 'Cerrar sesión',
      icon: 'i-fluent-pane-close-16-filled',
    },
  ],
])
</script>

<template>
  <UDropdownMenu :items="items">
    <UButton icon="i-fluent-list-16-filled" color="neutral" variant="outline" />
  </UDropdownMenu>
</template>

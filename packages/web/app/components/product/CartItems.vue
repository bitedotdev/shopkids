<script lang="ts" setup>
import { useCart } from '~/store/cart'

defineProps<{ product: any }>()

const cart = useCart()

const count = ref<number>(1)
</script>

<template>
  <article class="flex gap-4 items-center border border-gray-200 dark:border-gray-800 rounded-xl">
    <figure class="w-fit h-fit overflow-hidden rounded-xl">
      <SanityImage
        :asset-id="product.imageAssetId" auto="format" :w="160" :h="160"
        fit="crop"
      >
        <template #default="{ src }">
          <img
            :src="src" :alt="product.name" loading="lazy"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          >
        </template>
      </SanityImage>
    </figure>
    <div class="space-y-2 flex-1">
      <h2 class="font-bold text-xl">
        {{ product.name }}
      </h2>
      <div class="w-full overflow-hidden h-6">
        <p class="text-sm text-gray-600 w-full">
          {{ product.description }} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, odio eligendi. Vel aliquid deleniti aspernatur molestiae, repellendus, laborum incidunt sint necessitatibus, adipisci neque dolorem reiciendis voluptas impedit similique! Beatae, accusantium?
        </p>
      </div>
      <div class="flex items-center gap-4">
        <UButton :disabled="count <= 1" size="sm" variant="outline" color="neutral" icon="i-fluent-minimize-24-filled" @click="count--" />
        <span>{{ count }}</span>
        <UButton size="sm" variant="outline" color="neutral" icon="i-fluent-add-24-filled" @click="count++" />
      </div>
      <p class="font-bold text-lg">
        $ {{ product.price * count }}
      </p>
    </div>
    <div class="pr-4">
      <UButton variant="outline" color="error" icon="i-fluent-delete-24-filled" @click="cart.remove(product._id)" />
    </div>
  </article>
</template>

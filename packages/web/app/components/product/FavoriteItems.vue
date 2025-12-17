<script lang="ts" setup>
import { useFavorite } from '~/store/favorite'

defineProps<{ product: any }>()

const favorite = useFavorite()
</script>

<template>
  <article class="flex gap-4 items-center border border-gray-200 dark:border-gray-800 rounded-xl">
    <figure class="w-fit h-fit overflow-hidden rounded-xl">
      <SanityImage :asset-id="product.imageAssetId" auto="format" :w="130" :h="130" fit="crop">
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
          {{ product.description }} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, odio eligendi. Vel
          aliquid deleniti aspernatur molestiae, repellendus, laborum incidunt sint necessitatibus, adipisci neque
          dolorem
          reiciendis voluptas impedit similique! Beatae, accusantium?
        </p>
      </div>
      <p class="font-bold text-lg">
        $ {{ product.price }}
      </p>
    </div>
    <div class="pr-4">
      <UButton variant="outline" color="error" icon="i-fluent-delete-24-filled" @click="favorite.remove(product._id)" />
    </div>
  </article>
</template>

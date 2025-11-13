<template>
  <nav class="flex justify-between items-center p-5 shadow-md">
    <figure class="flex gap-3">
      <!-- TODO: Add Logo image -->
      <figcaption class="font-bold text-2xl">
        Shop Kids
      </figcaption>
    </figure>

    <div class="flex items-center gap-3 cursor-pointer">
      <figure class="flex items-center justify-center">
        <NuxtImg
          src="/images/user_profile_blank.jpg"
          width="50"
        />
      </figure>

      <div>
        <h4 class="font-semibold">
          Administrador
        </h4>
        <div class="flex items-center justify-between">
          <small class="text-gray-500">Ver perfil</small>
          <UIcon name="fluent:chevron-down-16-filled" />
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'

const schema = z.object({
  email: z.email('Invalid email'),
  password: z.string('Password is required').min(8, 'Must be at least 8 characters'),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log(event.data)
}
</script>

<template>
  <div class="p-16 md:h-screen">
    <div
      class="rounded-2xl shadow-md grid md:grid-cols-2 h-full bg-accented items-center container m-auto"
    >
      <article class="p-5 flex justify-center items-center">
        <img
          src="https://spike-nuxtjs-pro-main.netlify.app/images/backgrounds/login-security.png"
          alt="logo de la empresa"
        >
      </article>
      <article class="space-y-8 flex flex-col justify-center p-10">
        <h2 class="text-center font-bold text-5xl">
          Bienvenido
        </h2>
        <p class="text-base text-dimmed text-center">
          Su panel de administración
        </p>
        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
          <UFormField label="Nombre de usuario" name="username">
            <UInput
              v-model="state.email" type="text" class="w-full" variant="ghost"
              placeholder="Escribe tu nombre de usuario" color="secondary" highlight required
            />
          </UFormField>
          <UFormField label="Contraseña" name="password">
            <UInput
              v-model="state.password" placeholder="Password" type="password" class="w-full" variant="ghost"
              color="secondary" highlight required
            />
          </UFormField>
          <div class="flex justify-end">
            <a href="/auth/login" class="w-fit text-secondary">¿Olvidaste tu contraseña?</a>
          </div>
          <UButton type="submit" color="secondary" class="w-full rounded-full flex justify-center text-base">
            Iniciar Sesión
          </UButton>
        </UForm>
      </article>
    </div>
  </div>
</template>

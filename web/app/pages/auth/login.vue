<script setup lang="ts">
import * as z from 'zod'

const schema = z.object({
  email: z.email('Invalid email'),
  password: z.string('Password is required').min(8, 'Must be at least 8 characters'),
})

type User = z.output<typeof schema>

// const toast = useToast()

const isLoading = ref(false)
const sign = ref<'in' | 'up'>('in')

const state = reactive<Partial<User>>({
  email: undefined,
  password: undefined,
})

// function displayError(error: { message: string }) {
//   toast.add({
//     title: 'Error',
//     description: error.message,
//     icon: 'i-lucide-alert-circle',
//     color: 'error',
//   })
// }

async function signIn(email: string, password: string) {
  console.warn('Signing in', email, password)
}

async function onSubmit(payload: { data: User }) {
  isLoading.value = true
  const email = payload.data.email
  const password = payload.data.password

  if (sign.value === 'in') {
    await signIn(email, password)
  }
  else {
    // Maybe we will implement registration in the future.
  }
  isLoading.value = false
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
              v-model="state.email"
              type="text"
              class="w-full"
              color="neutral"
              size="xl"
              variant="ghost"
              placeholder="Escribe tu nombre de usuario"
              highlight
              required
            />
          </UFormField>
          <UFormField label="Contraseña" name="password">
            <UInput
              v-model="state.password"
              color="neutral"
              size="xl"
              placeholder="Password"
              type="password" class="w-full"
              variant="ghost"
              highlight
              required
            />
          </UFormField>
          <UButton
            type="submit"
            :loading="isLoading"
            color="neutral"
            size="xl"
            block
          >
            Iniciar Sesión
          </UButton>
        </UForm>
      </article>
    </div>
  </div>
</template>

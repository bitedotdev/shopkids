<script lang="ts" setup>
import type { FormSubmitEvent } from '#ui/types'
import * as z from 'zod'
import { useCart } from '~/store/cart'

const cart = useCart()
const router = useRouter()
const toast = useToast()

if (cart.storage.length === 0) {
  router.push('/')
}

const formRef = ref()

const deliveryOptions = ref([
  { value: 'delivery', label: 'Enviar a domicilio' },
  { value: 'pickup', label: 'Recoger en sitio' },
])

const currency = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

const breadcrumbItems = [
  {
    label: 'Inicio',
    to: '/',
  },
  {
    label: 'Carrito',
    to: '/cart',
  },
  {
    label: 'Finalizar Compra',
    class: 'font-bold text-primary',
  },
]

const baseSchema = z.object({
  deliveryMethod: z.enum(['delivery', 'pickup']),
  firstName: z.string().min(2, 'Ingresa tu nombre (mínimo 2 letras)'),
  lastName: z.string().min(2, 'Ingresa tu apellido'),
  phone: z.string()
    .min(10, 'El teléfono debe tener al menos 10 dígitos')
    .regex(/^\d+$/, 'Solo se permiten números'),
  city: z.string().min(3, 'Ingresa una ciudad válida'),
  address: z.string().min(5, 'La dirección es muy corta'),
  email: z.string().email('Email inválido').or(z.literal('')),
  notes: z.string().optional(),
})

const schema = baseSchema.superRefine((data: any, ctx: any) => {
  if (data.deliveryMethod === 'delivery') {
    if (!data.city || data.city.length < 3) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'La ciudad es requerida para envíos',
        path: ['city'],
      })
    }
    if (!data.address || data.address.length < 5) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'La dirección es requerida para envíos',
        path: ['address'],
      })
    }
  }
})

type Schema = z.output<typeof schema>

const state = reactive<Schema>({
  deliveryMethod: 'delivery',
  firstName: '',
  lastName: '',
  phone: '',
  city: '',
  address: '',
  email: '',
  notes: '',
})

const loading = ref(false)

const subtotal = computed(() => cart.storage.reduce((acc, item) => acc + (item.offer || item.price || 0), 0))
const total = computed(() => subtotal.value)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true

  const data = event.data

  const PHONE_NUMBER = '573014414663'

  let message = `*¡Hola Shopkids! Quiero realizar un nuevo pedido.*\n\n`
  message += `🎉 *Cliente:* ${data.firstName} ${data.lastName}\n`
  message += `📱 *Telefono:* ${data.phone}\n`
  message += `📍 *Dirección:* ${data.address}, ${data.city}\n`

  if (data.email)
    message += `📧 *Email:* ${data.email}\n`
  if (data.notes)
    message += `📝 *Notas:* ${data.notes}\n`

  message += `\n*🛒 PEDIDO:*\n`

  cart.storage.forEach((item) => {
    message += `- ${item.name} | ${currency.format(item.offer || item.price)}\n`
  })

  const shippingText = data.deliveryMethod === 'pickup'
    ? 'Recoge en tienda (Gratis)'
    : 'A coordinar con el vendedor 🚚'

  message += `\n🚚 *Envío:* ${shippingText}\n`
  message += `💰 *TOTAL PRODUCTOS: ${currency.format(total.value)}*\n\n`

  if (data.deliveryMethod === 'delivery') {
    message += `_(El valor del envío se acordará en este chat)_`
  }

  const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`

  setTimeout(() => {
    window.open(url, '_blank')
    loading.value = false
    toast.add({ title: '¡Redirigiendo a WhatsApp!', color: 'success' })
  }, 500)
}
</script>

<template>
  <NuxtLayout>
    <div class="min-h-screen bg-white py-12">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="mb-10">
          <UBreadcrumb :items="breadcrumbItems" class="font-bold text-primary mb-4" />
          <h1 class="text-4xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
            <div class="w-12 h-12 bg-yellow-400 rounded-2xl flex items-center justify-center text-white shadow-lg rotate-3">
              <UIcon name="i-ph-rocket-launch-fill" class="text-2xl text-yellow-900" />
            </div>
            Casi <span class="text-primary italic">tuyo...</span>
          </h1>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div class="lg:col-span-7">
            <div class="bg-white dark:bg-gray-900 rounded-[3rem] p-8 shadow-xl border-4 border-white dark:border-gray-800">
              <div class="flex items-center gap-3 mb-8 border-b-4 border-dashed border-gray-50 pb-6">
                <UIcon name="i-ph-map-pin-line-fill" class="text-3xl text-primary" />
                <h2 class="text-2xl font-black text-gray-800 dark:text-white">
                  ¿A dónde enviamos la magia?
                </h2>
              </div>

              <UForm ref="formRef" :schema="schema" :state="state" class="space-y-6" @submit="onSubmit">
                <UFormField label="Elige cómo recibir tu pedido" name="deliveryMethod" class="pb-4">
                  <div class="bg-gray-50 dark:bg-gray-800 p-2 rounded-4xl flex gap-2">
                    <UButton
                      v-for="option in deliveryOptions"
                      :key="option?.value"
                      block
                      :color="state.deliveryMethod === option.value ? 'primary' : 'neutral'"
                      :variant="state.deliveryMethod === option.value ? 'solid' : 'ghost'"
                      class="flex-1 rounded-2xl h-12 font-bold transition-all"
                      @click="state.deliveryMethod = (option.value as any)"
                    >
                      <UIcon :name="option.value === 'delivery' ? 'i-ph-truck-bold' : 'i-ph-storefront-bold'" class="mr-2" />
                      {{ option.label }}
                    </UButton>
                  </div>
                </UFormField>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <UFormField label="Nombre" name="firstName">
                    <UInput v-model="state.firstName" placeholder="Ej: Juan" size="xl" color="primary" class="rounded-2xl w-full" />
                  </UFormField>

                  <UFormField label="Apellido" name="lastName">
                    <UInput
                      v-model="state.lastName" placeholder="Ej: Pérez" size="xl" color="primary"
                      class="rounded-2xl w-full"
                    />
                  </UFormField>
                </div>

                <UFormField label="Teléfono / WhatsApp" name="phone" help="Te escribiremos para coordinar la entrega.">
                  <UInput v-model="state.phone" type="tel" placeholder="300 123 4567" icon="i-ph-whatsapp-logo-bold" size="xl" class="rounded-2xl w-full" />
                </UFormField>

                <div v-if="state.deliveryMethod === 'delivery'" class="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-in">
                  <UFormField label="Ciudad" name="city">
                    <UInput v-model="state.city" placeholder="Ej: Bogotá" size="xl" class="rounded-2xl w-full" />
                  </UFormField>

                  <UFormField label="Dirección de entrega" name="address">
                    <UInput v-model="state.address" placeholder="Ej: Calle 10 # 5-20" icon="i-ph-house-bold" size="xl" class="rounded-2xl w-full" />
                  </UFormField>
                </div>

                <UFormField label="Correo electrónico (Opcional)" name="email">
                  <UInput v-model="state.email" type="email" placeholder="hola@ejemplo.com" icon="i-ph-envelope-simple-bold" size="xl" class="rounded-2xl w-full" />
                </UFormField>

                <UFormField label="Notas para el repartidor" name="notes">
                  <UTextarea v-model="state.notes" placeholder="Ej: El timbre no sirve, preguntar por Juan..." size="xl" class="rounded-2xl w-full" />
                </UFormField>
              </UForm>
            </div>
          </div>

          <div class="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <div class="bg-primary rounded-[3rem] p-8 text-white shadow-2xl relative overflow-hidden">
              <div class="absolute -bottom-10 -left-10 w-40 h-40 bg-primary rounded-full opacity-50 blur-3xl" />

              <h3 class="text-2xl font-black mb-6 flex items-center gap-3">
                <UIcon name="i-ph-shopping-cart-simple-fill" />
                Tu pedido
              </h3>

              <div class="max-h-60 overflow-y-auto space-y-4 mb-8 pr-2 custom-scrollbar">
                <div v-for="item in cart.storage" :key="item._id" class="flex gap-4 bg-white p-3 rounded-2xl shdaow-md">
                  <div class="w-16 h-16 bg-white rounded-xl overflow-hidden shrink-0">
                    <SanityImage
                      v-if="item.imageAssetId"
                      :asset-id="item.imageAssetId"
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <div class="flex-1 min-w-0 flex flex-col justify-center">
                    <p class="font-bold text-sm truncate text-primary">
                      {{ item.name }}
                    </p>
                    <p class="text-primary text-sm font-bold mt-1">
                      {{ currency.format(item.offer || item.price) }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="space-y-4 text-sm font-bold border-t border-primary pt-6">
                <div class="flex justify-between text-pink-100">
                  <span>Subtotal</span>
                  <span>{{ currency.format(subtotal) }}</span>
                </div>
                <div class="flex justify-between items-center text-pink-100">
                  <span>Envío</span>
                  <UBadge
                    v-if="state.deliveryMethod === 'delivery'"
                    color="neutral"
                    variant="soft"
                    size="sm"
                    class="rounded-full font-black text-[10px]"
                  >
                    A COORDINAR
                  </UBadge>
                  <span v-else class="text-yellow-300 font-black italic">¡GRATIS!</span>
                </div>

                <div class="flex justify-between text-2xl font-black pt-4 text-white">
                  <span>Total</span>
                  <span class="text-yellow-400 drop-shadow-md">
                    {{ currency.format(total) }}
                  </span>
                </div>
              </div>

              <div class="mt-10">
                <UButton
                  block
                  size="xl"
                  color="warning"
                  icon="i-ph-whatsapp-logo-fill"
                  :loading="loading"
                  class="h-16 rounded-[1.5rem] font-black text-xl text-yellow-900 shadow-[0_8px_0_0_#ca8a04] active:shadow-none active:translate-y-1 transition-all"
                  @click="formRef?.submit()"
                >
                  ¡Confirmar Pedido!
                </UButton>

                <p class="text-[11px] text-pink-100/70 text-center mt-6 font-medium leading-relaxed italic">
                  ✨ Se abrirá WhatsApp con el mensaje listo para enviar.
                </p>
              </div>
            </div>

            <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 flex items-center justify-center gap-3 border border-gray-100 dark:border-gray-800">
              <UIcon name="i-ph-shield-check-fill" class="text-green-500 text-2xl" />
              <span class="text-xs font-bold text-gray-500 uppercase tracking-wider">Pago seguro contra entrega</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
}
</style>

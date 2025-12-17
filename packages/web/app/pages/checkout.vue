<script lang="ts" setup>
import * as z from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { useCart } from '~/store/cart'
import type { RadioGroupItem } from '@nuxt/ui'

const cart = useCart()
const router = useRouter()
const toast = useToast()

if (cart.storage.length === 0) {
  router.push('/')
}

const formRef = ref()

const deliveryOptions = ref<RadioGroupItem[]>([
  { value: 'delivery', label: 'Enviar a domicilio' },
  { value: 'pickup', label: 'Recoger en sitio' }
])

const currency = new Intl.NumberFormat('es-CO', { 
  style: 'currency', 
  currency: 'COP', 
  maximumFractionDigits: 0 
})

const breadcrumbItems = [
  {
    label: 'Inicio',    
    to: '/'
  },  
  {
    label: 'Carrito',    
    to: '/cart'
  },
  {
    label: 'Finalizar Compra',    
    class: 'font-bold text-primary'
  }
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
  notes: z.string().optional()
})

const schema = baseSchema.superRefine((data: any, ctx: any) => {
  if (data.deliveryMethod === 'delivery') {
    if (!data.city || data.city.length < 3) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'La ciudad es requerida para envíos',
        path: ['city']
      })
    }
    if (!data.address || data.address.length < 5) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'La dirección es requerida para envíos',
        path: ['address']
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
  notes: ''
})

const loading = ref(false)

const subtotal = computed(() => cart.storage.reduce((acc, item) => acc + (item.offer || item.price || 0), 0))
const total = computed(() => subtotal.value)

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  loading.value = true
    
  const data = event.data

  const PHONE_NUMBER = '573044176141'

  let message = `*¡Hola Shopkids! Quiero realizar un nuevo pedido.*\n\n`
  message += `🎉 *Cliente:* ${data.firstName} ${data.lastName}\n`
  message += `📱 *Telefono:* ${data.phone}\n`
  message += `📍 *Dirección:* ${data.address}, ${data.city}\n`

  if(data.email) message += `📧 *Email:* ${data.email}\n`
  if(data.notes) message += `📝 *Notas:* ${data.notes}\n`
  
  message += `\n*🛒 PEDIDO:*\n`
  
  cart.storage.forEach(item => {
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
    <div class="min-h-screen bg-gray-50 dark:bg-gray-950 py-10">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        
      <div class="mb-8">
          <UBreadcrumb :items="breadcrumbItems" />
          <h4 class="text-3xl font-bold mt-4 text-gray-900 dark:text-white">Finalizar Compra</h4>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div class="lg:col-span-7 space-y-6">
            <UCard class="shadow-sm ring-1 ring-gray-200 dark:ring-gray-800">
              <template #header>
                <h2 class="text-lg font-medium flex items-center gap-2">
                  <UIcon name="i-lucide-map-pin" class="text-primary-500 w-5 h-5" />
                  Información de Envío
                </h2>
              </template>
              
              <UForm ref="formRef" :schema="schema" :state="state" class="space-y-5" @submit="onSubmit">
                
<UFormField label="¿Cómo deseas recibir tu pedido?" name="deliveryMethod">
  <URadioGroup v-model="state.deliveryMethod" orientation="horizontal" variant="list" :items="deliveryOptions" />
</UFormField>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <UFormField label="Nombre" name="firstName">
                    <UInput v-model="state.firstName" placeholder="Juan" class="w-full" />
                  </UFormField>
                  
                  <UFormField label="Apellido" name="lastName">
                    <UInput v-model="state.lastName" placeholder="Pérez" class="w-full" />
                  </UFormField>
                </div>

                <UFormField label="Teléfono / WhatsApp" name="phone" help="Te contactaremos por aquí.">
                  <UInput v-model="state.phone" type="tel" placeholder="300 123 4567" icon="i-lucide-phone" class="w-full" />
                </UFormField>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <UFormField label="Ciudad" name="city">
                    <UInput v-model="state.city" placeholder="Bogotá..." class="w-full" />
                  </UFormField>
                  
                  <UFormField label="Dirección" name="address">
                    <UInput v-model="state.address" placeholder="Cra 10 # 93..." icon="i-lucide-home" class="w-full" />
                  </UFormField>
                </div>

                <UFormField label="Correo (Opcional)" name="email">
                  <UInput v-model="state.email" type="email" placeholder="juan@email.com" icon="i-lucide-mail" class="w-full" />
                </UFormField>

                <UFormField label="Notas adicionales" name="notes">
                  <UTextarea v-model="state.notes" placeholder="Ej: Dejar en portería, timbre dañado..." class="w-full" />
                </UFormField>

              </UForm>
            </UCard>
          </div>

          <div class="lg:col-span-5 space-y-6 sticky top-6">
            <div class="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
              <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-white">Tu Pedido</h3>
              
              <div class="max-h-60 overflow-y-auto space-y-4 mb-6 pr-2 custom-scrollbar">
                <div v-for="item in cart.storage" :key="item._id" class="flex gap-4">
                  <div class="w-16 h-20 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shrink-0 border border-gray-200 dark:border-gray-700">
                     <SanityImage 
                        v-if="item.imageAssetId"
                        :asset-id="item.imageAssetId" 
                        class="w-full h-full object-cover" 
                     />
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="font-medium text-sm truncate text-gray-900 dark:text-white">{{ item.name }}</p>
                    <p class="text-gray-500 text-sm mt-1">{{ currency.format(item.offer || item.price) }}</p>
                  </div>
                </div>
              </div>

              <USeparator class="my-6 border-gray-200 dark:border-gray-800" />

              <div class="space-y-3 text-sm">
                 <div class="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>{{ currency.format(subtotal) }}</span>
                </div>
          <div class="flex justify-between items-center text-gray-600 dark:text-gray-400">
                  <span>Envío</span>
                  <UBadge 
                    v-if="state.deliveryMethod === 'delivery'" 
                    color="neutral" 
                    variant="soft" 
                    size="xs"
                  >
                    A coordinar
                  </UBadge>
                  <span v-else class="text-green-600 font-medium">Gratis</span>
                </div>

                <div class="flex justify-between text-lg font-bold pt-4 border-t border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span>{{ currency.format(total) }}</span>
                </div>
              </div>

              <div class="mt-8">
                <UButton 
                  block 
                  size="xl" 
                  color="success" 
                  icon="i-logos-whatsapp-icon"
                  :loading="loading"
                  @click="formRef?.submit()"
                  class="rounded-full font-bold shadow-lg shadow-green-500/20 transition-all hover:scale-[1.02]"
                >
                  Confirmar pedido
                </UButton>
                
                <p class="text-xs text-gray-400 text-center mt-4 leading-relaxed">
                  Al confirmar, serás redirigido a WhatsApp con el detalle de tu pedido listo para enviar.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #e5e7eb;
  border-radius: 20px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #374151;
}
</style>

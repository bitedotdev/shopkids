<script setup lang="ts">
defineProps({
  title: { type: String, default: 'Nueva Colección de Verano' },
  subtitle: { type: String, default: 'Descubre las últimas tendencias' },
  description: { type: String, default: 'Explora nuestra selección exclusiva de prendas diseñadas para destacar tu estilo único.' },
  imageSrc: { type: String, required: true },
  ctaText: { type: String, default: 'Comprar Ahora' },
  secondaryCtaText: { type: String, default: 'Ver Video' },
})
</script>

<template>
  <section class="relative py-12 md:py-24 overflow-hidden">
    <UContainer>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div class="space-y-8 animate-fade-in-up">
          <div class="space-y-4">
            <UBadge variant="subtle" size="lg" class="mb-4 text-primary-600 bg-primary-50 dark:bg-primary-900/20">
              {{ subtitle }}
            </UBadge>

            <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.1]">
              {{ title }}
            </h1>

            <p class="text-lg text-gray-500 dark:text-gray-400 max-w-lg leading-relaxed">
              {{ description }}
            </p>
          </div>

          <div class="flex flex-wrap gap-4">
            <UButton size="xl" class="px-8">
              {{ ctaText }}
              <template #trailing>
                <UIcon name="i-lucide-arrow-right" />
              </template>
            </UButton>

            <UButton size="xl" variant="outline" class="px-8">
              <UIcon name="i-lucide-play-circle" />
              {{ secondaryCtaText }}
            </UButton>
          </div>

          <div class="pt-8 flex gap-8 border-t border-gray-100 dark:border-gray-800">
            <div>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">
                2k+
              </p>
              <p class="text-sm text-gray-500">
                Clientes Felices
              </p>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">
                500+
              </p>
              <p class="text-sm text-gray-500">
                Productos
              </p>
            </div>
          </div>
        </div>

        <div class="relative group">
          <div class="absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded-4xl transform rotate-3 scale-95 transition-transform duration-500 group-hover:rotate-6" />

          <img
            :src="imageSrc"
            :alt="title"
            class="relative w-full h-[500px] object-cover rounded-[1.5rem] shadow-2xl transform transition-transform duration-500 hover:-translate-y-2"
          >

          <UCard class="absolute -bottom-6 -left-6 w-64 shadow-xl border-none ring-1 ring-gray-200 dark:ring-gray-700">
            <div class="flex items-center gap-4">
              <div class="p-2 bg-green-100 text-green-600 rounded-full">
                <UIcon name="i-lucide-shield-check" class="w-6 h-6" />
              </div>
              <div>
                <p class="font-bold text-gray-900 dark:text-white">
                  Calidad Premium
                </p>
                <p class="text-xs text-gray-500">
                  Garantía de 30 días
                </p>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

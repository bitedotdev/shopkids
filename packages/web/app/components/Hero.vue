<script setup lang="ts">
defineProps({
  title: { type: String, default: 'Nueva Colección de Verano' },
  subtitle: { type: String, default: 'Descubre las últimas tendencias' },
  description: { type: String, default: 'Explora nuestra selección exclusiva de prendas diseñadas para destacar tu estilo único.' },
})
</script>

<template>
  <section class="relative min-h-[80%] flex items-center overflow-hidden py-12 md:py-24">
    <UContainer>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div class="space-y-8 animate-fade-in-up">
          <div class="space-y-4">
            <UBadge variant="subtle" size="lg" class="mb-4 text-primary">
              {{ subtitle }}
            </UBadge>

            <h1 class="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.1]">
              {{ title }}
            </h1>

            <p class="text-lg text-gray-500 dark:text-gray-400 max-w-lg leading-relaxed">
              {{ description }}
            </p>
          </div>
        </div>

        <div class="relative group">
          <div class="absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded-4xl transform rotate-3 scale-95 transition-transform duration-500 group-hover:rotate-6" />

          <img
            src="/images/dmitrii_e_IJflJBABqDk_unsplash.webp"
            :alt="title"
            class="relative w-full h-[500px] object-cover rounded-[1.5rem] shadow-2xl transform transition-transform duration-500 hover:-translate-y-2"
          >
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

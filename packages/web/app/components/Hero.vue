<script setup lang="ts">
defineProps({
  title: { type: String, default: 'Nueva Colección de Verano' },
  subtitle: { type: String, default: 'Descubre las últimas tendencias' },
  description: { type: String, default: 'Explora nuestra selección exclusiva de prendas diseñadas para destacar tu estilo único.' },
})
</script>

<template>
  <section class="relative overflow-hidden py-16 md:py-28 bg-linear-to-b from-yellow-50 to-white">    
    <div class="absolute top-1/2 -right-12 w-48 h-48 bg-pink-200/50 rounded-full blur-3xl" />
    <UContainer>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div class="space-y-8 relative z-10">
          <div class="space-y-6">
            <UBadge 
              variant="subtle" 
              size="lg" 
              class="rounded-full px-4 py-1.5 font-bold uppercase tracking-wider bg-orange-100 text-orange-600 ring-0"
            >
              <UIcon name="i-ph-sparkle-fill" class="mr-1" />
              {{ subtitle }}
            </UBadge>

            <h1 class="text-5xl md:text-7xl font-black text-gray-900 leading-[1.1] tracking-tight">
              {{ title.split(',')[0] }} <br>
              <span class="text-primary italic">{{ title.split(',')[1] }}</span>
            </h1>

            <p class="text-xl text-gray-600 max-w-lg font-medium leading-relaxed">
              {{ description }}
            </p>
          </div>

          <div class="flex gap-4">
            <UButton to="#catalog" size="xl" class="rounded-full px-8 shadow-xl hover:scale-105 transition-transform" trailing-icon="i-ph-arrow-right-bold">
              Explorar ahora
            </UButton>
          </div>
        </div>

        <div class="relative group">
          <div class="absolute inset-0 bg-primary rounded-[3rem] rotate-3 scale-105 opacity-20 group-hover:rotate-6 transition-transform" />
          <div class="absolute inset-0 bg-yellow-400 rounded-[3rem] -rotate-3 scale-105 opacity-20 group-hover:-rotate-6 transition-transform" />
          
          <img
            src="/images/dmitrii_e_IJflJBABqDk_unsplash.webp"
            :alt="title"
            class="relative w-full h-125 object-cover rounded-[2.5rem] shadow-2xl border-8 border-white"
          >
          
          <div class="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce">
            <div class="bg-green-100 p-2 rounded-full">
              <UIcon name="i-ph-smiley-wink-fill" class="w-8 h-8 text-green-600" />
            </div>
            <div>
              <p class="text-xs font-bold text-gray-400 uppercase">Garantía</p>
              <p class="font-black text-gray-900">100% Diversión</p>
            </div>
          </div>
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

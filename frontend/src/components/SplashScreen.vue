<script setup>
import { onMounted } from 'vue'

const emit = defineEmits(['next'])

onMounted(() => {
  setTimeout(() => {
    emit('next')
  }, 1250)
})
</script>

<template>
  <div class="h-[100dvh] w-full bg-backgroundMain dark:bg-darkBackgroundMain flex flex-col items-center justify-center absolute inset-0">
    <div class="text-center px-6">
      <h1 class="text-4xl md:text-5xl font-bold text-textPrimary dark:text-darkTextPrimary mb-4">
        Adʿiyah
      </h1>
      <p class="text-xl md:text-2xl text-textSecondary dark:text-darkTextSecondary font-medium">
        by Imad
      </p>
    </div>
  </div>
</template>

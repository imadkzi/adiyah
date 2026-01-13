<script setup>
defineEmits(['next'])
</script>

<template>
  <div class="h-[calc(100dvh-4rem)] w-full flex flex-col items-center justify-center px-6">
    <div class="text-center max-w-md">
      <h2 class="text-2xl md:text-3xl font-semibold mb-4 text-textPrimary dark:text-darkTextPrimary">
        Take a moment.
      </h2>
      
      <p class="text-textSecondary dark:text-darkTextSecondary mb-8 text-base md:text-lg">
        Write a Dua you wish to be remembered during Umrah.
      </p>
      
      <button
        @click="$emit('next')"
        class="w-full max-w-xs mx-auto bg-accentSand dark:bg-darkAccentSand text-textPrimary dark:text-darkBackgroundMain font-semibold py-4 px-8 rounded-[12px] shadow-soft hover:shadow-soft-lg active:scale-95 transition-all duration-200 tap-target"
      >
        I'm ready to write
      </button>
      
      <p class="text-sm text-textMuted dark:text-darkTextMuted mt-6">
        Submissions are read personally and remembered in prayer.
      </p>
    </div>
  </div>
</template>

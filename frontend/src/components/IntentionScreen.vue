<script setup>
defineEmits(["next"]);
</script>

<template>
  <div
    class="h-[calc(100dvh-4rem)] w-full flex flex-col items-center justify-center px-6"
  >
    <div class="text-center max-w-md">
      <h2
        class="text-2xl md:text-3xl font-semibold mb-4 text-accentSand dark:text-darkTextSecondary"
      >
        As-salāmu ʿalaykum
      </h2>

      <p
        class="text-textPrimary dark:text-darkTextPrimary mb-8 text-base md:text-lg"
      >
        I’m going for Umrah soon, in shāʾ Allāh.
        <br />
        If you’d like, you can share a dua for me to remember and say while I’m
        there. You can do so via the form.
      </p>

      <button
        @click="$emit('next')"
        class="w-full max-w-xs mx-auto bg-accentSand text-textPrimary dark:text-darkBackgroundMain font-semibold py-4 px-8 rounded-[12px] shadow-soft hover:shadow-soft-lg active:scale-95 transition-all duration-200 tap-target"
      >
        I'm ready to write
      </button>

      <p class="text-sm text-textMuted dark:text-darkTextMuted mt-6">
        Submissions are read personally and remembered.
      </p>
    </div>
  </div>
</template>

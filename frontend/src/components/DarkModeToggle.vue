<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(false)

onMounted(() => {
  const savedPreference = localStorage.getItem('darkMode')
  
  if (savedPreference !== null) {
    isDark.value = savedPreference === 'true'
    applyDarkMode(isDark.value)
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    isDark.value = prefersDark
    applyDarkMode(isDark.value)
  }
})

const applyDarkMode = (dark) => {
  if (dark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

const toggleDarkMode = () => {
  isDark.value = !isDark.value
  applyDarkMode(isDark.value)
  localStorage.setItem('darkMode', isDark.value.toString())
}
</script>

<template>
  <button
    @click="toggleDarkMode"
    class="fixed bottom-6 left-6 p-4 rounded-[12px] text-textPrimary dark:text-darkTextPrimary transition-all duration-200 tap-target z-50 bg-cardSurface dark:bg-darkCardSurface shadow-soft-lg hover:shadow-soft-lg hover:scale-105 active:scale-95 border border-backgroundAlt dark:border-darkBackgroundAlt"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <svg
      v-if="isDark"
      xmlns="http://www.w3.org/2000/svg"
      class="h-7 w-7"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2.5"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
    
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      class="h-7 w-7"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2.5"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  </button>
</template>

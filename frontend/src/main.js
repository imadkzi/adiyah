import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const initializeDarkMode = () => {
  const savedPreference = localStorage.getItem('darkMode')
  
  if (savedPreference !== null) {
    if (savedPreference === 'true') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (prefersDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
}

initializeDarkMode()

createApp(App).mount('#app')

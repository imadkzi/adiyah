<script setup>
import { ref } from "vue";
import SplashScreen from "./components/SplashScreen.vue";
import IntentionScreen from "./components/IntentionScreen.vue";
import DuaForm from "./components/DuaForm.vue";
import PersistentHeader from "./components/PersistentHeader.vue";
import DarkModeToggle from "./components/DarkModeToggle.vue";

const currentScreen = ref("splash");

const goToNext = () => {
  if (currentScreen.value === "splash") {
    currentScreen.value = "intention";
  } else if (currentScreen.value === "intention") {
    currentScreen.value = "form";
  }
};

const handleSuccess = () => {
  currentScreen.value = "confirmation";
};

const resetToStart = () => {
  currentScreen.value = "intention";
};
</script>

<template>
  <div
    class="min-h-[100dvh] w-full overflow-hidden bg-backgroundMain dark:bg-darkBackgroundMain relative"
  >
    <PersistentHeader v-if="currentScreen !== 'splash'" />
    <DarkModeToggle v-if="currentScreen !== 'splash'" />

    <transition name="fade" mode="out-in">
      <SplashScreen
        v-if="currentScreen === 'splash'"
        key="splash"
        @next="goToNext"
      />

      <IntentionScreen
        v-else-if="currentScreen === 'intention'"
        key="intention"
        @next="goToNext"
      />

      <DuaForm
        v-else-if="currentScreen === 'form'"
        key="form"
        @success="handleSuccess"
      />

      <div
        v-else-if="currentScreen === 'confirmation'"
        key="confirmation"
        class="h-[calc(100dvh-4rem)] w-full flex flex-col items-center justify-center px-6"
      >
        <div class="text-center max-w-md">
          <div class="mb-8">
            <p
              class="text-textPrimary dark:text-darkTextPrimary text-base md:text-lg mb-2"
            >
              Your Dua has been received.
            </p>
            <p
              class="text-textSecondary dark:text-darkTextSecondary text-base md:text-lg"
            >
              May Allah accept your dua.
            </p>
          </div>

          <button
            @click="resetToStart"
            class="w-full max-w-xs mx-auto bg-accentSand dark:bg-darkAccentSand text-textPrimary dark:text-darkBackgroundMain font-semibold py-4 px-8 rounded-[12px] shadow-soft hover:shadow-soft-lg active:scale-95 transition-all duration-200 tap-target"
          >
            Submit Another Dua
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active {
  transition: opacity 0.5s ease-in;
}

.fade-leave-active {
  transition: opacity 0.4s ease-out;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.fade-enter-from {
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
}
</style>

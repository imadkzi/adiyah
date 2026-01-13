<script setup>
import { ref } from "vue";
import axios from "axios";

const emit = defineEmits(["success"]);

const name = ref("");
const dua = ref("");
const honey = ref("");
const isSubmitting = ref(false);
const errorMessage = ref("");

const API_URL = "https://adiyah-production.up.railway.app/submit-dua";

const handleSubmit = async () => {
  if (!name.value.trim() || !dua.value.trim()) {
    return;
  }

  errorMessage.value = "";
  isSubmitting.value = true;

  try {
    await axios.post(
      API_URL,
      {
        name: name.value.trim(),
        dua: dua.value.trim(),
        honey: honey.value,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    name.value = "";
    dua.value = "";
    honey.value = "";
    isSubmitting.value = false;
    emit("success");
  } catch (error) {
    isSubmitting.value = false;
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      if (status === 500) {
        errorMessage.value =
          data?.message || "Server error. Please try again later.";
      } else {
        errorMessage.value =
          data?.message ||
          `Failed to send your Dua (${status}). Please try again.`;
      }
    } else if (error.request) {
      errorMessage.value =
        "Unable to connect to the server. Please check your connection and try again.";
    } else {
      errorMessage.value = "An unexpected error occurred. Please try again.";
    }
  }
};
</script>

<template>
  <div
    class="h-[calc(100dvh-4rem)] w-full flex flex-col items-center justify-center px-6 py-8"
  >
    <div class="w-full max-w-md">
      <div
        v-if="errorMessage"
        class="mb-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-[12px] text-center text-sm"
      >
        {{ errorMessage }}
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label
            for="name"
            class="block text-sm font-medium text-textPrimary dark:text-darkTextPrimary mb-2"
          >
            Name <span class="text-accentSand dark:text-darkAccentSand">*</span>
          </label>
          <input
            id="name"
            v-model="name"
            type="text"
            required
            placeholder="Enter your name"
            class="w-full px-4 py-3 rounded-[12px] bg-cardSurface dark:bg-darkCardSurface text-textPrimary dark:text-darkTextPrimary placeholder:text-textMuted dark:placeholder:text-darkTextMuted focus:outline-none focus:ring-2 focus:ring-accentSand dark:focus:ring-darkAccentSand shadow-soft"
          />
        </div>

        <div>
          <label
            for="dua"
            class="block text-sm font-medium text-textPrimary dark:text-darkTextPrimary mb-2"
          >
            Dua <span class="text-accentSand dark:text-darkAccentSand">*</span>
          </label>
          <textarea
            id="dua"
            v-model="dua"
            required
            rows="6"
            placeholder="Write your Dua here..."
            class="w-full px-4 py-3 rounded-[12px] bg-cardSurface dark:bg-darkCardSurface text-textPrimary dark:text-darkTextPrimary placeholder:text-textMuted dark:placeholder:text-darkTextMuted focus:outline-none focus:ring-2 focus:ring-accentSand dark:focus:ring-darkAccentSand shadow-soft resize-none"
          ></textarea>
        </div>

        <input
          v-model="honey"
          type="text"
          name="website"
          autocomplete="off"
          tabindex="-1"
          class="hidden"
          aria-hidden="true"
        />

        <p class="text-sm text-textMuted dark:text-darkTextMuted">
          Your Dua will be received privately.
        </p>

        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full bg-accentSand text-textPrimary dark:text-darkBackgroundMain font-semibold py-4 px-8 rounded-[12px] shadow-soft hover:shadow-soft-lg active:scale-95 transition-all duration-200 tap-target disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="!isSubmitting">Submit Your Dua</span>
          <span v-else>Sending...</span>
        </button>
      </form>
    </div>
  </div>
</template>

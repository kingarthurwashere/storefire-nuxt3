<script setup>
import { storeToRefs } from "pinia";
import { useThemeStore } from "../stores/theme";
const themeStore = useThemeStore();
const { darkMode } = storeToRefs(themeStore);
</script>

<template>
  <div
    aria-label="Site Footer"
    class="bg-white"
    :class="{ 'dark:bg-gray-900': darkMode }"
  >
    <div class="mx-auto max-w-screen-xl px-4 pb-8 pt-16 sm:px-6 lg:px-8">
      <div
        class="mt-16 border-t border-gray-100 pt-8"
        :class="{ 'dark:border-gray-800': darkMode }"
      >
        <p
          class="text-center text-xs/relaxed text-gray-500"
          :class="{ 'dark:text-gray-400': darkMode }"
        >
          © DxbRunners 2024. All rights reserved.

          <br />

          Powered By
          <a
            href=""
            class="text-gray-700 underline transition hover:text-gray-700/75"
            :class="{
              'dark:text-white': darkMode,
              'dark:hover:text-white/75': darkMode,
            }"
            >Mikhman</a
          >.
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

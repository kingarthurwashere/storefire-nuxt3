<script setup>
import { storeToRefs } from "pinia";
import { useThemeStore } from "../stores/theme";

const themeStore = useThemeStore();
const { darkMode } = storeToRefs(themeStore);
</script>

<template>
  <div class="bg-white" :class="{ 'dark:bg-gray-900': darkMode }">
    <NuxtLoadingIndicator throttle="0"/>
    <NavBar />
    <slot />
   
    <TheFooter />
  </div>
</template>

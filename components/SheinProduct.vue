<script setup>
import { useThemeStore } from "../stores/theme";
import { storeToRefs } from "pinia";


const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const themeStore = useThemeStore();
const { darkMode } = storeToRefs(themeStore);

function viewItem(asin) {
  navigateTo(`/shein/${asin}`);
}
</script>

<template>
  <div class="mt-12">
    <div class="w-full">
      <div class="grid grid-cols-6 gap-4">
        <!-- Main Product Image -->
        <div class="col-start-1 col-end-5 ...">
          <img
            class="rounded-lg w-full object-cover transition duration-500 group-hover:scale-105"
            :src="product.image"
            alt="Product Image"
          />
        </div>
        <!-- Additional Product Images -->
        <div class="col-end-7 col-span-2 flex flex-col items-start">
          <template v-if="product.additionalImages && product.additionalImages.length >= 1">
            <img
              v-for="(image, index) in product.additionalImages"
              :key="index"
              class="rounded-lg max-h-64 mb-2 object-cover transition duration-500 group-hover:scale-105"
              :src="image"
              alt="Additional Product Image"
            />
          </template>
        </div>
      </div>
    </div>

    <!-- Product Details -->
    <div class="mt-4">
      <h2 class="font-semibold" :class="{ 'dark:text-white': darkMode }">
        {{ product.title }}
      </h2>
      <h4
        class="font-bold flex justify-between"
        :class="{ 'dark:text-white': darkMode }"
      >
        <span> AED{{ product.price }} </span>
        <span
          class="text-green-800"
          :class="{
            'text-red-400': product.availability === 'Currently unavailable.',
          }"
        >{{ product.availability }}</span>
      </h4>
      <p
        class="text-gray-900 dark:text-dark"
        :class="{ 'dark:text-white': darkMode }"
      >
        {{ product.specifications }}
      </p>
      <button
        @click="viewItem(product.asin)"
        class="block mt-4 w-full rounded bg-yellow-400 p-4 text-sm font-bold transition hover:scale-105"
      >
        View Item
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Add any additional styling if needed */
</style>

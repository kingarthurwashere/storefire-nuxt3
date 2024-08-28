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
  const sku = asin.replace("/p/", ""); // Remove "/p/" from the ASIN
  navigateTo(`/noon/${sku}`);
}
</script>

<template>
  <div class="mt-12" v-if="product !== null" >
    <div class="w-full">
      <div class="grid grid-cols-6 gap-4">
        <div class="col-start-1 col-end-5 ...">
          <img
            class="rounded-lg w-full object-cover transition duration-500 group-hover:scale-105"
            :src="product.images[0]"
            alt=""
            srcset=""
          />
        </div>
        <div class="col-end-7 col-span-2 flex flex-col items-start">
          <img
            class="rounded-lg max-h-64 mb-2 object-cover transition duration-500 group-hover:scale-105"
            :src="product.images[1]"
            alt=""
            srcset=""
          />
          <img
            class="rounded-lg max-h-64 object-cover transition duration-500 group-hover:scale-105"
            :src="product.images[2]"
            alt=""
            srcset=""
          />
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

<script setup>
import {useThemeStore} from "../stores/theme";
import {storeToRefs} from "pinia";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const themeStore = useThemeStore();
const {darkMode} = storeToRefs(themeStore);

function viewItem(asin) {
  navigateTo(`/products/${asin}`);
}
</script>

<template>
  <div class="mt-12" v-if="product !== null">
    <div class="w-full">
      <div class="grid grid-cols-6 gap-4">
        <div class="col-start-1 col-end-5 ...">
          <img
            class="main-image rounded-lg w-full object-cover transition duration-500 group-hover:scale-105 ma"
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

    <div class="mt-4">
      <h2 class="font-semibold" :class="{'dark:text-white': darkMode}">
        {{ product.title }}
      </h2>
      <h4
        v-if="product.price > 0"
        class="font-bold flex justify-between"
        :class="{'dark:text-white': darkMode}"
      >
        <span class="text-green-800"> AED{{ product.price_upper }} </span>
        <span
          class="text-green-800"
          :class="{
            'text-red-400': product.availability === 'Currently unavailable.',
          }"
          >{{ product.availability }}</span
        >
      </h4>
      <h4 v-if="product.price === 0" class="text-red-800 font-bold">
        Unfortunately, we couldn't fetch price information for this item
      </h4>
      <p
        class="text-gray-900 dark:text-dark"
        :class="{'dark:text-white': darkMode}"
      >
        {{ product.description.substring(0, 220) + "..." }}
      </p>
      <button
        v-if="
          product.availability !== 'Currently unavailable.' && product.price > 0
        "
        @click="viewItem(product.asin)"
        class="block mt-4 w-full rounded bg-yellow-400 p-4 text-sm font-bold transition hover:scale-105"
      >
        View Item
      </button>
    </div>
  </div>
</template>

<style scoped></style>

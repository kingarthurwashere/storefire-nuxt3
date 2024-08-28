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

function viewItem(identifier) {
  navigateTo(`/aliexpress/${identifier}`);
}
</script>

<template>
  <div class="mt-12" v-if="product !== null">
    <div class="w-full">
      <div class="grid grid-cols-6 gap-4">
        <!-- Main Product Image -->
        <div class="col-start-1 col-end-5 ...">
          <img
            class="rounded-lg w-full object-cover transition duration-500 group-hover:scale-105"
            :src="product.images[0]"
            alt="Product Image"
            referrerpolicy="no-referrer"
          />
        </div>
        <!-- Additional Product Images -->
        <div class="col-end-7 col-span-2 flex flex-col items-start">
          <img
            class="rounded-lg max-h-64 mb-2 object-cover transition duration-500 group-hover:scale-105"
            :src="product.images[1]"
            alt=""
            srcset=""
            referrerpolicy="no-referrer"
          />
          <img
            v-if="product.images.length > 2"
            class="rounded-lg max-h-64 object-cover transition duration-500 group-hover:scale-105"
            :src="product.images[2]"
            alt=""
            srcset=""
            referrerpolicy="no-referrer"
          />
        </div>
      </div>
    </div>

    <!-- Product Details -->
    <div class="mt-4">
      <div v-if="product.shipping_price === null">
        <h2 class="font-semibold" :class="{'dark:text-white': darkMode}">
          {{ product.title }}
        </h2>
        <h4
          class="font-bold flex justify-between"
          :class="{'dark:text-white': darkMode}"
        >
          <div class="text-lg">AED{{ product.price.toFixed(2) }}</div>
          <span
            class="text-green-800"
            :class="{
              'text-red-400': product.availability === 'Currently unavailable.',
            }"
            >{{ product.availability }}</span
          >
        </h4>
      </div>

      <div
        v-if="
          product.shipping_price !== undefined &&
          product.shipping_price !== null &&
          product.shipping_price > 0
        "
        class="flow-root rounded-lg border border-gray-100 py-3 shadow-sm"
      >
        <dl class="-my-3 divide-y divide-gray-100 text-sm">
          <div class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
            <dt class="font-medium text-gray-900 font-semibold">Price</dt>
            <dd class="text-gray-700 sm:col-span-2 font-bold">
              AED{{ product.price.toFixed(2) }}
            </dd>
          </div>

          <div class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
            <dt class="font-medium text-gray-900 font-semibold">
              Shipping To DXB Warehouse
            </dt>
            <dd class="text-gray-700 sm:col-span-2 font-bold">
              AED{{ product.shipping_price.toFixed(2) }}
            </dd>
          </div>

          <div class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
            <dt class="font-medium text-gray-900 font-semibold">Total Price</dt>
            <dd class="text-gray-700 sm:col-span-2 font-bold">
              AED{{ product.priceWithShipping.toFixed(2) }}
            </dd>
          </div>

          <div class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
            <dt class="font-medium text-gray-900 font-semibold">Description</dt>
            <dd class="text-gray-700 sm:col-span-2">
              {{ product.title }}
            </dd>
          </div>
        </dl>
      </div>

      <button
        @click="viewItem(product.file_id)"
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

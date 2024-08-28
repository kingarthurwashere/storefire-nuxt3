<script setup>
import {useThemeStore} from "../stores/theme";
import {storeToRefs} from "pinia";

const props = defineProps({
  ads: {
    type: Array,
    required: true,
  },
});

const filteredItems = computed(() => {
  return props.ads.filter((ad) => ad.asin !== undefined).slice(0, 4);
});

const themeStore = useThemeStore();
const {darkMode} = storeToRefs(themeStore);
</script>

<template>
  <section v-if="ads !== null">
    <div class="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
      <header>
        <h2
          class="text-xl font-bold sm:text-3xl"
          :class="{'dark:text-white': darkMode}"
        >
          Related Items
        </h2>
        <p class="max-w-md mt-4 text-gray-500"></p>
      </header>

      <ul class="grid gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-4">
        <li v-for="(ad, index) in filteredItems" :key="index">
          <nuxt-link
            v-if="ad.images !== undefined"
            :href="`/products/${ad.asin}`"
            class="block overflow-hidden group"
          >
            <img
              v-if="ad.images.length > 0"
              :src="ad.images[0].replace('SS57', 'SL1500')"
              alt=""
              class="h-[100px] transition duration-500 group-hover:scale-105 sm:h-[170px]"
            />

            <div class="relative pt-3">
              <h3
                class="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4"
                :class="{'dark:text-white': darkMode}"
              >
                {{ ad.title }}
              </h3>

              <p class="mt-2">
                <span class="sr-only"> Regular Price </span>

                <span
                  v-if="ad.price > 0"
                  class="tracking-wider"
                  :class="{'dark:text-white': darkMode}"
                >
                  AED {{ ad.price.toFixed(2) }}
                </span>

                <span
                  v-if="ad.price === 0"
                  class="tracking-wider text-sm"
                  :class="{'dark:text-white': darkMode}"
                >
                  Tap To View Price
                </span>
              </p>
            </div>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped></style>

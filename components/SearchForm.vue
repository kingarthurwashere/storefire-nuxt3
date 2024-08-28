<template>
  <div class="flex flex-col">
    <!-- Dark mode conditional background -->
    <div :class="{'dark:bg-gray-900': darkMode}">
      <div class="mx-auto max-w-screen-xl px-4 pb-6 pt-2 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-xl">
          <form class="flex items-center">
            <!-- Input field for Amazon or AliExpress URL -->
            <div class="relative flex-grow">
              <label class="sr-only" for="url">URL</label>
              <input
                class="w-full focus:outline-none rounded-full border-2 border-pink-600 bg-gray-100 p-4 pe-32 text-sm font-medium text-black"
                :class="{
                  'dark:border-gray-700': darkMode,
                  'dark:bg-gray-800': darkMode,
                  'dark:text-gray-900': darkMode,
                }"
                id="url"
                type="text"
                autocomplete="off"
                v-model="urlToCheck"
                placeholder="Paste your Link here....."
                @input="onInput"
              />

              <!-- Search table -->
              <button
                v-if="urlToCheck.length > 0 && !scraping"
                @click="reset"
                :disabled="scraping"
                style="top: 14px; right: 88px"
                class="absolute cursor-pointer rounded-full bg-gray-100 px-3 py-2 text-sm text-slate-900 font-bold transition hover:bg-red-300"
              >
                <span
                  ><svg
                    width="10px"
                    height="10px"
                    viewBox="0 0 512 512"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <title>cancel</title>
                    <g
                      id="Page-1"
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <g
                        id="work-case"
                        fill="#000000"
                        transform="translate(91.520000, 91.520000)"
                      >
                        <polygon
                          id="Close"
                          points="328.96 30.2933333 298.666667 1.42108547e-14 164.48 134.4 30.2933333 1.42108547e-14 1.42108547e-14 30.2933333 134.4 164.48 1.42108547e-14 298.666667 30.2933333 328.96 164.48 194.56 298.666667 328.96 328.96 298.666667 194.56 164.48"
                        ></polygon>
                      </g>
                    </g></svg
                ></span>
              </button>

              <div class="absolute inset-y-0 right-2 flex items-center">
                <button
                  v-if="!scraping"
                  @click="sharedStore.checkUrl"
                  :disabled="scraping"
                  class="cursor-pointer rounded-full bg-pink-600 px-5 py-3 text-sm text-white font-bold transition hover:bg-pink-800"
                  type="button"
                >
                  <span>Check</span>
                </button>

                <ring-loader
                  v-if="scraping"
                  size="20px"
                  class="ml-2 cursor-pointer rounded-full px-5 py-3 text-sm text-white font-bold transition"
                >
                </ring-loader>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {watch, ref} from "vue";
import {useThemeStore} from "../stores/theme";
import {useAmazonStore} from "../stores/amazon_scraper";
import {useAliExpressStore} from "../stores/aliexpress_scraper";
import {useNoonStore} from "../stores/noon_scraper";
import {useSheinStore} from "../stores/shein_scraper";
import {useSharedStore} from "../stores/shared";
import RingLoader from "vue-spinner/src/RingLoader.vue";
import {storeToRefs} from "pinia";
import {useToast} from "vue-toastification";

// Initialize stores
const themeStore = useThemeStore();
const amazonStore = useAmazonStore();
const aliExpressStore = useAliExpressStore();
const noonStore = useNoonStore();
const sheinStore = useSheinStore();
const sharedStore = useSharedStore();

const {darkMode} = storeToRefs(themeStore);
const {urlToCheck, scraping, discoveredItemShop} = storeToRefs(sharedStore);

//clear button show functionn

const toast = useToast();

watch(urlToCheck, (currentValue, oldValue) => {
  if (currentValue.length === 0) {
    //scrapperStore.clearDiscoveredItem();
  }
});

// Function to handle input event
function onInput(e) {
  urlToCheck.value = e.target.value;
}
</script>

<script setup>
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import RingLoader from "vue-spinner/src/RingLoader.vue";
import BeatLoader from "vue-spinner/src/BeatLoader.vue";
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useSheinStore } from "../../stores/shein_scraper";
import SheinService from '../../services/shein.service';
import { useThemeStore } from '@/stores/theme';

const route = useRoute();
const themeStore = useThemeStore();
const sheinStore = useSheinStore();
const { checkingWoocommerce, agreed, dxbUrl, uploadingToWoocommerce } = storeToRefs( sheinStore );
const { checkWoocommerce, toggleAgree } = sheinStore;
const { darkMode } = storeToRefs(themeStore);
const { asin } = route.params;
const session = ref(null);

const sheinService = new SheinService();

agreed.value = false

async function fetchData() {
  try {
    const resp = await sheinService.view(asin, 'shein');
    if (!resp || !resp.success) {
      location.href = '/404';
    } else {
      session.value = resp.data.item;
      
    }
  } catch (error) {
   
  }
}

function checkProduct() {
  checkWoocommerce({
    asin,
    session: session.value,
  });
}

function toggleCheckbox() {
  toggleAgree();
}

function closeModal() {
  // Implement your modal close logic here
}

fetchData();
</script>

<template>
  <section>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <div class="relative mx-auto max-w-screen-lg px-4 py-8">
      <div v-if="session !== null && session !== undefined">
        <br />
        <br />
        <div class="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
          <div class="grid grid-cols-2 gap-4 md:grid-cols-1">
            <div class="grid grid-cols-4">
              <img
                :src="session.image"
                class="col-start-1 col-span-3 w-full rounded-md object-cover"
              />
            </div>
          </div>

          <div class="sticky top-[190px]">
            <div class="mt-8 flex justify-between">
              <div class="max-w-full space-y-2">
                <h1
                  class="text-xl font-bold sm:text-2xl"
                  :class="{ 'text-gray-400': darkMode }"
                >
                  {{ session.title }}
                </h1>

                <p class="text-sm" :class="{ 'text-gray-200': darkMode }">
                  <a :href="session.url" target="_blank">{{
                    session.ids
                  }}</a>
                </p>

                <p
                  class="text-xl font-bold text-green-300"
                  :class="{ 'text-gray-100': darkMode }"
                >
                  AED {{ session.price}}
                </p>
              </div>
            </div>

            <div class="mt-4">
              <div
                class="prose max-w-none"
                :class="{ 'text-gray-100': darkMode }"
              >
                <p>
                  {{ session.specifications }}
                </p>
              </div>
            </div>

            <div class="mt-4">
              <!--
  Heads up! 👋

  This component comes with some `rtl` classes. Please remove them if they are not needed in your project.
-->

              <div class="overflow-x-none">
                <div class="divide-gray-200 text-sm">
                  <div
                    class="odd:bg-gray-50 flex justify-between"
                    :class="{
                      'bg-gray-900': darkMode,
                      'odd:bg-gray-800': darkMode,
                    }"
                  >
                    <span
                      class="px-4 py-2 text-right text-gray-700 text-clip"
                      :class="{ 'text-slate-400': darkMode }"
                    >
                      {{  session.measurements }}
                    </span>
                  </div>
                </div>
                <article class="rounded-lg mt-4 border border-gray-100 bg-white p-6">
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-sm text-gray-500">
                        Landing Price In Zimbawe
                      </p>

                      <p class="text-3xl font-medium text-gray-900">
                        ${{ session.dxb_price }}
                      </p>
                    </div>

                    <span class="rounded-full bg-blue-100 p-3 text-blue-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </span>
                  </div>

                  <div class="mt-1 flex gap-1 text-green-600">
                    <svg
                      fill="#000000"
                      class="h-4 w-4"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <g id="Calendar_Date">
                          <path
                            d="M18.435,4.955h-1.94v-1.41c0-0.26-0.23-0.51-0.5-0.5c-0.27,0.01-0.5,0.22-0.5,0.5v1.41h-7v-1.41 c0-0.26-0.23-0.51-0.5-0.5c-0.27,0.01-0.5,0.22-0.5,0.5v1.41h-1.93c-1.38,0-2.5,1.12-2.5,2.5v11c0,1.38,1.12,2.5,2.5,2.5h12.87 c1.38,0,2.5-1.12,2.5-2.5v-11C20.935,6.075,19.815,4.955,18.435,4.955z M19.935,18.455c0,0.83-0.67,1.5-1.5,1.5H5.565 c-0.83,0-1.5-0.67-1.5-1.5v-8.42h15.87V18.455z M19.935,9.035H4.065v-1.58c0-0.83,0.67-1.5,1.5-1.5h1.93v0.59 c0,0.26,0.23,0.51,0.5,0.5c0.27-0.01,0.5-0.22,0.5-0.5v-0.59h7v0.59c0,0.26,0.23,0.51,0.5,0.5c0.27-0.01,0.5-0.22,0.5-0.5v-0.59 h1.94c0.83,0,1.5,0.67,1.5,1.5V9.035z"
                          ></path>
                          <path
                            d="M11.492,17.173v-3.46c0-0.059-0.064-0.095-0.114-0.064l-0.638,0.392 c-0.1,0.061-0.228-0.01-0.228-0.128v-0.651c0-0.105,0.055-0.203,0.146-0.257l0.764-0.457c0.047-0.028,0.1-0.043,0.154-0.043h0.626 c0.166,0,0.3,0.134,0.3,0.3v4.367c0,0.166-0.134,0.3-0.3,0.3h-0.409C11.626,17.473,11.492,17.339,11.492,17.173z"
                          ></path>
                        </g>
                      </g>
                    </svg>

                    <p class="flex gap-2 text-xs">
                      <span class="text-gray-500"> Arrives in 7 days </span>
                    </p>
                  </div>
                </article>

                <div class="flex items-center mt-6 mb-0 cursor-pointer">
                    <input id="link-checkbox" type="checkbox"  @change="toggleCheckbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    <label for="link-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-800">I agree with the <a href="/terms-and-conditions" class="text-blue-600 dark:text-blue-500 hover:underline">terms and conditions</a>.</label>
                </div>

                 <button
                  v-if="
                    !checkingWoocommerce &&
                    !uploadingToWoocommerce &&
                    dxbUrl === ''
                  "
                  :disabled="!agreed"
                  @click="checkProduct()"
                  :class="{ 'bg-indigo-400 hover:bg-indigo-400': !agreed, 'bg-indigo-600': agreed}"
                  class="mt-4 inline-block w-full rounded  px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400"
                >
                  Proceed To Purchase Item
                </button>

            
                <button
                  v-if="checkingWoocommerce"
                  disabled="true"
                  :disabled="checkingWoocommerce"
                  class="mt-8 inline-block w-full rounded bg-indigo-200 px-12 py-3 text-sm font-medium text-white transition focus:outline-none focus:ring focus:ring-yellow-400"
                >
                  Please wait ...
                </button>


                <div v-if="dxbUrl !== ''">
                  <br />
                  <div></div>

                  <a
                    :href="dxbUrl"
                    class="mt-2 pulsate-button w-full text-center inline-block rounded bg-green-800 px-12 py-3 text-sm font-medium text-white transition hover:bg-teal-700 focus:outline-none focus:ring focus:ring-yellow-400"
                  >
                    <span><b class="underline">Your link is ready :)</b></span>
                    <div>Buy It From DxbRunners</div>
                  </a>
                </div>

                <RingLoader v-if="checkingWoocommerce" />
              </div>
            </div>
          </div>
        </div>

        <!-- <RelatedProducts :ads="session.ads" /> -->
      </div>
      <div v-if="session === null" class="text-center">
        <img src="/images/infinity.gif" class="mx-auto h-16" alt="" srcset="" />
      </div>
    </div>

    <fwb-modal @close="closeModal">
      <template #header>
        <div class="flex items-center text-lg">
          Terms of Service
        </div>
      </template>
      <template #body>
        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
        </p>
        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
        </p>
      </template>
      <template #footer>
        <div class="flex justify-between">
          <fwb-button @click="closeModal" color="alternative">
            Decline
          </fwb-button>
          <fwb-button @click="closeModal" color="green">
            I accept
          </fwb-button>
        </div>
      </template>
    </fwb-modal>
  </section>
</template>

<style scoped>
@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.pulsate-button {
  animation: pulse 2.5s infinite;
}
</style>
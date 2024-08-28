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
      <div v-if="session !== null">
        <br />
        <br />
        <div
          v-if="session.images !== undefined && session.images.length > 0"
          class="grid grid-cols-1 items-start gap-8 md:grid-cols-2"
        >
          <div class="grid grid-cols-2 gap-4 md:grid-cols-1">
            <div class="grid grid-cols-4">
              <img
                :src="session.images[0]"
                class="col-start-1 col-span-3 w-full rounded-md object-cover"
              />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <img
                v-for="img in session.images"
                :src="img"
                class="aspect-square w-full rounded-md object-cover"
              />
            </div>
          </div>

          <div class="sticky top-[190px]">
            <div class="mt-8 flex justify-between">
              <div class="max-w-full space-y-2">
                <h1
                  class="text-xl font-bold sm:text-2xl"
                  :class="{'text-gray-400': darkMode}"
                >
                  {{ session.title }}
                </h1>

                <p class="text-sm" :class="{'text-gray-200': darkMode}">
                  <a :href="session.url" target="_blank">{{ session.asin }}</a>
                </p>

                <div class="flex my-8">
                  <div v-if="session.price > 0" class="mr-4">
                    <span class="font-bold text-gray-700 dark:text-gray-700"
                      >Price:
                    </span>
                    <span class="text-gray-600 dark:text-green-800 font-bold">
                      AED{{ session.price }}
                    </span>
                  </div>
                  <div>
                    <span class="font-bold text-gray-700 dark:text-gray-700"
                      >Weight:
                    </span>
                    <span class="text-gray-800 dark:text-gray-800">
                      {{ session.item_weight }}kg</span
                    >
                  </div>
                </div>
              </div>
            </div>

            <Carousel
              v-if="session.variation.length > 1"
              v-bind="{
                itemsToShow: 1,
                snapAlign: 'start',
              }"
              :breakpoints="{
                // 700px and up
                700: {
                  itemsToShow: 3.5,
                  snapAlign: 'start',
                },
                // 1024px and up
                1024: {
                  itemsToShow: 3,
                  snapAlign: 'start',
                },
              }"
            >
              <Slide
                v-for="(slide, index) in session.variation"
                :key="slide.asin"
              >
                <div :class="{carousel__item: true, 'mt-4': index !== 0}">
                  <ul v-if="slide.dimensions !== undefined" class="space-x-2">
                    <nuxt-link :to="`/products/${slide.asin}`">
                      <div
                        class="mr-2 bg-gray-200 p-2 rounded-md text-wrap"
                        :style="{
                          backgroundColor:
                            session.asin === slide.asin ? '#999' : '',
                        }"
                      >
                        <li v-for="(value, key) in slide.dimensions" :key="key">
                          <p class="font-semibold">{{ key }}:</p>
                          <p class="">{{ value }}</p>
                        </li>
                      </div>
                    </nuxt-link>
                  </ul>
                  <p v-else class="italic">No dimensions available</p>
                </div>
              </Slide>

              <template #addons>
                <Navigation />
              </template>
            </Carousel>

            <div class="mt-4">
              <div
                class="prose max-w-none"
                :class="{'text-gray-100': darkMode}"
              >
                <p>
                  {{ session.description }}
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
                    v-for="(value, key) in session.product_details"
                    class="odd:bg-gray-50 flex justify-between"
                    :class="{
                      'bg-gray-900': darkMode,
                      'odd:bg-gray-800': darkMode,
                    }"
                  >
                    <span
                      class="px-4 py-2 text-gray-700 font-bold"
                      :class="{'text-slate-400': darkMode}"
                    >
                      {{ convertToTitleCase(key) }}
                    </span>
                    <span
                      class="px-4 py-2 text-right text-gray-700 text-clip"
                      :class="{'text-slate-400': darkMode}"
                    >
                      {{ value }}
                    </span>
                  </div>
                </div>

                <div v-if="session.price === 0">
                  <div
                    role="alert"
                    class="rounded border-s-4 border-red-500 bg-red-50 p-4 mt-4"
                  >
                    <div class="flex items-center gap-2 text-red-800">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="h-5 w-5"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                          clip-rule="evenodd"
                        />
                      </svg>

                      <strong class="block font-medium"> Notice </strong>
                    </div>

                    <p class="mt-2 text-sm text-red-700">
                      We couldn't fetch the price information of this item
                    </p>
                  </div>
                </div>

                <article
                  v-if="session.price > 0"
                  class="rounded-lg mt-4 border border-gray-300 bg-white p-6"
                >
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

                <div
                  v-if="session.price > 0"
                  class="flex items-center mt-6 mb-0 cursor-pointer"
                >
                  <input
                    id="link-checkbox"
                    type="checkbox"
                    @change="toggleCheckbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="link-checkbox"
                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-800"
                    >I agree with the
                    <a
                      href="/terms-and-conditions"
                      class="text-blue-600 dark:text-blue-500 hover:underline"
                      >terms and conditions</a
                    >.</label
                  >
                </div>

                <!-- <OrderNotes v-if="agreed" class="mt-4" /> -->

                <button
                  v-if="
                    session.price > 0 &&
                    !checkingWoocommerce &&
                    !uploadingToWoocommerce &&
                    dxbUrl === ''
                  "
                  :disabled="!agreed"
                  @click="checkProduct()"
                  :class="{
                    'bg-indigo-400 hover:bg-indigo-400': !agreed,
                    'bg-indigo-600': agreed,
                  }"
                  class="mt-4 inline-block w-full rounded px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400"
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

        <div>
          <RelatedProducts
            v-if="session.ads !== undefined && session.ads !== null"
            :ads="session.ads"
          />
        </div>
      </div>
      <div v-else class="text-center">
        <img src="/images/infinity.gif" class="mx-auto h-16" alt="" srcset="" />
      </div>
    </div>

    <fwb-modal @close="closeModal">
      <template #header>
        <div class="flex items-center text-lg">Terms of Service</div>
      </template>
      <template #body>
        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          With less than a month to go before the European Union enacts new
          consumer privacy laws for its citizens, companies around the world are
          updating their terms of service agreements to comply.
        </p>
        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          The European Union’s General Data Protection Regulation (G.D.P.R.)
          goes into effect on May 25 and is meant to ensure a common set of data
          rights in the European Union. It requires organizations to notify
          users as soon as possible of high-risk data breaches that could
          personally affect them.
        </p>
      </template>
      <template #footer>
        <div class="flex justify-between">
          <fwb-button @click="closeModal" color="alternative">
            Decline
          </fwb-button>
          <fwb-button @click="closeModal" color="green"> I accept </fwb-button>
        </div>
      </template>
    </fwb-modal>
  </section>
</template>

<script setup>
import RingLoader from "vue-spinner/src/RingLoader.vue";
import {ref} from "vue";
import {useRoute} from "vue-router"; // Import useRoute from vue-router
import {storeToRefs} from "pinia";
import AmazonService from "../../services/amazon.service";
import {useAmazonStore} from "@/stores/amazon_scraper";
import {useThemeStore} from "@/stores/theme";

const route = useRoute();
const scrapperStore = useAmazonStore();
const themeStore = useThemeStore();
const {checkingWoocommerce, agreed, dxbUrl, uploadingToWoocommerce} =
  storeToRefs(scrapperStore);
const {darkMode} = storeToRefs(themeStore);
const {id} = route.params; // Access params from route.value
const {checkWoocommerce, toggleAgree} = scrapperStore;
const session = ref(null); // Define session as a ref

const amazonService = new AmazonService();
const resp = await amazonService.view(id, "amazon_ae");
agreed.value = false;

if (!resp.success) {
  location.href = "/404";
} else {
  // Assign the session data to the ref
  session.value = resp.data.item;
}

function convertToTitleCase(str) {
  // Split the string by underscore
  var words = str.split("_");

  // Capitalize the first letter of each word
  for (var i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }

  // Join the words back together with spaces
  return words.join(" ");
}

function checkProduct() {
  checkWoocommerce({
    session: session.value, // Pass session.value instead of session directly
  });
}

function toggleCheckbox() {
  toggleAgree();
}

function closeModal() {
  // Implement your modal close logic here
}
</script>

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

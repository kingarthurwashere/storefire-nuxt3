<template>
  <div class="flex flex-col max-h-full">
    <div class="bg-white max-h-full" :class="{'dark:bg-gray-900': darkMode}">
      <div
        class="mx-auto max-w-screen-xl mt-36 px-4 pb-8 pt-16 sm:px-6 lg:px-8"
      >
        <HomeCarousel
          class="mt-20"
          v-if="!scraping && discoveredItemShop === null"
        />
        <!-- Hide this entire div when the product is displayed -->
        <div class="mx-auto max-w-xl mt-8">
          <div v-if="!scraping">
            <div v-if="discoveredItemShop === 'noon'">
              <NoonProduct :product="noonItem" />
            </div>
            <div v-if="discoveredItemShop === 'aliexpress'">
              <AliexpressProduct :product="aliexpressItem" />
            </div>
            <div v-if="discoveredItemShop === 'amazon'">
              <DiscoveredProduct :product="amazonItem" />
            </div>
            <div v-if="discoveredItemShop === 'shein'">
              <SheinProduct :product="sheinItem" />
            </div>
          </div>
          <!-- Loader or placeholder for when the product is loading -->
          <div v-if="scraping">
            <div class="mt-12">
              <div class="w-full">
                <div class="grid grid-cols-6 gap-4">
                  <div class="col-start-1 col-end-5 ...">
                    <div
                      class="rounded-lg w-full object-cover transition duration-500 group-hover:scale-105"
                      alt=""
                      srcset=""
                    >
                      <div
                        class="skeleton-block rounded-lg skeleton-effect-fade mb-4"
                        style="height: 300px"
                      ></div>
                    </div>
                  </div>
                  <div class="col-end-7 col-span-2 flex flex-col items-start">
                    <div
                      class="rounded-lg w-full mb-2 object-cover transition duration-500 group-hover:scale-105"
                      alt=""
                      srcset=""
                    >
                      <div
                        class="skeleton-block rounded-lg skeleton-effect-fade mb-2"
                        style="height: 120px"
                      ></div>
                    </div>
                    <div
                      class="rounded-lg w-full mb-2 object-cover transition duration-500 group-hover:scale-105"
                      alt=""
                      srcset=""
                    >
                      <div
                        class="skeleton-block rounded-lg skeleton-effect-fade"
                        style="height: 120px"
                      ></div>
                    </div>
                  </div>
                </div>

                <span
                  class="rounded-lg w-full mt-6 long_line skeleton-text skeleton-effect-fade"
                  >Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam cupiditate ullam veritatis dolores obcaecati nemo
                  voluptate. Rem sint est nihil nulla numquam, neque
                  reprehenderit laborum exercitationem accusamus animi veritatis
                  aspernatur.</span
                >
              </div>
            </div>
          </div>

          <div v-else>
            <div v-if="scrapingError">
              <DiscoveredItemError />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {storeToRefs} from "pinia";
import {useThemeStore} from "../stores/theme";
import {useAliExpressStore} from "../stores/aliexpress_scraper";
import {useNoonStore} from "../stores/noon_scraper";
import "skeleton-elements/css";
import NoonProduct from "~/components/NoonProduct.vue";
import AliexpressProduct from "~/components/AliexpressProduct.vue";
import SheinProduct from "~/components/SheinProduct.vue";
import {useSheinStore} from "~/stores/shein_scraper";
import {useSharedStore} from "~/stores/shared";

export default {
  setup() {
    const amazonStore = useAmazonStore();
    const aliExpressStore = useAliExpressStore();
    const noonStore = useNoonStore();
    const sheinStore = useSheinStore();
    const themeStore = useThemeStore();
    const sharedStore = useSharedStore();

    const {discovered, scraping, discoveredItemShop, scrapingError} =
      storeToRefs(sharedStore);

    const {amazonItem} = storeToRefs(amazonStore);
    const {aliexpressItem} = storeToRefs(aliExpressStore);
    const {noonItem} = storeToRefs(noonStore);
    const {sheinItem} = storeToRefs(sheinStore);

    const {darkMode} = storeToRefs(themeStore);

    return {
      discovered,
      scraping,
      darkMode,
      noonItem,
      sheinItem,
      aliexpressItem,
      discoveredItemShop,
      amazonItem,
      scrapingError,
    };
  },
};
</script>

<style scoped>
.hidden {
  display: none;
}

.user-avatar .skeleton-block {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}
</style>

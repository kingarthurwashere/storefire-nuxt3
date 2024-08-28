<script setup>
import {useSharedStore} from "../stores/shared";
const sharedStore = useSharedStore();
</script>

<template>
  <section class="flex items-center p-16 bg-gray-">
    <div class="container flex flex-col items-center">
      <div class="flex flex-col gap-6 max-w-md text-center">
        <!-- <h2 class="font-extrabold text-9xl text-gray-600 dark:text-gray-100">
          <span class="sr-only">Error</span>404
        </h2> -->

        <div class="flex justify-center">
          <img class="h-64" src="/images/cancel.svg" alt="Home" />
        </div>
        <p class="text-xl md:text-xl font-bold dark:text-red-600">
          Sorry, we couldn't fetch that item for you
        </p>
        <button
          @click="sharedStore.checkUrl"
          class="px-4 py-2 text-lg font-semibold rounded text-gray-600 hover:text-gray-900"
        >
          Retry
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import "skeleton-elements/css";
</script>

<style></style>
<template>
  <div class="mt-12">
    <div class="w-full">
      <div class="grid grid-cols-6 gap-4">
        <div class="col-start-1 col-end-5 ...">
          <div
            class="rounded-lg w-full object-cover transition duration-500 group-hover:scale-105"
            alt=""
            srcset=""
          >
            <skeleton-loader-vue
              class="sk-cards"
              type="rect"
              :waveColor="cWaveColor"
              animation="wave"
              height="260"
            />
          </div>
        </div>
        <div class="col-end-7 col-span-2 flex flex-col items-start">
          <div
            class="rounded-lg w-full mb-2 object-cover transition duration-500 group-hover:scale-105"
            alt=""
            srcset=""
          >
            <skeleton-loader-vue
              class="sk-cards"
              type="rect"
              :waveColor="cWaveColor"
              animation="wave"
            />
          </div>
          <div
            class="rounded-lg w-full mb-2 object-cover transition duration-500 group-hover:scale-105"
            alt=""
            srcset=""
          >
            <skeleton-loader-vue
              class="sk-cards"
              type="rect"
              :waveColor="cWaveColor"
              animation="wave"
            />
          </div>
        </div>
      </div>
      <skeleton-loader-vue
        class="w-full mt-6 long_line"
        type="rect"
        :waveColor="cWaveColor"
        animation="wave"
      />
      <skeleton-loader-vue
        class="w-full mt-6 long_line"
        type="rect"
        :waveColor="cWaveColor"
        animation="wave"
      />
      <skeleton-loader-vue
        class="w-full mt-6 short_line"
        type="rect"
        :waveColor="cWaveColor"
        animation="wave"
      />
    </div>
  </div>
</template>

<style lang="css" scoped></style>

<script setup>
import { storeToRefs } from "pinia";
import { useSharedStore } from "../stores/shared";
const sharedStore = useSharedStore();
const { orderNotes } = storeToRefs( sharedStore );

function onInput(e) {
  orderNotes.value = e.target.value
}
</script>

<template>

<div>
  <label for="OrderNotes" class="sr-only">Order notes</label>

  <div
    class="overflow-hidden rounded-lg border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
  >
    <textarea
      id="OrderNotes"
      class="w-full resize-none border-none align-top focus:ring-0 sm:text-sm p-2"
      rows="4"
      @input="onInput"
      placeholder="Enter any additional required item notes here... sizes, color(s) etc."
    ></textarea>

    <div class="flex items-center justify-end gap-2 bg-white p-3">
      <button
        type="button"
        class="rounded bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-600"
      >
        Clear
      </button>

      <button
        type="button"
        class="rounded bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
      >
        Add
      </button>
    </div>
  </div>
</div>

</template>

<style lang="scss" scoped></style>

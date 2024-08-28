<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useThemeStore } from "../stores/theme";
import { useLocalStorage, usePreferredDark, useToggle } from '@vueuse/core'

const isMobileMenuOpen = ref( false );
const themeStore = useThemeStore();
const { darkMode } = storeToRefs( themeStore );

function toggleMobileMenu ()
{
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
}

// Function to toggle dark mode manually
const toggleDarkMode = () => {

  themeStore.toggleDarkMode();
}


</script>

<template>
  <header aria-label="Site Header" class="bg-gray-100 fixed w-full z-40"
    :class="{ 'dark:bg-gray-900': darkMode, 'dark:bg-gray-700': darkMode }">
    <div class=" bg-gradient-to-r from-pink-500 to-yellow-500 px-4 py-3 text-white">
      <p class="text-center text-sm font-medium">
        <a href="https://www.dxbrunners.com" target="_blank" class="inline-block underline font-bold">DxbRunners | Visit the main
          website</a>
      </p>
    </div>
    <!-- Mobile menu button -->
    <button @click="toggleMobileMenu" class="lg:hidden block px-4 py-3 text-gray-500">
      <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
      </svg>
    </button>

    <!-- Mobile menu -->
    <nav v-if="isMobileMenuOpen" class="lg:hidden bg-gray-100 absolute w-full top-16 z-50">
      <ul class="text-sm font-medium">
        <li>
          <NuxtLink to="/" class="block px-4 py-2"><img src="/images/Home.png" alt="Home" class="h-6" /></NuxtLink>
        </li>
        <li><a href="https://amazon.ae" target="_blank" class="block px-4 py-2"><img src="/images/Amazon.png" alt="Amazon" class="h-6" /></a></li>
        <li><a href="https://www.aliexpress.com/" target="_blank" class="block px-4 py-2"><img src="/images/Aliexpress.png" alt="AliExpress" class="h-6" /></a></li>
        <li><a href="https://www.noon.com/uae-en/" target="_blank" class="block px-4 py-2"><img src="/images/Noon.png" alt="Noon" class="h-6" /></a></li>
        <!-- <li><a href="https://www.shein.com/" target="_blank" class="block px-4 py-2"><img src="/images/Shein.png" alt="Shein" class="h-6" /></a></li> -->
        <!-- Add more links as needed -->
      </ul>
    </nav>

    <!-- Desktop menu -->
    <nav class="hidden lg:flex lg:items-center lg:justify-between lg:max-w-5xl lg:mx-auto lg:p-4">
      <NuxtLink to="/" class="block text-teal-600" :class="{ 'dark:text-teal-600': darkMode }">
        <span class="sr-only">Home</span>
        <img src="/images/sf.png" class="h-8" alt="" srcset="" />
      </NuxtLink>

      <ul class="flex items-center gap-2 text-sm font-medium text-gray-500">
        
        <li>
          <a class="inline-flex items-center gap-2 rounded-lg px-3 py-2" href="https://amazon.ae" target="_blank">
            <img src="/images/Amazon.png" alt="Amazon" class="h-6" />
          </a>
        </li>
       <li>
         <a class="inline-flex items-center gap-2 rounded-lg px-3 py-2" href="https://www.aliexpress.com/" target="_blank">
        <img src="/images/Aliexpress.png" alt="AliExpress" class="h-6" />
         </a>
      </li>
        <li>
         <a class="inline-flex items-center gap-2 rounded-lg px-3 py-2" href="https://www.noon.com/uae-en/" target="_blank">
        <img src="/images/Noon.png" alt="Noon" class="h-6" />
         </a>
      </li>
        <!-- <li>
          <a class="inline-flex items-center gap-2 rounded-lg px-3 py-2" href="https://www.shein.com/" target="_blank">
            <img src="/images/Shein.png" alt="Shein" class="h-6" />
          </a>
        </li> -->
        <!-- Add more links as needed -->

        <!-- <li>
          <div class="sm:flex sm:gap-4 cursor-pointer">
            <img v-if="darkMode" @click="toggleDarkMode()" src="/images/contrast.png" class="h-8" alt="" srcset="" />
            <img v-if="!darkMode" @click="toggleDarkMode()" src="/images/night.png" class="h-8" alt="" srcset="" />
          </div>
        </li> -->
      </ul>
    </nav>

    <!-- Search Form -->
    <div class="z-40">
      <SearchForm />
    </div>
  </header>
</template>



<style scoped>
/* Add styles specific for mobile view */
@media (max-width: 768px) {

  /* Hide desktop menu on small screens */
  .lg\\:hidden {
    display: none;
  }

  /* Adjust styles for mobile menu */
  .lg\\:flex {
    display: flex;
  }
}
</style>

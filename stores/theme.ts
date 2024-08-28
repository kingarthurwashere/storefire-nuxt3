import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core'


export const useThemeStore = defineStore('theme', {
    state: () => ({
        darkMode: localStorage.getItem('darkMode') !== undefined ? false : true,
    }),
    actions: {
        toggleDarkMode() {
            this.darkMode = !this.darkMode;
        },
    },
    getters: {
    },
});
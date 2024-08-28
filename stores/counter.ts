import { defineStore } from "pinia"

interface CounterStore {
    count: string;
    name: string;
}

export const useCounterStore = defineStore('counter', {
    state: () => ({ count: 2, name: 'Eduardo' }),
    getters: {
        doubleCount: (state) => state.count * 2,
    },
    actions: {
        increment() {
            this.count++
        },
    },
})
import { defineStore } from "pinia";

interface ModalStore {
    displayModal: boolean
    modalTitle: string
    modalText: string
}

export const useModalStore = defineStore({
    id: 'modal-store',
    state: () => (
        {
            displayModal: false,
            modalTitle: '',
            modalText: '',
        }
    ),
    actions: {
        showModal(title: string, text: string): void {
            this.modalTitle = title;
            this.modalText = text;
            this.displayModal = true;
        },
        closeModal(): void {
            this.displayModal = false;
        },
    },
});
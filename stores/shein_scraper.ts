import { defineStore } from "pinia";
import SheinService from "../services/shein.service";
import { useToast } from "vue-toastification";
import { useSharedStore } from "../stores/shared";

const sheinService = new SheinService();
const toast = useToast();

interface SheinState {

    shein: boolean;
    search: boolean;
    sheinItem: any | null
    dxbUrl: string;
    session: any | null;
    fetchingSession: boolean;
    sessionFound: any | null;
    checkingWoocommerce: boolean;
    agreed: boolean;
    uploadingToWoocommerce: boolean;
}

export const useSheinStore = defineStore('shein', {
    state: (): SheinState => ({
        shein: false,
        search: false,
        sheinItem: null,
        dxbUrl: '',
        session: null,
        fetchingSession: false,
        sessionFound: null,
        checkingWoocommerce: false,
        agreed: false,
        uploadingToWoocommerce: false,
    }),
    actions: {
        async attemptScrap({ url }: { url: string | null }) {
            this.search = true;
            try {
                const resp = await sheinService.search(url);
                if (resp.success && resp.data.item) {
                    this.shein = true;
                    this.sheinItem = resp.data.item;
                    const router = useRouter()
                    router.push({ path: "/" });

                } else {
                    this.shein = false;
                    this.sheinItem = null;
                }
            } catch (error) {
                toast.error('Error while attempting to scrap: ' + error);
            } finally {
                this.search = false;
            }
        },
    }
});

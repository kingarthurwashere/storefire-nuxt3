import { defineStore } from "pinia";
import AliExpressService from "../services/aliexpress.service";
import { useToast } from "vue-toastification";
import { useSharedStore } from "../stores/shared";

const aliExpressService = new AliExpressService();
const toast = useToast();


interface AliExpressState {
    aliexpress: boolean;
    search: boolean;
    aliexpressItem: any | null;
    dxbUrl: string;
    session: any | null;
    fetchingSession: boolean;
    sessionFound: any | null;
    checkingWoocommerce: boolean;
    agreed: boolean;
    uploadingToWoocommerce: boolean;
}

export const useAliExpressStore = defineStore('aliexpress', {
    state: (): AliExpressState => ({
        aliexpress: false,
        search: false,
        aliexpressItem: null,
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
            const sharedStore = useSharedStore();
            const { scrapingError } = storeToRefs(sharedStore);

            this.search = true;
            scrapingError.value = false;

            try {
                const resp = await aliExpressService.search(url);

                if (resp.success && resp.data.item) {
                    this.aliexpress = true;
                    this.aliexpressItem = resp.data.item;
                    const router = useRouter()
                    router.push({ path: "/" });

                } else {
                    this.aliexpress = false;
                    this.aliexpressItem = null;
                }

                if (resp.success === false) {

                    //toast.error(resp.message);
                    toast.error('Sorry, we couldn\'t fetch the item :(');
                    scrapingError.value = true;
                }
            } catch (error) {
                console.log('error', error)
                toast.error('Sorry, something went wrong');
            } finally {
                this.search = false;
            }
        },
        async checkWoocommerce({ session, variantPrice, selectedVariantsShortReadable, selectedVariantsReadable }: any) {
            this.checkingWoocommerce = true;
            try {
                toast.info('Your link will be ready in a moment');
                const resp = await aliExpressService.checkProduct(session.file_id);
                this.checkingWoocommerce = false;

                if (resp.success) {
                    this.dxbUrl = resp.data.item.woocommerce_link;
                } else {
                    console.log('failed', resp)
                    // Upload new product to WooCommerce
                    await this.uploadToWoocommerce({ payload: session, variantPrice, selectedVariantsShortReadable, selectedVariantsReadable });
                }
            } catch (error) {
                toast.error('Something went wrong while checking product availability');
                this.checkingWoocommerce = false;
            }
        },

        async toggleAgree() {
            this.agreed = !this.agreed;
        },
        async uploadToWoocommerce({ payload, variantPrice, selectedVariantsShortReadable, selectedVariantsReadable }: any) {
            this.uploadingToWoocommerce = true;
            try {
                const resp = await aliExpressService.addProduct(payload, 'aliexpress', variantPrice, selectedVariantsShortReadable, selectedVariantsReadable);

                console.log(resp)

                this.uploadingToWoocommerce = false;
                if (resp.success) {
                    this.dxbUrl = resp.data.link;
                } else {
                    toast.error('Something went wrong, please try again later');
                }
            } catch (error) {

                toast.error('Something went wrong while listing item');
                console.error('error', error)
                this.uploadingToWoocommerce = false;
            }
        },
    }
});

import { defineStore } from "pinia";
import AmazonService from "../services/amazon.service";
import { useToast } from "vue-toastification";
import { useSharedStore } from "../stores/shared";

const amazonService = new AmazonService();
const toast = useToast();

interface ScrapperState {
    discovered: any | null;
    search: boolean;
    amazonItem: any | null;
    dxbUrl: string;
    session: any | null;
    fetchingSession: boolean;
    sessionFound: any | null;
    checkingWoocommerce: boolean;
    agreed: boolean;
    uploadingToWoocommerce: boolean;
}

export const useAmazonStore = defineStore('amazon', {
    state: (): ScrapperState => ({
        discovered: null,
        search: false,
        amazonItem: null,
        dxbUrl: '',
        session: null,
        fetchingSession: false,
        sessionFound: null,
        checkingWoocommerce: false,
        agreed: false,
        uploadingToWoocommerce: false,
    }),
    actions: {
        async attemptScrap({ url }: any) {
            const sharedStore = useSharedStore();
            const { scrapingError } = storeToRefs(sharedStore);

            this.search = true;
            scrapingError.value = false;

            url = url.replace('com', 'ae')

            try {
                const resp = await amazonService.search(url);

                if (resp.success && resp.data.item) {
                    if (resp.data.item) {
                        this.discovered = true;
                        this.amazonItem = resp.data.item;
                        const router = useRouter()
                        router.push({ path: "/" });

                    } else {
                        this.discovered = null;
                        this.amazonItem = null;
                    }
                }

                if (resp.success === false) {
                    toast.error('Sorry, we couldn\'t fetch the item :(');
                    scrapingError.value = true;
                }
            } catch (error) {
                toast.error('Error while attempting to scrap: ' + error);
            } finally {
                this.search = false;
            }
        },
        async checkWoocommerce({ session }: any) {
            this.checkingWoocommerce = true;
            try {
                toast.info('Your link will be ready in a moment');
                const resp = await amazonService.checkProduct(session.asin);
                this.checkingWoocommerce = false;

                if (resp.success) {
                    this.dxbUrl = resp.data.item.woocommerce_link;
                } else {
                    // Upload new product to WooCommerce
                    await this.uploadToWoocommerce({ payload: session });
                }
            } catch (error) {

                toast.error('Something went wrong while checking product availability.');
                this.checkingWoocommerce = false;
            }
        },
        async toggleAgree() {
            this.agreed = !this.agreed;
        },
        async uploadToWoocommerce({ payload }: any) {
            this.uploadingToWoocommerce = true;
            try {
                const resp = await amazonService.addProduct(payload, 'amazon_ae');

                this.uploadingToWoocommerce = false;
                if (resp.success) {
                    this.dxbUrl = resp.data.link;
                } else {
                    toast.error('Something went wrong, please try again later');
                }
            } catch (error) {

                toast.error('Something went wrong while uploading the listing!');
                this.uploadingToWoocommerce = false;
            }
        },

        clearDxbUrl() {
            this.dxbUrl = ''
        },
    }

});

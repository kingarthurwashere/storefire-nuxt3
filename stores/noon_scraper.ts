import { defineStore } from "pinia";
import NoonService from "../services/noon.service";
import { useToast } from "vue-toastification";
import { useSharedStore } from "../stores/shared";

const noonService = new NoonService();
const toast = useToast();

interface NoonState {

    noon: boolean;
    search: boolean;
    noonItem: any | null
    dxbUrl: string;
    session: any | null;
    fetchingSession: boolean;
    sessionFound: any | null;
    checkingWoocommerce: boolean;
    agreed: boolean;
    uploadingToWoocommerce: boolean;
}

export const useNoonStore = defineStore('noon', {
    state: (): NoonState => ({

        noon: false,
        search: false,
        noonItem: null,
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
                const resp = await noonService.search(url);

                if (resp.success && resp.data.item) {
                    this.noon = true;
                    this.noonItem = resp.data.item;
                    const router = useRouter()
                    router.push({ path: "/" });

                } else {
                    this.noon = false;
                    this.noonItem = null;
                }

                if (resp.success === false) {
                    toast.error('Sorry, we couldn\'t fetch the item :(');
                    scrapingError.value = true
                }
            } catch (error) {
                toast.error('Error while attempting to scrap: ' + error);
            } finally {
                this.search = false;
            }
        },
        // async checkWoocommerce({ id, session }: any) {

        //     this.checkingWoocommerce = true
        //     toast.info('Your link will be ready in a moment');

        //     const resp = await noonService.checkProduct(session, 'noon')

        //     this.checkingWoocommerce = false

        //     if (resp.success) {

        //         this.dxbUrl = resp.data.link

        //     } else {


        //         this.uploadToWoocommerce({
        //             payload: session
        //         })

        //     }
        // },
        async checkWoocommerce({ session }: any) {
            this.checkingWoocommerce = true;
            try {
                toast.info('Your link will be ready in a moment');
                const resp = await noonService.checkProduct(session.file_id);
                this.checkingWoocommerce = false;

                if (resp.success) {
                    console.log('resp.data.item.woocommerce_link', resp.data.item.woocommerce_link)
                    this.dxbUrl = resp.data.item.woocommerce_link;
                } else {
                    console.log('failed', resp)
                    // Upload new product to WooCommerce
                    await this.uploadToWoocommerce({ payload: session });
                }
            } catch (error) {
                toast.error('Something went wrong while checking product availability');
                this.checkingWoocommerce = false;
            }
        },
        async toggleAgree() {
            this.agreed = !this.agreed
        },
        async uploadToWoocommerce({ payload }: any) {

            this.uploadingToWoocommerce = true

            const resp = await noonService.addProduct(payload, 'noon')

            this.uploadingToWoocommerce = false

            if (resp.success) {

                this.dxbUrl = resp.data.link

            } else {


                toast.error('Something went wrong, plase try again later')

            }


        },

    }
});

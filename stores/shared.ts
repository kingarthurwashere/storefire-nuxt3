import { defineStore } from "pinia";
import AmazonService from "../services/amazon.service";
import { useToast } from "vue-toastification";
import { useAmazonStore } from "../stores/amazon_scraper";
import { useAliExpressStore } from "../stores/aliexpress_scraper";
import { useNoonStore } from "../stores/noon_scraper";
import { useSheinStore } from "../stores/shein_scraper";

const toast = useToast();

interface SharedState {
    urlToCheck: string | null;
    scraping: boolean;
    discoveredItem: any,
    discoveredItemShop: string | null; // "noon", "shein", "aliexpress", "amazon"
    uploadingToWoocommerce: boolean;
    checkingWoocommerce: boolean;
    dxbUrl: string;
    agreed: boolean;
    orderNotes: string;
    scrapingError: boolean;
    showClearButton: boolean;
}

export const useSharedStore = defineStore('shared', {
    state: (): SharedState => ({
        urlToCheck: '',
        scraping: false,
        discoveredItem: null,
        discoveredItemShop: null,
        uploadingToWoocommerce: false,
        checkingWoocommerce: false,
        dxbUrl: "",
        agreed: false,
        orderNotes: "",
        scrapingError: false,
        showClearButton: false,
    }),
    actions: {

        async toggleAgree() {
            this.agreed = !this.agreed;
        },
        async uploadToWoocommerce({ payload, shop }: any) {
            this.uploadingToWoocommerce = true;
            try {
                const amazonService = new AmazonService();
                const resp = await amazonService.addProduct(payload, shop);

                this.uploadingToWoocommerce = false;
                if (resp.success) {
                    this.dxbUrl = resp.data.link;
                } else {
                    toast.error('Something went wrong, please try again later');
                }
            } catch (error) {

                toast.error('Something went wrong while uploading to WooCommerce');
                this.uploadingToWoocommerce = false;
            }
        },
        clearDxbUrl() {
            this.dxbUrl = ''
        },
        reset() {
            this.reset()
        },
        //Search
        // Function to trigger scraping action on Amazon URL
        scrapeAmazon() {
            this.scraping = true;
            const amazonStore = useAmazonStore();
            amazonStore.attemptScrap({ url: this.urlToCheck }).then(() => {
                this.scraping = false;
                this.discoveredItemShop = "amazon";
            });
        },

        // Function to trigger scraping action on AliExpress URL
        scrapeAliExpress() {
            this.scraping = true;
            const aliExpressStore = useAliExpressStore();
            aliExpressStore.attemptScrap({ url: this.urlToCheck }).then(() => {
                this.scraping = false;
                this.discoveredItemShop = "aliexpress";
            });
        },

        // Function to trigger scraping action on Noon URL
        scrapeNoon() {
            this.scraping = true;
            const noonStore = useNoonStore();
            noonStore.attemptScrap({ url: this.urlToCheck }).then(() => {
                this.scraping = false;
                this.discoveredItemShop = "noon";
            });
        },

        // Function to trigger scraping action on shein URL
        scrapeShein() {
            this.scraping = true;
            const sheinStore = useSheinStore();
            sheinStore.attemptScrap({ url: this.urlToCheck }).then(() => {
                this.scraping = false;
                this.discoveredItemShop = "shein";
            });
        },

        checkUrl() {
            if (this.urlToCheck) {
                const parsedUrl = new URL(this.urlToCheck);
                const hostname = parsedUrl.hostname.toLowerCase();

                let platform;
                if (hostname.includes("amazon")) {
                    platform = "amazon";
                } else if (hostname.includes("aliexpress")) {
                    platform = "aliexpress";
                } else if (hostname.includes("noon")) {
                    platform = "noon";
                } else if (hostname.includes("shein")) {
                    platform = "shein";
                } else {
                    platform = "unknown";
                }

                // Use a switch statement to act based on the determined platform
                switch (platform) {
                    case "amazon":
                        this.scrapeAmazon();
                        break;
                    case "aliexpress":
                        this.scrapeAliExpress();
                        break;
                    case "noon":
                        this.scrapeNoon();
                        break;
                    case "shein":
                        this.scrapeShein();
                        break;
                    default:
                        toast.info(
                            "Please enter an allowed link, ie. Amazon, Aliexpress or Noon"
                        );

                        break;
                }

                this.showClearButton = true;
            }
        }
    }

});

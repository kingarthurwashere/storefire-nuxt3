import BaseService from "./base.service";

class NoonService extends BaseService {


    async search(url: any): Promise<any> {
        const requestOptions: RequestInit = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url })
        };
        const response = await fetch(`${this.baseUrl}/api/store/search`, requestOptions);
        return this.handleResponse(response);
    }

    async view(sku: string, source: string): Promise<any> {
        const requestOptions: RequestInit = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        const response = await fetch(`${this.baseUrl}/api/store/${sku}?source=${source}`, requestOptions);
        return this.handleResponse(response);
    }

    async checkProduct(identifier: string): Promise<any> {
        const requestOptions: RequestInit = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identifier, source: 'noon' })
        };

        const response = await fetch(`${this.baseUrl}/api/products/retrieve`, requestOptions);
        const data = await this.handleResponse(response);
        return data;
    }

    async addProduct(payload: any, source: string): Promise<any> {
        const requestBody = {
            url: payload.url,
            asin: payload.asin,
            session: JSON.stringify(payload),
            payload: {
                name: payload.title,
                type: 'simple',
                status: 'publish',
                regular_price: payload.dxb_price,
                catalog_visibility: 'visible',
                stock_quantity: 10,
                description: payload.highlights.replace(/<\/?[^>]+(>|$)/g, ""),
                short_description: payload.highlights.replace(/<\/?[^>]+(>|$)/g, ""),
                categories: [
                    {
                        id: 727,
                        name: "Storeflex Noon",
                        slug: "storeflex-noon"
                    }
                ],
                images: [
                    {
                        src: payload.images[0].replace('avif', 'jpeg'),
                        position: 0,
                        alt: payload.title
                    }
                ],
                meta_data: [
                    {
                        key: 'online_shop',
                        value: 'noon.com' // Provide the actual name or URL here
                    },
                    {
                        key: 'storeflex_link',
                        value: payload.scraped_url // Provide the actual name or URL here
                    },
                    {
                        key: 'additional_order_info',
                        value: '' // Add any other metadata here as needed
                    }
                ]
            }
        };

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        };

        const response = await fetch(`${this.baseUrl}/api/store/upload?source=${source}`, requestOptions);
        const data = await this.handleResponse(response);
        return data;
    }
}

export default NoonService;

import BaseService from "./base.service";

class AmazonService extends BaseService {

    async search(url: string | null): Promise<any> {
        const requestOptions: RequestInit = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url })
        };
        const response = await fetch(`${this.baseUrl}/api/store/search`, requestOptions);
        return this.handleResponse(response);
    }

    async view(asin: string, source: string): Promise<any> {
        const requestOptions: RequestInit = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        const response = await fetch(`${this.baseUrl}/api/store/${asin}?source=${source}`, requestOptions);
        return this.handleResponse(response);
    }

    async checkProduct(identifier: string): Promise<any> {
        const requestOptions: RequestInit = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identifier, source: 'amazon_ae' })
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
                description: payload.description,
                short_description: payload.description,
                categories: [
                    {
                        id: 725,
                        name: "Storeflex Amazon AE",
                        slug: "storeflex-amazon-ae"
                    }
                ],
                images: [
                    {
                        src: payload.images[0],
                        position: 0,
                        alt: payload.title
                    },
                    {
                        src: payload.images[1],
                        position: 1,
                        alt: payload.title
                    },
                    {
                        src: payload.images[2],
                        position: 2,
                        alt: payload.title
                    }
                ],
                meta_data: [
                    {
                        key: 'online_shop',
                        value: 'amazon.ae' // Provide the actual name or URL here
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

export default AmazonService;

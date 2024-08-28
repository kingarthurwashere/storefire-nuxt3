import BaseService from "./base.service";

class AliExpressService extends BaseService {

    async view(identifier: string, source: string): Promise<any> {
        const requestOptions: RequestInit = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        const response = await fetch(`${this.baseUrl}/api/store/${identifier}?source=${source}`, requestOptions);
        return this.handleResponse(response);
    }

    async search(url: string | null): Promise<any> {
        const requestOptions: RequestInit = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url })
        };
        const response = await fetch(`${this.baseUrl}/api/store/search`, requestOptions);
        return this.handleResponse(response);
    }

    async checkProduct(identifier: string): Promise<any> {
        const requestOptions: RequestInit = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identifier, source: 'aliexpress' })
        };

        const response = await fetch(`${this.baseUrl}/api/products/retrieve`, requestOptions);
        const data = await this.handleResponse(response);
        return data;
    }

    async addProduct(payload: any, source: string, variantPrice: any = null, orderNotesTitle: any = null, orderNotesDescription: any = null): Promise<any> {
        const requestBody = {
            url: payload.url,
            file_id: payload.file_id,
            session: JSON.stringify(payload),
            payload: {
                name: payload.title + (orderNotesTitle !== null ? '(' + orderNotesTitle + ')' : ''),
                type: 'simple',
                status: 'publish',
                regular_price: variantPrice !== null ? variantPrice : payload.dxb_price,
                catalog_visibility: 'visible',
                stock_quantity: 10,
                description: payload.description + (orderNotesDescription !== null ? '(' + orderNotesDescription + ')' : ''),
                categories: [
                    {
                        id: 726,
                        name: "Storeflex Aliexpress",
                        slug: "storeflex-aliexpress"
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
                        value: 'aliexpress.com'
                    },
                    {
                        key: 'storeflex_link',
                        value: payload.scraped_url
                    },
                    {
                        key: 'additional_order_info',
                        value: ''
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

export default AliExpressService;

import BaseService from "./base.service";

class SheinService extends BaseService {

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
            body: JSON.stringify({ identifier, source: 'shein' })
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
                description: payload.specifications,
                short_description: payload.measurements,
                categories: [
                    {
                        id: 660,
                        name: "Storeflex",
                        slug: "storeflex"
                    }
                ],
                images: [
                    {
                        src: payload.image[0],
                        position: 0,
                        alt: payload.title
                    },
                    {
                        src: payload.image[1],
                        position: 1,
                        alt: payload.title
                    },
                    {
                        src: payload.image[2],
                        position: 2,
                        alt: payload.title
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
export default SheinService;

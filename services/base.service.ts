class BaseService {
    public baseUrl: string | null;

    constructor() {
        const config = useRuntimeConfig();
        this.baseUrl = config.public.baseURL
    }

    public handleResponse(response: Response): Promise<any> {
        return response.text().then(text => {
            const data = text && JSON.parse(text);
            if (!response.ok) {

                if (response.status === 401) {
                }

                if (response.status === 500) {

                }

                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            return data;
        });
    }
}

export default BaseService;

import axios from "axios";
import Constants from "expo-constants";

const { baseURL } = Constants.expoConfig?.extra as { baseURL: string };

const apiClient = axios.create({
    baseURL: baseURL
});


const createApiFunction = (method: string, url: string) => async (data?: object) => {
    try {
        const response = await apiClient({
            method,
            url: `/${url}`,
            data: method === "post" || method === "put" ? data : undefined,
        })
        return response.data
    } catch(error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data
        }
        return { message: "An unexpected error occured" };
    }
}


export default function bakeryApi() {
    return {
        getListBakery: createApiFunction("post", "get/list/bakery"),
        updateBakeryStatus: createApiFunction("put", "update/bakery/active"),
        deleteBakery: createApiFunction("post", "delete/bakery"),
    }
}
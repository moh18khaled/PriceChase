import apiBaseUrl from "../../../config/axiosConfig"

export const fetchPopularProducts = async ()=>{
    try {
        const response = await apiBaseUrl.get("/products/popular");
        console.log(response.data.products);
        return response.data.products;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const fetchDiscountProducts = async ()=>{
    try {
        const response = await apiBaseUrl.get("/products/discounts");
        console.log(response.data.products);
        return response.data.products;
    } catch (error) {
        console.log(error);
        return [];
    }
}
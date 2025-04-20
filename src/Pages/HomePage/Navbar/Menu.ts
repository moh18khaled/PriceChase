import apiBaseUrl from "../../../config/axiosConfig";
import { IUpMenu } from "./interfaces";
export const upMenu : IUpMenu[] = [
    {
        id:1,
        name : "Categories",
        link : "/categories",
    },
    {
        id:2,
        name : "Popular Products",
        link : "/#",
    },
    {
        id:3,
        name : "Discount Section",
        link : "/#",
    },
]

export const fetchCategories = async ()=>{
    try {
        const response = await apiBaseUrl.get("/categories/");
        console.log(response.data.Categories);
        return response.data.Categories;
    } catch (error) {
        console.log(error);
    }
}
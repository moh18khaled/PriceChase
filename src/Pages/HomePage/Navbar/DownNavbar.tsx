import { useEffect, useState } from 'react';
import { fetchCategories } from './Menu';
import apiBaseUrl from '../../../config/axiosConfig';

const DownNavbar = () => {
    const [allCategories, setAllCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [categoryId, setCategoryId] = useState("");

    // Fetch all categories
    useEffect(() => {
        const getCategories = async () => {
            const data = await fetchCategories();
            console.log(data);
            setAllCategories(data);
        };
        getCategories();
    }, []);

    // Handle category click
    const handleCategoryClick = (id: string) => {
        setCategoryId(id); // Update the categoryId state
    };

    // Fetch subcategories when categoryId changes
    useEffect(() => {
        const fetchSubCategoriesDetails = async () => {
            if (!categoryId) return; // Do not fetch if categoryId is empty

            try {
                const response = await apiBaseUrl.get(`/categories/${categoryId}/subcategories`);
                console.log(response.data.result.SubCategoriesDetails);
                setSubCategories(response.data.result.SubCategoriesDetails);
            } catch (error) {
                console.log(error);
            }
        };

        fetchSubCategoriesDetails();
    }, [categoryId]); // Run this effect whenever categoryId changes

    return (
        <div className="bg-[#F5F5F5] shadow-lg dark:bg-gray-700">
            <div className="container">
                <div className="w-4/5 mx-auto pb-40 grid md:grid-cols-3">
                    {/* Footer Links */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 col-span-5 md:pl-10 ">
                        {/* Render categories */}
                        {allCategories.map(({ _id, CategoryName }) => (
                            <div key={_id}>
                                <div className="py-8 px-4">
                                    <a
                                        href='#'
                                        onClick={(e) => {
                                            e.preventDefault(); // Prevent default link behavior
                                            handleCategoryClick(_id);
                                        }}
                                        className="sm:text-2xl text-xl font-bold sm:text-left text-justify mb-3"
                                    >
                                        {CategoryName}
                                    </a>
                                    <ul>
                                        {subCategories.map(({ _id, SubCategoryName }) => (
                                            <li key={_id} className="py-2 hover:translate-x-1 duration-300">
                                                <a className="hover:text-customBlue transition duration-200" href="#">
                                                    {SubCategoryName}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DownNavbar;
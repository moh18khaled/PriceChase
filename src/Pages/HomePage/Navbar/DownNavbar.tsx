import { useEffect, useState } from 'react';
import { fetchCategories } from './Menu';
import apiBaseUrl from '../../../config/axiosConfig';
import { Link } from 'react-router-dom';

interface SubCategory {
    _id: string;
    SubCategoryName: string;
}

interface CategorySubcategories {
    [categoryId: string]: SubCategory[];
}

const DownNavbar = () => {
    const [allCategories, setAllCategories] = useState([]);
    const [categorySubcategories, setCategorySubcategories] = useState<CategorySubcategories>({});
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Fetch all categories
    useEffect(() => {
        const getCategories = async () => {
            const data = await fetchCategories();
            setAllCategories(data);
        };
        getCategories();
    }, []);

    // Handle category click
    const handleCategoryClick = async (id: string) => {
        // Toggle category expansion
        setExpandedCategory(expandedCategory === id ? null : id);
        
        // Fetch subcategories if not already fetched
        if (!categorySubcategories[id]) {
            try {
                const response = await apiBaseUrl.get(`/categories/${id}/subcategories`);
                setCategorySubcategories(prev => ({
                    ...prev,
                    [id]: response.data.result.SubCategoriesDetails
                }));
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <nav className="bg-[#F5F5F5] shadow-lg dark:bg-gray-700 dark:text-white relative">
            {/* Mobile menu button */}
            <div className="md:hidden flex justify-end p-4">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="text-gray- dark:text-white hover:text-gray-900 focus:outline-none"
                >
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        {isMobileMenuOpen ? (
                            <path d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Categories container */}
            <div className={`container mx-auto ${isMobileMenuOpen ? 'block' : 'hidden'} md:block`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
                        {allCategories.map(({ _id, CategoryName }) => (
                            <div key={_id} className="relative">
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleCategoryClick(_id);
                                    }}
                                    className="w-full text-left px-4 py-2 text-lg font-semibold text-gray-700 dark:text-white hover:text-customBlue 
                                             transition duration-200 flex justify-between items-center"
                                >
                                    <span>{CategoryName}</span>
                                    <svg
                                        className={`w-4 h-4 transform transition-transform ${
                                            expandedCategory === _id ? 'rotate-180' : ''
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                
                                {/* Subcategories dropdown */}
                                {expandedCategory === _id && categorySubcategories[_id] && (
                                    <div className="mt-2 pl-4 space-y-2 bg-gradient-to-b from-gray-50 to-gray-100 
                                                   dark:from-gray-700 dark:to-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600">
                                        {categorySubcategories[_id].map(({ _id: subId, SubCategoryName }) => (
                                            <Link
                                                key={subId}
                                                to = {`/categories/${_id}`}
                                                className="block px-4 py-2 text-sm text-gray-600 dark:text-white hover:text-customBlue 
                                                         hover:bg-white dark:hover:bg-gray-600 
                                                         transition duration-200 rounded"
                                            >
                                                {SubCategoryName}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default DownNavbar;
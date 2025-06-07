import { FaStar, FaChevronLeft, FaChevronRight, FaEye } from "react-icons/fa";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiBaseUrl from "../../config/axiosConfig";
import { motion } from "framer-motion";
import { FunnelIcon, ArrowsUpDownIcon, TagIcon } from "@heroicons/react/24/outline";

interface SubCategory {
  _id: string;
  SubCategoryName: string;
}

interface FilterOptions {
  rating?: number;
  minPrice?: number;
  maxPrice?: number;
  popular?: boolean;
}

const MenShirts = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [nextCursor, setNextCursor] = useState("");
  const [cursorHistory, setCursorHistory] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [sort, setSort] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [isLoadingSubcategories, setIsLoadingSubcategories] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({});
  const [showFilters, setShowFilters] = useState(false);

  // Fetch Subcategories
  const fetchSubcategories = async () => {
    try {
      setIsLoadingSubcategories(true);
      const response = await apiBaseUrl.get(`/categories/${id}/subcategories`);
      setSubcategories(response.data.result.SubCategoriesDetails);
    } catch (error) {
      console.log("Error fetching subcategories:", error);
    } finally {
      setIsLoadingSubcategories(false);
    }
  };

  // Build query string from filter options
  const buildFilterQuery = () => {
    const filters = [];
    if (filterOptions.rating !== undefined) {
      filters.push(`rating=${filterOptions.rating}`);
    }
    if (filterOptions.minPrice !== undefined) {
      filters.push(`minPrice=${filterOptions.minPrice}`);
    }
    if (filterOptions.maxPrice !== undefined) {
      filters.push(`maxPrice=${filterOptions.maxPrice}`);
    }
    if (filterOptions.popular !== undefined) {
      filters.push(`popular=${filterOptions.popular}`);
    }
    return filters.join('&');
  };

  // Fetch Products
  const fetchProducts = async (cursor = "", isGoingBack = false) => {
    try {
      setIsLoading(true);
      let url = selectedSubcategory
        ? `/subcategories/${selectedSubcategory}/products?limit=12`
        : `/categories/${id}/products?limit=12`;
      
      if (cursor) url += `&cursor=${cursor}`;
      
      const filterQuery = buildFilterQuery();
      if (filterQuery) url += `&${filterQuery}`;
      
      if (sort) url += `&${sort}`;
      
      const response = await apiBaseUrl.get(url);
      setProducts(response.data.products);
      setNextCursor(response.data.nextCursor || "");

      if (!isGoingBack && cursor) {
        setCursorHistory(prev => [...prev, cursor]);
      }
    } catch (error) {
      console.log("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle filter change
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFilterOptions(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value !== '' ? Number(value) : undefined
    }));
  };

  // Toggle popular filter
  const togglePopularFilter = () => {
    setFilterOptions(prev => ({
      ...prev,
      popular: !prev.popular
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilterOptions({});
    setSelectedSubcategory("");
    setSort("");
    setShowFilters(false);
  };

  // Apply filters
  // const applyFilters = () => {
  //   setCursorHistory([]);
  //   setCurrentPage(1);
  //   fetchProducts();
  //   setShowFilters(false);
  // };

  // Handle subcategory change
  const handleSubcategoryChange = (subcategoryId: string) => {
    setSelectedSubcategory(subcategoryId);
    setCursorHistory([]);
    setCurrentPage(1);
  };

  // Handle clear subcategory filter
  const clearSubcategoryFilter = () => {
    setSelectedSubcategory("");
    setCursorHistory([]);
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchSubcategories();
    setSelectedSubcategory("");
  }, [id]);

  useEffect(() => {
    setCursorHistory([]);
    setCurrentPage(1);
    fetchProducts();
  }, [id, sort, selectedSubcategory, filterOptions]);

  const handleNextPage = () => {
    if (nextCursor) {
      fetchProducts(nextCursor);
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (cursorHistory.length > 0) {
      const prevCursors = [...cursorHistory];
      prevCursors.pop();
      const prevCursor = prevCursors.pop() || "";
      
      fetchProducts(prevCursor, true);
      setCursorHistory(prevCursors);
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleProductClick = (id: string) => {
    navigate(`/productPage/${id}`);
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 mt-16">
      {/* Enhanced Filter & Sort Menu */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Enhanced Subcategory Filter */}
          <div className="relative">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <TagIcon className="w-5 h-5" />
              Subcategories
            </label>
            <div className="relative group">
              <select
                onChange={(e) => handleSubcategoryChange(e.target.value)}
                value={selectedSubcategory}
                className="w-full appearance-none bg-gray-50 dark:bg-gray-700 border border-gray-200 
                         dark:border-gray-600 text-gray-700 dark:text-gray-200 py-3 px-4 pr-10 
                         rounded-xl leading-tight focus:outline-none focus:ring-2 focus:ring-customBlue/20 
                         focus:border-customBlue transition-all duration-300"
                disabled={isLoadingSubcategories}
              >
                <option value="">All Subcategories</option>
                {subcategories.map((sub:SubCategory) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.SubCategoryName}
                  </option>
                ))}
              </select>
              {selectedSubcategory && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={clearSubcategoryFilter}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full
                           hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                  title="Clear subcategory filter"
                >
                  <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              )}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400
                           group-hover:text-customBlue transition-colors duration-200">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Enhanced Filter Button */}
          <div className="relative">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FunnelIcon className="w-5 h-5" />
              Filters
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 
                         dark:border-gray-600 text-gray-700 dark:text-gray-200 py-3 px-4 
                         rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
              {(filterOptions.rating || filterOptions.minPrice || filterOptions.maxPrice || filterOptions.popular) && (
                <button
                  onClick={clearFilters}
                  className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 py-3 px-4 
                           rounded-xl hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>

          {/* Enhanced Sort Options */}
          <div className="relative">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <ArrowsUpDownIcon className="w-5 h-5" />
              Sort By
            </label>
            <div className="relative group">
              <select
                onChange={(e) => setSort(e.target.value)}
                value={sort}
                className="w-full appearance-none bg-gray-50 dark:bg-gray-700 border border-gray-200 
                         dark:border-gray-600 text-gray-700 dark:text-gray-200 py-3 px-4 pr-10 
                         rounded-xl leading-tight focus:outline-none focus:ring-2 focus:ring-customBlue/20 
                         focus:border-customBlue transition-all duration-300"
              >
                <option value="">Select Sorting</option>
                <option value="sortBy=popular&order=desc">🔥 Most Popular</option>
                <option value="sortBy=rating&order=desc">⭐ Highest Rated</option>
                <option value="sortBy=price&order=asc">💰 Price: Low to High</option>
                <option value="sortBy=price&order=desc">💰 Price: High to Low</option>
                <option value="sortBy=views&order=desc">👁️ Most Viewed</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400
                           group-hover:text-customBlue transition-colors duration-200">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 bg-gray-50 dark:bg-gray-700 rounded-xl p-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Popular Items Filter */}
              <div>
                <label className="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="popular"
                    checked={filterOptions.popular || false}
                    onChange={togglePopularFilter}
                    className="w-5 h-5 text-customBlue rounded focus:ring-customBlue/50"
                  />
                  🔥 Popular Items
                </label>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Minimum Rating
                </label>
                <select
                  name="rating"
                  value={filterOptions.rating || ''}
                  onChange={handleFilterChange}
                  className="w-full bg-white dark:bg-gray-600 border border-gray-200 
                           dark:border-gray-500 text-gray-700 dark:text-gray-200 py-2 px-3 
                           rounded-lg focus:outline-none focus:ring-2 focus:ring-customBlue/20 
                           focus:border-customBlue transition-all duration-300"
                >
                  <option value="">Any Rating</option>
                  <option value="4">⭐ 4+ Stars</option>
                  <option value="3">⭐ 3+ Stars</option>
                  <option value="2">⭐ 2+ Stars</option>
                  <option value="1">⭐ 1+ Stars</option>
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Price Range ($)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    name="minPrice"
                    placeholder="Min"
                    value={filterOptions.minPrice || ''}
                    onChange={handleFilterChange}
                    className="w-full bg-white dark:bg-gray-600 border border-gray-200 
                             dark:border-gray-500 text-gray-700 dark:text-gray-200 py-2 px-3 
                             rounded-lg focus:outline-none focus:ring-2 focus:ring-customBlue/20 
                             focus:border-customBlue transition-all duration-300"
                    min="0"
                  />
                  <input
                    type="number"
                    name="maxPrice"
                    placeholder="Max"
                    value={filterOptions.maxPrice || ''}
                    onChange={handleFilterChange}
                    className="w-full bg-white dark:bg-gray-600 border border-gray-200 
                             dark:border-gray-500 text-gray-700 dark:text-gray-200 py-2 px-3 
                             rounded-lg focus:outline-none focus:ring-2 focus:ring-customBlue/20 
                             focus:border-customBlue transition-all duration-300"
                    min="0"
                  />
                </div>
              </div>

              {/* Apply Filters Button */}
              {/* <div className="flex items-end md:col-span-2 lg:col-span-1">
                <button
                  onClick={applyFilters}
                  className="w-full bg-customBlue text-white py-3 px-4 rounded-xl 
                           hover:bg-blue-600 transition-colors duration-200"
                >
                  Apply Filters
                </button>
              </div> */}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-customBlue"></div>
        </div>
      ) : (
        <>
          {/* Active Filters Display */}
          {(filterOptions.rating || filterOptions.minPrice || filterOptions.maxPrice || filterOptions.popular) && (
            <div className="mb-6 flex flex-wrap gap-2">
              {filterOptions.popular && (
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                  🔥 Popular
                  <button 
                    onClick={() => setFilterOptions(prev => ({ ...prev, popular: undefined }))}
                    className="ml-1 text-blue-800 hover:text-blue-900"
                  >
                    ×
                  </button>
                </span>
              )}
              {filterOptions.rating && (
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                  ⭐ {filterOptions.rating}+ Rating
                  <button 
                    onClick={() => setFilterOptions(prev => ({ ...prev, rating: undefined }))}
                    className="ml-1 text-yellow-800 hover:text-yellow-900"
                  >
                    ×
                  </button>
                </span>
              )}
              {(filterOptions.minPrice || filterOptions.maxPrice) && (
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                  💰 {filterOptions.minPrice ? `$${filterOptions.minPrice}` : '$0'} - {filterOptions.maxPrice ? `$${filterOptions.maxPrice}` : '∞'}
                  <button 
                    onClick={() => setFilterOptions(prev => ({ ...prev, minPrice: undefined, maxPrice: undefined }))}
                    className="ml-1 text-green-800 hover:text-green-900"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(({ _id, Image, Title, Price, AverageRating, Currency, Views }) => (
              <div key={_id}>
                <div onClick={()=>handleProductClick(_id)} className="cursor-pointer bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 h-full overflow-hidden group">
                  <div className="relative h-48 sm:h-56 w-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent group-hover:from-black/10 transition-all duration-300" />
                    <img 
                      src={Image} 
                      alt={Title} 
                      className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300" 
                    />
                    <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded-full flex items-center text-xs">
                      <FaEye className="mr-1" />
                      {Views || 0} views
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <h3 className="text-md sm:text-lg font-semibold text-gray-800 dark:text-white line-clamp-2 group-hover:text-customBlue transition-colors duration-200">
                      {Title}
                    </h3>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, index) => (
                        <FaStar 
                          key={index} 
                          className={`${index < AverageRating ? 'text-yellow-400' : 'text-gray-300'} w-4 h-4`} 
                        />
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xl font-bold text-customBlue dark:text-customBlue">
                        {Currency} {Price}$
                      </p>
                      <button className="px-4 py-2 bg-customBlue text-white rounded-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button 
              onClick={handlePrevPage} 
              disabled={cursorHistory.length === 0}
              className={`px-4 py-2 rounded-lg ${cursorHistory.length > 0 ? "bg-customBlue text-white hover:bg-blue-600 cursor-pointer" : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"} transition-colors duration-200`}
            >
              Previous
            </button>
            
            <span className="text-gray-700 dark:text-gray-300">
              Page {currentPage}
            </span>
            
            <button 
              onClick={handleNextPage} 
              disabled={!nextCursor}
              className={`px-4 py-2 rounded-lg ${nextCursor ? "bg-customBlue text-white hover:bg-blue-600 cursor-pointer" : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"} transition-colors duration-200`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MenShirts;
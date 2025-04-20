import { FaStar, FaChevronLeft, FaChevronRight, FaEye } from "react-icons/fa";
import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiBaseUrl from "../../config/axiosConfig";

const MenShirts = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [nextCursor, setNextCursor] = useState("");
  const [cursorHistory, setCursorHistory] = useState<string[]>([]); // Track cursor history
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  
  // Fetch Products
  const fetchProducts = async (cursor = "", isGoingBack = false) => {
    try {
      setIsLoading(true);
      let url = `/categories/${id}/products?limit=12`;
      if (cursor) url += `&cursor=${cursor}`;
      if (filter) url += `&${filter}`;
      if (sort) url += `&${sort}`;
      
      const response = await apiBaseUrl.get(url);
      setProducts(response.data.products);
      setNextCursor(response.data.nextCursor || "");

      // Update cursor history if moving forward
      if (!isGoingBack && cursor) {
        setCursorHistory(prev => [...prev, cursor]);
      }

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setCursorHistory([]); // Reset history when filters/sort change
    setCurrentPage(1);
    fetchProducts();
  }, [id, filter, sort]);

  const handleNextPage = () => {
    if (nextCursor) {
      fetchProducts(nextCursor);
      setCurrentPage(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevPage = () => {
    if (cursorHistory.length > 0) {
      // Get the previous cursor from history (second last item)
      const prevCursors = [...cursorHistory];
      prevCursors.pop(); // Remove current cursor
      const prevCursor = prevCursors.pop() || ""; // Get previous cursor
      
      fetchProducts(prevCursor, true);
      setCursorHistory(prevCursors);
      setCurrentPage(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 mt-16">
      {/* Filter & Sort Menu */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded-lg dark:text-white dark:bg-gray-700"
        >
          <option value="">Filter By</option>
          <option value="popular=true">Popular</option>
          <option value="rating=4">Rating (4+)</option>
          <option value="minPrice=150&maxPrice=200">Price (150-200)</option>
        </select>

        <select
          onChange={(e) => setSort(e.target.value)}
          className="p-2 border rounded-lg dark:text-white dark:bg-gray-700"
        >
          <option value="">Sort By</option>
          <option value="sortBy=popular&order=desc">Popularity</option>
          <option value="sortBy=rating&order=desc">Rating</option>
          <option value="sortBy=price&order=asc">Price (Low to High)</option>
          <option value="sortBy=views&order=desc">Most Viewed</option>
        </select>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-customBlue"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(({ _id, Image, Title, Price, AverageRating, Currency, Views }) => (
            <NavLink to={`/productPage/${_id}`}>
            <div key={_id} className="cursor-pointer bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 h-full overflow-hidden group">
              <div className="relative h-48 sm:h-56 w-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent group-hover:from-black/10 transition-all duration-300" />
                <img src={Image} alt={Title} className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300" />
                {/* Views Badge */}
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
                    <FaStar key={index} className={`${index < AverageRating ? 'text-yellow-400' : 'text-gray-300'} w-4 h-4`} />
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
            </NavLink>
          ))}
        </div>
      )}
      
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
    </div>
  );
};

export default MenShirts;
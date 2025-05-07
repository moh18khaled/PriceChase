import { FaTrash, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import apiBaseUrl from '../config/axiosConfig';
import Swal from 'sweetalert2';

interface Product {
  _id: string;
  Image?: string;
  Title: string;
  hidden?: boolean;
}

const ManageProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [nextCursor, setNextCursor] = useState("");
  const [cursorHistory, setCursorHistory] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Initial fetch on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch Products
  const fetchProducts = async (cursor = "", isGoingBack = false) => {
    try {
      setIsLoading(true);
      let url = `/products?limit=5`;
      if (cursor) url += `&cursor=${cursor}`;
      
      const response = await apiBaseUrl.get(url);
      console.log('API Response:', response.data);
      
      if (response.data?.products) {
        setProducts(response.data.products);
        setNextCursor(response.data.nextCursor || "");

        // Only add to history if moving forward
        if (!isGoingBack && cursor) {
          setCursorHistory(prev => [...prev, cursor]);
        }
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      Swal.fire({
        title: 'Error loading products',
        text: 'Failed to fetch product data',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextPage = () => {
    if (nextCursor) {
      fetchProducts(nextCursor);
      setCurrentPage(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevPage = () => {
    if (cursorHistory.length > 0) {
      // Get the previous cursor (last item in history)
      const prevCursor = cursorHistory[cursorHistory.length - 1];
      
      // Remove the last cursor from history (since we're going back)
      const newHistory = cursorHistory.slice(0, -1);
      
      fetchProducts(prevCursor, true);
      setCursorHistory(newHistory);
      setCurrentPage(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };


  const handleVisibility = async (id: string) => {
    try {
      const response = await apiBaseUrl.patch(`/admin/hide/${id}`);
      Swal.fire({
        title: response.data.message,
        icon: "success",
        timer: 2000,
        showConfirmButton: false
      });
      fetchProducts(); // Refresh the list
    } catch (error) {
      console.error('Error toggling visibility:', error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to update product visibility',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
        Manage Products
      </h2>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-customBlue"></div>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700 font-semibold">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="h-12 w-12 sm:h-16 sm:w-16">
                      <img 
                        src={product.Image || '/default-product.png'} 
                        alt={product.Title}
                        className="h-full w-full object-cover rounded-lg"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/default-product.png';
                        }}
                      />
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {product.Title}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleVisibility(product._id)}
                        className={`p-2 rounded-full transition-colors duration-200 ${
                          product.hidden 
                            ? "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            : "text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        }`}
                        title={product.hidden ? "Show Product" : "Hide Product"}
                      >
                        {product.hidden ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                      </button>
                      
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="flex justify-between items-center p-4">
            <button 
              onClick={handlePrevPage} 
              disabled={cursorHistory.length === 0}
              className={`px-4 py-2 rounded-lg ${
                cursorHistory.length > 0 
                  ? "bg-customBlue text-white hover:bg-blue-600 cursor-pointer" 
                  : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
              } transition-colors duration-200`}
            >
              Previous
            </button>
            
            <span className="text-gray-700 dark:text-gray-300">
              Page {currentPage}
            </span>
            
            <button 
              onClick={handleNextPage} 
              disabled={!nextCursor}
              className={`px-4 py-2 rounded-lg ${
                nextCursor 
                  ? "bg-customBlue text-white hover:bg-blue-600 cursor-pointer" 
                  : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
              } transition-colors duration-200`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
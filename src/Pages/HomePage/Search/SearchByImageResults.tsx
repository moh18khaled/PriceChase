import React from 'react'
import { useEffect, useState } from "react";
import apiBaseUrl from "../../../config/axiosConfig";
import { FaEye, FaSpinner, FaStar, FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type Product = {
  _id: string;
  Image: string;
  Title: string;
  Price: number;
  AverageRating: number;
  Currency: string;
  Views: number;
};

type ApiResponse = {
  products?: Product[];
  error?: string;
};

type SearchByImageResultsProps = {
  imageQuery: File | null;
};

const SearchByImageResults: React.FC<SearchByImageResultsProps> = ({ imageQuery }) => {
  const navigate = useNavigate();
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!imageQuery) {
      setResults([]);
      setError(null);
      return;
    }

    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('image', imageQuery);

        const response = await apiBaseUrl.get<ApiResponse>(`/products/search-by-image?query=${formData}`);
        
        
        if (response.data.error) {
          setError(response.data.error);
          setResults([]);
        } else if (response.data.products && response.data.products.length === 0) {
          setError("No products found matching your image.");
          setResults([]);
        } else {
          setResults(response.data.products || []);
        }
      } catch (error) {
        console.error(error);
        setError("An error occurred while searching. Please try again.");
        setResults([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSearchResults();
  }, [imageQuery]);

  const handleProductClick = (id: string) => {
    navigate(`/productPage/${id}`);
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-20">
        <FaSpinner className="animate-spin text-4xl text-customBlue" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20 px-4 text-center">
        <FaExclamationTriangle className="text-4xl text-yellow-500 mb-4" />
        <p className="text-gray-600 dark:text-gray-400 max-w-md">{error}</p>
      </div>
    );
  }

  if (results.length === 0 && !imageQuery) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20 px-4 text-center">
        <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-2">
          Upload an Image
        </h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md">
          Upload an image to find similar products
        </p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {results.map(({ _id, Image, Title, Price, AverageRating, Currency, Views }) => (
        <div
          key={_id}
          onClick={() => handleProductClick(_id)}
          className="cursor-pointer bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl 
                   transform hover:-translate-y-1 transition-all duration-300 h-full overflow-hidden group"
        >
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
      ))}
    </div>
  );
};

export default SearchByImageResults;

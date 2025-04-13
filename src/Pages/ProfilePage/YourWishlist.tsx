import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import apiBaseUrl from "../../config/axiosConfig";
import { FaTimes, FaHeart } from "react-icons/fa";

interface WishlistItem {
  _id: string;
  addedDate: string;
  productID: {
    Image: string;
    Price: number;
    Title: string;
    _id: string;
  };
}

const YourWishlist = () => {
  const navigate = useNavigate();
  const [wishlistProducts, setWishlistProducts] = useState<WishlistItem[]>([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await apiBaseUrl.get("/wishlist", { withCredentials: true });
        setWishlistProducts(response.data);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };
    fetchWishlist();
  }, []);

  const handleProductClick = (id: string) => {
    navigate(`/productPage/${id}`);
  };

  const handleRemoveFromWishlist = async (wishlistItemId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the product click
    try {
     const res = await apiBaseUrl.delete(`/wishlist/${wishlistItemId}`, { withCredentials: true });
     console.log(res);
      setWishlistProducts(wishlistProducts.filter(item => item._id !== wishlistItemId));
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  return (
    <div className="dark:bg-gray-600 dark:text-white">
      <h1 className="text-center text-2xl lg:text-4xl font-bold py-12">Your Wishlist</h1>
      {wishlistProducts.length === 0 ? (
        <div className="text-center py-20">
          <FaHeart className="mx-auto text-5xl text-gray-400 mb-4" />
          <p className="text-xl">Your wishlist is empty</p>
          <button 
            onClick={() => navigate('/')}
            className="mt-4 px-6 py-2 bg-customBlue text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
          <Swiper
            modules={[Pagination, Navigation]}
            pagination={{ clickable: true }}
            navigation
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 10 },
              640: { slidesPerView: 2, spaceBetween: 15 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 25 },
              1280: { slidesPerView: 4, spaceBetween: 30 },
            }}
            className="w-full"
          >
            {wishlistProducts.map(({ _id, productID }) => (
              <SwiperSlide key={_id}>
                <div
                  onClick={() => handleProductClick(productID._id)}
                  className="cursor-pointer bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl 
                           transform hover:-translate-y-1 transition-all duration-300 h-full mx-2 my-4 
                           overflow-hidden group relative"
                >
                  {/* Remove from wishlist button */}
                  <button
                    onClick={(e) => handleRemoveFromWishlist(productID._id, e)}
                    className="absolute top-3 right-3 z-10 p-2 bg-white/80 dark:bg-gray-700/80 rounded-full 
                             hover:bg-red-500 hover:text-white transition-colors duration-200 shadow-md"
                    aria-label="Remove from wishlist"
                  >
                    <FaTimes className="w-4 h-4" />
                  </button>

                  {/* Image Container */}
                  <div className="relative h-48 sm:h-56 w-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent group-hover:from-black/10 transition-all duration-300" />
                    <img
                      src={productID.Image}
                      alt={productID.Title}
                      className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Content Container */}
                  <div className="p-4 space-y-3">
                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white 
                                 line-clamp-2 group-hover:text-customBlue transition-colors duration-200">
                      {productID.Title}
                    </h3>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <p className="text-xl font-bold text-customBlue dark:text-customBlue">
                        ${productID.Price}
                      </p>
                      <button
                        className="px-4 py-2 bg-customBlue text-white rounded-lg 
                                 opacity-0 group-hover:opacity-100 transform translate-y-2 
                                 group-hover:translate-y-0 transition-all duration-300"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default YourWishlist;
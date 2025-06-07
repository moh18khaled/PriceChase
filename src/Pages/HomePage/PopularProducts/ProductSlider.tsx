import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { FaStar, FaSpinner, FaEye } from 'react-icons/fa'; // Added FaEye
import { Pagination, Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { fetchPopularProducts } from './data';
import { useNavigate } from 'react-router-dom';

const ProductSlider = () => {
  const navigate = useNavigate();
  const [popularProducts, setPopularProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [emptyPopular,setEmptyPopular] = useState("");

  useEffect(() => {
    const getPopularProducts = async () => {
      setIsLoading(true);
      try {
        const data = await fetchPopularProducts();
        setPopularProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    getPopularProducts();
  }, []);

  const handleProductClick = (id: string) => {
    navigate(`/productPage/${id}`);
  };

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center py-20">
        <FaSpinner className="animate-spin text-4xl text-customBlue" />
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
      <Swiper
        modules={[Pagination, Navigation]}
        pagination={{ 
          clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 4,
        }}
        navigation
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 15 }, // Increased space
          640: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 25 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
          1280: { slidesPerView: 4, spaceBetween: 35 },
        }}
        className="w-full !pb-12" // Added padding for pagination space
      >
        {popularProducts.map(({ _id, Image, Title, Price, AverageRating, Currency, Views }) => (
          <SwiperSlide key={_id}>
            <div
              onClick={() => handleProductClick(_id)}
              className="cursor-pointer bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl 
                       transform hover:-translate-y-1 transition-all duration-300 h-full mx-2 my-4 
                       overflow-hidden group relative" // Added relative
            >
              {/* Views Counter */}
              <div className="absolute top-4 right-4 z-10 bg-black/40 text-white px-2 py-1 rounded-full flex items-center gap-1 text-xs">
                <FaEye className="text-sm" />
                <span>{Views || 0}</span>
              </div>

              {/* Image Container */}
              <div className="relative h-48 sm:h-56 w-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent group-hover:from-black/10 transition-all duration-300" />
                <img
                  src={Image}
                  alt={Title}
                  className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Content Container */}
              <div className="p-4 space-y-3">
                {/* Title */}
                <h3 className="text-md sm:text-lg font-semibold text-gray-800 dark:text-white 
                             line-clamp-2 group-hover:text-customBlue transition-colors duration-200">
                  {Title}
                </h3>

                {/* Rating and Views (mobile) */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1 text-sm">
                    {[...Array(5)].map((_, index) => (
                      <FaStar
                        key={index}
                        className={`${
                          index < AverageRating
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        } w-4 h-4`}
                      />
                    ))}
                  </div>
                  {/* Views counter for mobile */}
                  <div className="sm:hidden flex items-center gap-1 text-gray-500 dark:text-gray-400 text-xs">
                    <FaEye className="text-sm" />
                    <span>{Views || 0}</span>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <p className="text-xl font-bold text-customBlue dark:text-customBlue">
                    {Currency} {Price}$
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
  );
};

export default ProductSlider;
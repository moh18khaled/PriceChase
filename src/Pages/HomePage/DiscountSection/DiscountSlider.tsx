import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { FaStar, FaSpinner } from 'react-icons/fa'; // Added FaSpinner
import { MdLocalOffer } from 'react-icons/md';
import { Pagination, Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { fetchDiscountProducts } from '../PopularProducts/data';
import { useNavigate } from 'react-router-dom';

const DiscountSlider = () => {
  const navigate = useNavigate();
  const [discountProducts, setDiscountProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  useEffect(() => {
    const getDiscountProducts = async () => {
      setIsLoading(true); // Set loading to true when fetch starts
      try {
        const data = await fetchDiscountProducts();
        setDiscountProducts(data);
      } catch (error) {
        console.error('Error fetching discount products:', error);
      } finally {
        setIsLoading(false); // Set loading to false when fetch completes
      }
    };
    getDiscountProducts();
  }, []);

  const handleProductClick = (id: string) => {
    navigate(`/productPage/${id}`);
  };

  // Show spinner while loading
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
        {discountProducts.map(({ _id, Image, Title, Price, AverageRating }) => (
          <SwiperSlide key={_id}>
            <div
              onClick={() => handleProductClick(_id)}
              className="cursor-pointer bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl 
                       transform hover:-translate-y-1 transition-all duration-300 h-full mx-2 my-4 
                       overflow-hidden group relative"
            >
              {/* Discount Badge */}
              <div className="absolute top-4 left-4 z-10">
                <div className="bg-red-500 text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm font-semibold">
                  <MdLocalOffer className="text-lg" />
                  <span>30% OFF</span>
                </div>
              </div>

              {/* Image Container */}
              <div className="relative h-48 sm:h-56 w-full bg-gray-50 dark:bg-gray-700 overflow-hidden">
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
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white 
                             line-clamp-2 group-hover:text-customBlue transition-colors duration-200">
                  {Title}
                </h3>

                {/* Rating */}
                <div className="flex flex-col sm:flex-row items-center gap-2 text-sm">
                  <div className="flex items-center gap-1">
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
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-lg font-bold text-red-500 dark:text-red-400">
                      {Price}$
                    </p>
                  </div>
                  <button
                    className="px-4 py-2 bg-customBlue text-white rounded-lg 
                             opacity-0 group-hover:opacity-100 transform translate-y-2 
                             group-hover:translate-y-0 transition-all duration-300"
                  >
                    View Deal
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

export default DiscountSlider;
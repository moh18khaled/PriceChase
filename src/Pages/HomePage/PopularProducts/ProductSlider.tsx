import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { FaStar } from 'react-icons/fa';
import { fetchPopularProducts } from './data';
import { Pagination } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const ProductSlider = () => {
  const navigate = useNavigate();

  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    const getPopularProducts = async () => {
      const data = await fetchPopularProducts();
      console.log(data);
      setPopularProducts(data);
    };
    getPopularProducts();
  }, []);
  const handleProductClick = (id:string)=>{
    navigate(`/productPage/${id}`);
  }
  return (
    <div>
      <Swiper
        slidesPerView={3}
        spaceBetween={20}
        modules={[Pagination]}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 10 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
        }}
        className="mySwiper"
      >
        <div className="grid grid-cols-1 sm:grid-col-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-20 md:gap-5 place-items-center mx-auto">
          {popularProducts.map(({ _id, Image, Title, Price, AverageRating }) => (
            <SwiperSlide
              key={_id}
              className="rounded-2xl bg-[#D6D6D6] dark:bg-gray-800 hover:bg-black/80 dark:hover:bg-customBlue hover:text-white relative shadow-xl duration group max-w-[300px]"
              onClick={()=>handleProductClick(_id)}
            >
              {/* image section */}
              <div className="h-[180px]">
                <img
                  src={Image}
                  alt=""
                  className="max-w-[140px] block mx-auto transform group-hover:scale-105 duration-300 drop-shadow-md"
                />
              </div>
              {/* details section */}
              <div className="p-4 text-center">
                <h1 className="text-3xl font-bold">{Title}</h1>
                {/* stars rating */}
                <div className="sm:flex items-center gap-2">
                  <div className="flex items-center gap-2 justify-center">
                    {[...Array(5)].map((_, index) => (
                      <FaStar
                        key={index}
                        className={
                          index < AverageRating
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }
                      />
                    ))}
                  </div>
                  <p>(50 Reviews)</p>
                </div>
                <p className="text-xl font-bold">{Price}</p>
              </div>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
};

export default ProductSlider;
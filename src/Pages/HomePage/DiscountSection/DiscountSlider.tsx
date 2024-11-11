import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { FaStar } from 'react-icons/fa';
import { Pagination } from 'swiper/modules';
import { discountProductsData } from '../PopularProducts/data';


const DiscountSlider = () => {
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
      <div className="grid grid-cols-1 sm:grid-col-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
        gap-20 md:gap-5 place-items-center mx-auto
        ">
            {discountProductsData.map(({id,image,title,price,reviewsNumber,discount})=>(
                <SwiperSlide key={id} className="rounded-2xl bg-[#D6D6D6] dark:bg-gray-800 hover:bg-black/80 dark:hover:bg-customBlue
                hover:text-white relative shadow-xl duration group max-w-[300px] 
                ">
                 {/* image section */}
                 <div className="h-[180px]">
                    <img src={image} alt="" className="max-w-[140px] block mx-auto transform
                    group-hover:scale-105 duration-300 drop-shadow-md" />
                 </div>
                    {/* details section */}
                    <div className="p-4 text-center">
                        <h1 className="text-3xl font-bold">{title}</h1>
                        {/* stars rating */}
                        <div className="sm:flex items-center gap-2">
                        <div className="flex items-center gap-2 justify-center">
                        <FaStar className="text-yellow-400"/>
                        <FaStar className="text-yellow-400"/>
                        <FaStar className="text-yellow-400"/>
                        <FaStar className="text-yellow-400"/>
                        <FaStar className="text-yellow-400"/>
                        </div>
                        <p>({reviewsNumber} Reviews)</p>
                        </div>
                        <p className="text-xl font-bold">{price}</p>
                        <p>{discount}% off</p>
                    </div>
                </SwiperSlide>
            ))}
        </div>
      </Swiper>
    </div>
  )
}

export default DiscountSlider

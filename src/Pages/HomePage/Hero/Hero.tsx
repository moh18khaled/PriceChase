import React from 'react'
import Slider from 'react-slick';
import { imageList } from './Lists';
const Hero = () => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,
  };
  return (
    <div >
      {/* background pattern 
      <div className='h-[700px] w-[700px] bg-customBlsue/40 dark:bg-gray-900/40 absolute -top-1/2 right-0 rounded-3xl rotate-45 -z-10'>

      </div> */}
      {/* hero Section */}
      <Slider {...settings}>
       {imageList.map(({id,title,image,description})=>(
        <div key={id} className='container pb-8 sm:pb-0'>
        <div>
          <div className='w-4/5 mx-auto bg-[#D7E4FF] dark:bg-gray-900/80 dark:text-white px-6 rounded-md mt-60 grid grid-cols-1 sm:grid-cols-2'>
            {/* Text content section */}
            <div className='flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative'>
            <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold'>{title}</h1>
            <p className='text-sm'>{description}</p>
            <div>
              <button className='bg-customBlue hover:scale-105 duration-200 text-white py-2 px-8 rounded-md'>Shop Now</button>
            </div>
            </div>
            {/* image section */}
            <div className='order-1 sm:order-2'>
              <div className='relative'>
                <img src={image} alt="" className='w-[300px] h-[300px] sm:w-[450px] sm:h-[450px]
                sm:scale-125 object-contain mx-auto
                '/>
              </div>
            </div>
          </div>
        </div>
      </div>
       ))}
      </Slider>
    </div>
  )
}

export default Hero

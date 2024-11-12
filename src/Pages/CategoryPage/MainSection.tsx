import image from "../../assets/images/image 12.png"
const MainSection = () => {
  return (
    <div className="w-4/5 mx-auto">
        <h1 className="text-3xl sm:text-5xl font-bold mt-16">Men</h1>
       <div className=' bg-[#EAEAEA] shadow-xl  dark:bg-gray-700 dark:text-white px-6 rounded-md mt-10 grid grid-cols-1 sm:grid-cols-2 py-20'>
            {/* Text content section */}
            <div className='flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative'>
             <h1 className="text-xl sm:text-3xl font-bold">Best Men</h1>   
            <h2 className='text-3xl sm:text-5xl font-bold '>Collection</h2>
            <p className='text-sm'>Great Material and sleek look for all genders.</p>
            <div>
              <button className='bg-customBlue hover:scale-105 duration-200 text-white py-2 px-8 rounded-md'>Shop Now</button>
            </div>
            </div>
            {/* image section */}
            <div className='order-1 sm:order-2'>
              <div className='relative'>
                <img src={image} alt="" className='w-[100px] h-[100px] sm:w-[200px] sm:h-[200px]
                sm:scale-125 object-contain mx-auto
                '/>
              </div>
            </div>
            </div> 
    </div>
  )
}

export default MainSection

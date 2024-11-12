import { FaStar } from "react-icons/fa"
import { shirtsData } from "./data"

const MenShirts = () => {
  return (
    <div className="w-[90%] mx-auto mt-20 mb-10">
      <div>
        <h1 className="text-3xl sm:text-5xl font-bold mb-10 text-center sm:text-left">Men Shirts</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
        gap-32 md:gap-5 place-items-center mx-auto
        ">
            {shirtsData.map(({id,image,title,price,reviewsNumber})=>(
                <div key={id} className="rounded-2xl bg-[#D6D6D6] dark:bg-gray-800 hover:bg-black/80 dark:hover:bg-customBlue
                hover:text-white relative shadow-xl duration group max-w-[300px] mb-6 
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
                        <div className="sm:flex items-center">
                        <div className="flex items-center gap-2 justify-center">
                        <FaStar className="text-yellow-400"/>
                        <FaStar className="text-yellow-400"/>
                        <FaStar className="text-yellow-400"/>
                        <FaStar className="text-yellow-400"/>
                        <FaStar className="text-yellow-400"/>
                        </div>
                        <p>({reviewsNumber} Reviews)</p>
                        </div>
                        <p className="text-xl font-bold">EGP {price}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>

      
    </div>
  )
}

export default MenShirts

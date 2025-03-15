import {imageSize} from "./data"
import image18 from "../../assets/images/image 18.png"
import image23 from "../../assets/images/image 23.png"
import { FaStar } from "react-icons/fa"
import { FaRegStar } from "react-icons/fa6"
import { MdOutlineFavoriteBorder } from "react-icons/md"
import { useEffect, useState } from "react"
import { fetchPopularProducts } from "../HomePage/PopularProducts/data"
import { useParams } from "react-router-dom"
import apiBaseUrl from "../../config/axiosConfig"
const ProductDetails = () => {
  const { id } = useParams();

  const [popularProduct, setPopularProduct] = useState(null);

  useEffect(() => {
    const fetchSingleProduct =async ()=>{
      const response = await apiBaseUrl.get(`/products/popular/${id}`);
      console.log(response);
    }
    fetchSingleProduct();
  }, []);
  return (
    <div className="w-[95%] mx-auto mt-4">
      <div className="lg:flex lg:space-x-8 space-y-6">
        <div className="flex space-x-8">
          {/* div for column images */}
      <div className="flex flex-col gap-3">
        {imageSize.map(({image})=>(
            <div>
                <img src={image} alt="imageDatails" className="w-[71px] h-[95px]"/>
            </div>
        ))}
      </div>
      {/* div for ProductImage */}
      <div className="bg-[#EFEFEF] dark:bg-gray-500 w-[600px] sm:h-[900px] h-[700px]">
        <img src={image18} alt="ProductImage" className="w-[582px] sm:h-[588px] h-[488px] mt-[25%]"/>
      </div>
        </div>
      {/* div for details */}
      <div>
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <h1 className="sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-md font-bold">Sotex Mens Polo Shirt Short Sleeve Modern</h1>
            <img src={image23} alt="for h1" className="w-[50px] h-[50px]"/>
          </div>
          <div className="flex items-center space-x-4 mb-12">
              <div className="flex space-x-1">
              <FaStar className="text-yellow-400"/>
              <FaStar className="text-yellow-400"/>
              <FaStar className="text-yellow-400"/>
              <FaStar className="text-yellow-400"/>
              <FaRegStar/>
              </div>
              <p>(120 Reviews)</p>
              <p className="text-lg font-semibold">Add to Favourites</p>
              <MdOutlineFavoriteBorder className="text-lg"/>
          </div>
          <hr className="border-[1px] text-[#EFEFEF] mb-4"/>
          <div className="space-y-2">
            <button className="bg-[#F02C2C] hover:bg-[#771d1d] hover:duration-200 w-[229px] h-[51px] text-white rounded-md">Limited time deal</button>
            <p className="text-[#F13F3F] text-xl">-11% <span className="text-lg text-[#A92D2D] dark:text-red-600">EGP<span className="text-[#A92D2D] text-2xl">264</span>.00</span></p>
            <p>Last Price: <span className="line-through">EGP364.00</span></p>
          </div>
          <hr className="border-[1px] text-[#EFEFEF] mb-24"/>
          <div className="space-y-4">
            <button className="bg-[#EBC010] hover:bg-[#a79345] hover:duration-200 w-[100%] h-[78px] mx-auto text-white text-lg font-bold rounded-full">Add to Favorites</button>
            <button className="bg-[#FF9500] hover:bg-[#cf8b2c] hover:duration-200 w-[100%] h-[78px] mx-auto text-white text-lg font-bold rounded-full">Add to Cart</button>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default ProductDetails

import {imageSize} from "./data"
import image18 from "../../assets/images/image 18.png"
import image23 from "../../assets/images/image 23.png"
import { FaStar } from "react-icons/fa"
import { FaRegStar } from "react-icons/fa6"
import { MdOutlineFavoriteBorder } from "react-icons/md"

import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import apiBaseUrl from "../../config/axiosConfig"
import Swal from "sweetalert2"
import axios from "axios"
const ProductDetails = () => {
  const { id } = useParams();
  const [productImage,setProductImage] = useState("");
  const [title,setTitle] = useState("");
  const [productPrice,setProductPrice] = useState("");
  const [currency,setCurrency] = useState("");
  const [averageRating,setAverageRating] = useState(0);
  useEffect(()=>{
    const fetchProductById = async()=>{
      try {
        const response = await apiBaseUrl.get(`/products/${id}`);
        console.log(response);
        setProductImage(response.data.data.Image);
        setTitle(response.data.data.Title);
        setProductPrice(response.data.data.Price);
        setCurrency(response.data.data.Currency);
        setAverageRating(response.data.data.AverageRating);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProductById();
  },[]);

  const addToWishlist = async()=>{
    try {
      const response = await apiBaseUrl.post(`/wishlist/${id}`,{},{withCredentials : true});
      console.log(response);
      Swal.fire({
        title: response.data.message,
        icon: "success",
        draggable: true,
        })
      
    } catch (error:unknown) {
      if(axios.isAxiosError(error)){
        Swal.fire({
          icon: "error",
          title: "Failed to add to the wishlist",
          text: error.response?.data.error,
          confirmButtonColor: "#6D95EA",
          });
      }
    }
  }

  

  // put the view of the product
  useEffect(()=>{
    const fetchProductById = async()=>{
      try {
        const response = await apiBaseUrl.put(`/products/${id}/view`);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProductById();
  },[]);
  
  
  return (
    <div className="w-[95%] mx-auto mt-4">
      <div className="lg:flex lg:space-x-8 space-y-6">
        <div className="flex flex-col space-y-4 sm:flex-row">
          {/* div for column images */}
      {/* <div className="flex flex-col gap-3">
        {imageSize.map(({image})=>(
            <div>
                <img src={image} alt="imageDatails" className="w-[71px] h-[95px]"/>
            </div>
        ))}
      </div> */}
      {/* div for ProductImage */}
      <div className=" w-full sm:w-[500px] sm:h-[600px] h-[400px]">
        <img src={productImage} alt="ProductImage" className="w-full sm:w-[582px] sm:h-[588px] h-full object-contain"/>
      </div>
        </div>
      {/* div for details */}
      <div className="mt-8 sm:mt-0">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <h1 className="sm:text-lg md:text-xl lg:text-xl xl:text-3xl text-lg font-semibold">{title}</h1>
            {/* <img src={image23} alt="for h1" className="w-[50px] h-[50px]"/> */}
          </div>
          <div className="flex items-center space-x-4 mb-6 sm:mb-12">
              <div className="flex space-x-1">
              {[...Array(5)].map((_, index) => (
                      <FaStar
                        key={index}
                        className={`${
                          index < averageRating
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        } w-4 h-4`}
                      />
                    ))}
              </div>
              {/* <p>(120 Reviews)</p> */}
              {/* <p className="text-lg font-semibold">Add to Favourites</p>
              <MdOutlineFavoriteBorder className="text-lg"/> */}
          </div>
          <hr className="border-[1px] text-[#EFEFEF] mb-4"/>
          <div className="space-y-2">
            <button className="bg-[#F02C2C] hover:bg-[#771d1d] hover:duration-200 w-[229px] h-[51px] text-white rounded-md">Limited time deal</button>
            <p className="text-[#F13F3F] text-xl">-11% <span className="text-lg text-[#A92D2D] dark:text-red-600">{currency}<span className="text-[#A92D2D] text-2xl">{productPrice}</span></span></p>
            <p>Last Price: <span className="line-through">EGP364.00</span></p>
          </div>
          <hr className="border-[1px] text-[#EFEFEF] mb-12 sm:mb-24"/>
          <div className="space-y-4 flex flex-col items-center">
            <button onClick={addToWishlist} className="bg-[#EBC010] hover:bg-[#a79345] hover:duration-200 w-full sm:w-[80%] h-[50px] sm:h-[68px] text-white text-lg font-bold rounded-full">Add to Favorites</button>
            <button className="bg-[#FF9500] hover:bg-[#cf8b2c] hover:duration-200 w-full sm:w-[80%] h-[50px] sm:h-[68px] text-white text-lg font-bold rounded-full">Add to Cart</button>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default ProductDetails
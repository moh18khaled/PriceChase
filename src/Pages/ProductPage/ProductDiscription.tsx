import { useEffect, useState } from "react";
import apiBaseUrl from "../../config/axiosConfig";
import { useParams } from "react-router-dom";

const ProductDiscription = () => {
  const {id} = useParams();
  const [description,setDescription]=useState("");
  useEffect(()=>{
    const fetchProductById = async()=>{
      try {
        const response = await apiBaseUrl.get(`/products/${id}`);
        setDescription(response.data.data.Description);
        
      } catch (error) {
        console.log(error);
      }
    }
    fetchProductById();
  },[])
  return (
    <div className="mt-12 mb-12">
      <hr className="border-[1px] text-[#EFEFEF] mb-4"/>
      <div className="w-[81%] mx-auto">
        <h2 className="text-2xl font-bold mb-3">Product Description</h2>
        <p className="pl-8 mb-20">{description}</p>
      </div>
      <hr className="border-[1px] text-[#EFEFEF] mb-4"/>
    </div>
  )
}

export default ProductDiscription

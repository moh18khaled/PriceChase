import { FaStar } from "react-icons/fa"
import apiBaseUrl from "../../config/axiosConfig"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
const UserReviews = () => {
  const {id} = useParams();
  const [topReviews,setTopReviews] = useState([]);
  useEffect(()=>{
    const fetchProductById = async()=>{
      try {
        const response = await apiBaseUrl.get(`/products/${id}`);
        setTopReviews(response.data.data.TopReviews);
        
      } catch (error) {
        console.log(error);
      }
    }
    fetchProductById();
  },[])
  return (
    <div>
        <div className="w-[81%] mx-auto">
      <h2 className="text-2xl font-bold mb-20">Top Reviews</h2>
      {topReviews.map(({_id,Rating,ReviewText})=>(
        <div className="mb-12" key={_id}>
        {/* <div className="flex items-center ">
            <img src={image} alt="userImage" />
            <h2 className="text-lg">{username}</h2>
        </div> */}
        <div className="pl-4">
        <div className="flex items-center space-x-2">
            <p>{Rating}</p>
            {[...Array(5)].map((_, index) => (
                      <FaStar
                        key={index}
                        className={`${
                          index < Rating
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        } w-4 h-4`}
                      />
                    ))}
        </div>
        <h3 className="text-lg font-medium">{ReviewText}</h3>
        {/* <p>{description}</p> */}
        </div>
      </div>
      ))}
    </div>
        <hr className="border-[1px] text-[#EFEFEF] mb-10"/>
    </div>
    
  )
}

export default UserReviews

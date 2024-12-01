import { FaStar } from "react-icons/fa"
import { FaRegStar } from "react-icons/fa6"
import { userReviews } from "./data"
const UserReviews = () => {
  return (
    <div>
        <div className="w-[81%] mx-auto">
      <h2 className="text-2xl font-bold mb-20">Top Reviews</h2>
      {userReviews.map(({id,image,username,rate,rateStatus,description})=>(
        <div className="mb-12" key={id}>
        <div className="flex items-center ">
            <img src={image} alt="userImage" />
            <h2 className="text-lg">{username}</h2>
        </div>
        <div className="pl-4">
        <div className="flex items-center space-x-2">
            <p>{rate}</p>
            <FaStar className="text-yellow-400"/>
              <FaStar className="text-yellow-400"/>
              <FaStar className="text-yellow-400"/>
              <FaStar className="text-yellow-400"/>
              <FaRegStar/>
        </div>
        <h3 className="text-lg font-medium">{rateStatus}</h3>
        <p>{description}</p>
        </div>
      </div>
      ))}
    </div>
        <hr className="border-[1px] text-[#EFEFEF] mb-10"/>
    </div>
    
  )
}

export default UserReviews

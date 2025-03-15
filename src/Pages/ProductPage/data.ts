import image1 from "../../assets/images/image 18.png"
import image2 from "../../assets/images/image 19.png"
import image3 from "../../assets/images/image 20.png"
import image4 from "../../assets/images/image 21.png"
import image5 from "../../assets/images/image 22.png"
import userImage from "../../assets/images/User_Circle.png"
interface IImageSize {
    id : number,
    image : string,
}
interface IUserReviews {
    id : number,
    image : string,
    username : string,
    rate : number,
    rateStatus : string,
    description : String,
}
export const imageSize:IImageSize[] = [
    {
        id : 1,
        image : image1,
    },
    {
        id : 2,
        image : image2,
    },
    {
        id : 3,
        image : image3,
    },
    {
        id : 4,
        image : image4,
    },
    {
        id : 5,
        image : image5,
    },
]

export const userReviews:IUserReviews[] = [
    {
        id : 1,
        image : userImage,
        username : "username",
        rate : 3.9,
        rateStatus : "Good Quality",
        description : "Reviewed in Egypt on 26 September 2024" 
    },
    {
        id : 2,
        image : userImage,
        username : "username",
        rate : 3.9,
        rateStatus : "Great",
        description : "Reviewed in Egypt on 26 September 2024" 
    },
    {
        id : 3,
        image : userImage,
        username : "username",
        rate : 3.9,
        rateStatus : "great material",
        description : "Reviewed in Egypt on 26 September 2024" 
    },
    {
        id : 4,
        image : userImage,
        username : "username",
        rate : 3.9,
        rateStatus : "Good Quality",
        description : "Reviewed in Egypt on 26 September 2024" 
    },
]

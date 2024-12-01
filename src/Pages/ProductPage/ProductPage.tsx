import Footer from "../HomePage/Footer/Footer"
import Navbar from "../HomePage/Navbar/Navbar"
import Feedback from "./Feedback"
import ProductDetails from "./ProductDetails"
import ProductDiscription from "./ProductDiscription"
import UserReviews from "./UserReviews"

const ProductPage = () => {
  return (
    <div className="dark:bg-gray-900 dark:text-white">
      <Navbar />
      <ProductDetails />
      <ProductDiscription />
      <UserReviews />
      <Feedback />
      <Footer />
    </div>
  )
}

export default ProductPage

import { useState } from "react"
import Footer from "../HomePage/Footer/Footer"
import Header from "../HomePage/Navbar/Header"
import Navbar from "../HomePage/Navbar/Navbar"
import Feedback from "./Feedback"
import ProductDetails from "./ProductDetails"
import ProductDiscription from "./ProductDiscription"
import UserReviews from "./UserReviews"
import SearchResults from "../HomePage/Search/SearchResults"

const ProductPage = () => {
  const [query, setQuery] = useState('');
  return (
    <div className="dark:bg-gray-900 dark:text-white">
      <Header onDebouncedSearch={setQuery} />
      {query.trim() !== `` && <SearchResults query={query} />}
      <ProductDetails />
      <ProductDiscription />
      <UserReviews />
      <Feedback />
      <Footer />
    </div>
  )
}

export default ProductPage

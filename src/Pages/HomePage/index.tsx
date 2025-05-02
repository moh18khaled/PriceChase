import Hero from "./Hero/Hero"
import Navbar from "./Navbar/Navbar"
import DicountSection from "./DiscountSection/DicountSection"
import PopularProducts from "./PopularProducts/PopularProducts"
import Footer from "./Footer/Footer"
import DownNavbar from "./Navbar/DownNavbar"
import SearchResults from "./Search/SearchResults"
import { useState } from "react"

const HomePage = () => {
  const [query, setQuery] = useState('');
  return (
    <div className="dark:bg-gray-900 dark:text-white">
      <Navbar onDebouncedSearch={setQuery}/>
      <DownNavbar />
      {/* <Hero /> */}
      {query.trim() !== `` && <SearchResults query={query} />}
      <PopularProducts />
      <DicountSection />
      <Footer />
    </div>
  )
}

export default HomePage

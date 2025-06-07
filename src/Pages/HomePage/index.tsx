import Hero from "./Hero/Hero"
import Navbar from "./Navbar/Navbar"
import DicountSection from "./DiscountSection/DicountSection"
import PopularProducts from "./PopularProducts/PopularProducts"
import Footer from "./Footer/Footer"
import DownNavbar from "./Navbar/DownNavbar"
import SearchResults from "./Search/SearchResults"
import SearchByImageResults from "./Search/SearchByImageResults"
import { useState } from "react"

const HomePage = () => {
  const [showCategories, setShowCategories] = useState(false);
  const [query, setQuery] = useState('');
  const [imageQuery, setImageQuery] = useState<File | null>(null);

  return (
    <div className="dark:bg-gray-900 dark:text-white">
      <Navbar 
        onDebouncedSearch={setQuery}
        showCategories={showCategories}
        setShowCategories={setShowCategories}
        onImageUpload={setImageQuery}
      />
      {query.trim() !== '' && <SearchResults query={query} />}
      {imageQuery && <SearchByImageResults imageQuery={imageQuery} />}
      
        
          <Hero />
          <PopularProducts />
          <DicountSection />
        
      
      <Footer />
    </div>
  )
}

export default HomePage

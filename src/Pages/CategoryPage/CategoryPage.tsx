import { useState } from "react"
import Footer from "../HomePage/Footer/Footer"
import Header from "../HomePage/Navbar/Header"
import MainSection from "./MainSection"
import MenShirts from "./MenShirts"
import SearchResults from "../HomePage/Search/SearchResults"

const CategoryPage = () => {
  const [query, setQuery] = useState('');
  return (
    
      <div className="dark:bg-gray-900 dark:text-white">
        <Header onDebouncedSearch={setQuery} />
        {query.trim() !== `` && <SearchResults query={query} />}


      <MainSection />
      <MenShirts />
      <Footer />
      </div>
    
  )
}

export default CategoryPage

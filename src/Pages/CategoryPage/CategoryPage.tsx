import Footer from "../HomePage/Footer/Footer"
import Navbar from "../HomePage/Navbar/Navbar"
import MainSection from "./MainSection"
import MenShirts from "./MenShirts"

const CategoryPage = () => {
  return (
    
      <div className="dark:bg-gray-900 dark:text-white">
      <Navbar />
      <MainSection />
      <MenShirts />
      <Footer />
      </div>
    
  )
}

export default CategoryPage

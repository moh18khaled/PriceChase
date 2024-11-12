import Hero from "./Hero/Hero"
import Navbar from "./Navbar/Navbar"
import DicountSection from "./DiscountSection/DicountSection"
import PopularProducts from "./PopularProducts/PopularProducts"
import Footer from "./Footer/Footer"
import DownNavbar from "./Navbar/DownNavbar"

const HomePage = () => {
  return (
    <div className="dark:bg-gray-900 dark:text-white">
      <Navbar/>
      <DownNavbar />
      <Hero />
      <PopularProducts />
      <DicountSection />
      <Footer />
    </div>
  )
}

export default HomePage

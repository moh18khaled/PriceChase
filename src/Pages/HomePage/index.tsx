import Hero from "./Hero/Hero"
import Navbar from "./Navbar/Navbar"
import DicountSection from "./DiscountSection/DicountSection"
import PopularProducts from "./PopularProducts/PopularProducts"
import Footer from "./Footer/Footer"

const HomePage = () => {
  return (
    <div className="dark:bg-gray-900 text-white">
      <Navbar/>
      <Hero />
      <PopularProducts />
      <DicountSection />
      <Footer />
    </div>
  )
}

export default HomePage

import { NavLink } from "react-router-dom"
import DiscountSlider from "./DiscountSlider"

const DicountSection = () => {
  return (
    <div id="discount-products" className="mb-24">
      <div className='container'>
        {/* header section  */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
            <h1 data-aos="fade-up" className="text-3xl font-bold">Discount Section</h1>
        </div>
        {/* body section  */}
        <DiscountSlider />
        
      </div>
    </div>
  )
}

export default DicountSection

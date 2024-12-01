import { NavLink } from "react-router-dom"
import DiscountSlider from "./DiscountSlider"

const DicountSection = () => {
  return (
    <div className="mb-44">
      <div className='container'>
        {/* header section  */}
        <div className="text-center mb-16 max-w-[600px] mx-auto">
            <h1 data-aos="fade-up" className="text-3xl font-bold">Discount Section</h1>
        </div>
        {/* body section  */}
        <NavLink to={"/productPage"}>
        <DiscountSlider />
        </NavLink>
        
      </div>
    </div>
  )
}

export default DicountSection

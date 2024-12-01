import { NavLink } from "react-router-dom"
import ProductSlider from "./ProductSlider"

const PopularProducts = () => {
  return (
    <div className="mb-44">
      <div className='container'>
        {/* header section  */}
        <div className="text-center mb-16 max-w-[600px] mx-auto">
            <h1 data-aos="fade-up" className="text-3xl font-bold">Popular Products</h1>
        </div>
        {/* body section  */}
        <NavLink to={"/productPage"}>
        <ProductSlider />
        </NavLink>
        
      </div>
    </div>
  )
}

export default PopularProducts

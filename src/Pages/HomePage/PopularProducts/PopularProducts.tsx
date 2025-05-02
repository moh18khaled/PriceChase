import ProductSlider from "./ProductSlider"

const PopularProducts = () => {
  return (
    <div id="popular-products" className="mb-24 mt-10">
      <div className='container'>
        {/* header section  */}
        <div className="text-center  max-w-[600px] mx-auto">
            <h1 data-aos="fade-up" className="text-3xl font-bold">Popular Products</h1>
        </div>
        {/* body section  */}
        <ProductSlider />
        
      </div>
    </div>
  )
}

export default PopularProducts

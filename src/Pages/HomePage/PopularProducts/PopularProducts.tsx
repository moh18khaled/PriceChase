import ProductSlider from "./ProductSlider"

const PopularProducts = () => {
  return (
    <div id="popular-products" className="mb-24">
      <div className='container'>
        {/* header section  */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
            <h1 data-aos="fade-up" className="text-3xl font-bold">Popular Products</h1>
        </div>
        {/* body section  */}
        <ProductSlider />
        
      </div>
    </div>
  )
}

export default PopularProducts

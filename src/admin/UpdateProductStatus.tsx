
const FetchNewProducts = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col space-y-8 sm:space-y-16">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white">
            Update Product Status
          </h1>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 lg:gap-12">
            <div className="w-full sm:w-1/3">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-700 dark:text-gray-200">
                Amazon
              </h2>
            </div>
            
            <button className="w-full sm:w-auto bg-customBlue hover:bg-blue-600 
                             transform hover:scale-105 transition-all duration-300 
                             px-6 sm:px-10 py-3 rounded-lg text-white 
                             text-base sm:text-lg font-semibold shadow-lg 
                             hover:shadow-xl active:scale-95">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FetchNewProducts;

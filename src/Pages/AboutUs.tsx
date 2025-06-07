import React from 'react';
import { FaShoppingCart, FaChartLine, FaUsers, FaMobileAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const AboutUs: React.FC = () => {
  const features = [
    {
      icon: <FaShoppingCart className="h-8 w-8" />,
      title: "Price Comparison",
      description: "Compare prices across multiple stores to find the best deals and save money on your purchases."
    },
    {
      icon: <FaChartLine className="h-8 w-8" />,
      title: "Price History",
      description: "Track price changes over time to make informed buying decisions and catch the best discounts."
    },
    {
      icon: <FaUsers className="h-8 w-8" />,
      title: "User Community",
      description: "Join our community of smart shoppers to share deals, reviews, and shopping experiences."
    },
    {
      icon: <FaMobileAlt className="h-8 w-8" />,
      title: "Mobile Friendly",
      description: "Access our platform on any device with our responsive and user-friendly design."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto text-center mb-20"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Welcome to <span className="text-customBlue">PriceChase</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Your ultimate destination for smart shopping. We help you find the best deals
          and make informed purchasing decisions.
        </p>
      </motion.div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl 
                     transform hover:-translate-y-1 transition-all duration-300"
          >
            <div className="text-customBlue dark:text-blue-400 mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Mission Statement */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="max-w-4xl mx-auto bg-gradient-to-r from-blue-500 to-blue-600 
                 rounded-2xl p-8 sm:p-12 text-white shadow-xl"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
        <p className="text-lg leading-relaxed text-blue-50 text-center">
          At PriceChase, we're committed to empowering consumers with the tools and information 
          they need to make smart purchasing decisions. Our platform combines advanced price 
          tracking technology with a user-friendly interface to help you save time and money.
        </p>
      </motion.div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { number: "1M+", label: "Active Users" },
          { number: "50K+", label: "Products Tracked" },
          { number: "100+", label: "Partner Stores" }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
          >
            <div className="text-4xl font-bold text-customBlue dark:text-blue-400 mb-2">
              {stat.number}
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
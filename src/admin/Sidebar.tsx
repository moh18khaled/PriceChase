import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaUsers, 
  FaBoxes, 
  FaClipboardCheck,
  FaPlus,
  FaBars,
  FaSignOutAlt
} from 'react-icons/fa';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const menuItems = [
    { name: 'Manage Users', icon: FaUsers, path: '/admin/users' },
    { name: 'Manage Products', icon: FaBoxes, path: '/admin/products' },
    { name: 'Fetch New Products', icon: FaPlus, path: '/admin/fetch-products' },
    { name: 'Update Product Status', icon: FaClipboardCheck, path: '/admin/product-status' },
    // { name: 'Schedule Auto Updates', icon: FaSync, path: '/admin/auto-updates' },
    // { name: 'Schedule Product Fetch', icon: FaClock, path: '/admin/schedule-fetch' },
  ];


  return (
    <div 
      className={`h-screen bg-customBlue dark:bg-gray-800 dark:text-white transition-all duration-300 ${
        isExpanded ? 'w-64' : 'w-20'
      } fixed left-0 top-0 flex flex-col`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-3 top-4 bg-customBlue dark:bg-gray-800 dark:text-white p-1 rounded-full"
      >
        <FaBars />
      </button>

      {/* Logo Section */}
      <Link to={"/"}>
      <div className="p-4 border-b border-gray-700 text-white font-bold">
        <h2 className={`font-bold cursor-pointer ${isExpanded ? 'text-3xl' : 'text-sm text-center'}`}>
          {isExpanded ? 'PriceChase' : 'PC'}
        </h2>
      </div>
      </Link>

      {/* Menu Items */}
      <nav className="mt-6 flex-grow font-semibold">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex items-center px-4 py-3 hover:bg-gray-700 hover:text-white transition-colors duration-200
                       ${!isExpanded && 'justify-center'}`}
          >
            <item.icon className={`text-xl ${!isExpanded && 'text-2xl'}`} />
            {isExpanded && (
              <span className="ml-3 whitespace-nowrap">{item.name}</span>
            )}
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <Link to={"/"}>
      <button
        className={`flex items-center px-4 py-4 transition-colors duration-200 mb-4
                   ${!isExpanded && 'justify-center'} text-red-500 hover:text-red-600`}
      >
        <FaSignOutAlt className={`text-xl ${!isExpanded && 'text-2xl'}`} />
        {isExpanded && (
          <span className="ml-3 whitespace-nowrap">Exit</span>
        )}
      </button>
      </Link>
    </div>
  );
};

export default Sidebar;

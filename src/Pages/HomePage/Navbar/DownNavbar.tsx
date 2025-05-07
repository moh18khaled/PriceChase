import { useEffect, useState } from 'react';
import { fetchCategories } from './Menu';
import apiBaseUrl from '../../../config/axiosConfig';
import { Link } from 'react-router-dom';

interface SubCategory {
  _id: string;
  SubCategoryName: string;
}

interface CategorySubcategories {
  [categoryId: string]: SubCategory[];
}

interface DownNavbarProps {
  visible: boolean;
  onClose: () => void;
}

const DownNavbar: React.FC<DownNavbarProps> = ({ visible, onClose }) => {
  const [allCategories, setAllCategories] = useState([]);
  const [categorySubcategories, setCategorySubcategories] = useState<CategorySubcategories>({});
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Fetch all categories
  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchCategories();
      setAllCategories(data);
    };
    getCategories();
  }, []);

  // Handle category click
  const handleCategoryClick = async (id: string) => {
    setExpandedCategory(expandedCategory === id ? null : id);
    
    if (!categorySubcategories[id]) {
      try {
        const response = await apiBaseUrl.get(`/categories/${id}/subcategories`);
        setCategorySubcategories(prev => ({
          ...prev,
          [id]: response.data.result.SubCategoriesDetails
        }));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <nav 
      id='categories'
      className={`bg-[#FAFAFA] shadow-sm z-40 dark:bg-gray-700 dark:text-white border-b border-gray-100 dark:border-gray-600 transition-all duration-300 relative ${
        visible ? 'opacity-100 max-h-[500px]' : 'opacity-0 max-h-0 overflow-hidden'
      }`}
    >
      {/* Mobile menu button */}
      <div className="md:hidden flex justify-center p-4">
        <button
          onClick={() => {
            setIsMobileMenuOpen(!isMobileMenuOpen);
            onClose();
          }}
          className="text-gray-700 dark:text-white hover:text-gray-900 focus:outline-none flex items-center gap-2"
        >
          <span className="font-medium">Browse Categories</span>
          <svg
            className="h-5 w-5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMobileMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Categories container */}
      <div className={`container mx-auto ${isMobileMenuOpen ? 'block' : 'hidden'} md:block`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 py-4">
            {allCategories.map(({ _id, CategoryName }) => (
              <div key={_id} className="relative group">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleCategoryClick(_id);
                  }}
                  className="px-4 py-2 text-lg font-medium text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 
                             transition-colors duration-200 flex items-center gap-1 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <span>{CategoryName}</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${expandedCategory === _id ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Subcategories dropdown */}
                {expandedCategory === _id && categorySubcategories[_id] && (
                  <div className="absolute z-10 mt-2 w-56 origin-top-left rounded-lg bg-white dark:bg-gray-700 shadow-lg 
                                ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-200 
                                animate-fade-in">
                    <div className="py-1">
                      {categorySubcategories[_id].map(({ _id: subId, SubCategoryName }) => (
                        <Link
                          key={subId}
                          to={`/categories/${_id}`}
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 
                                   transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg"
                          onClick={onClose}
                        >
                          {SubCategoryName}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DownNavbar;
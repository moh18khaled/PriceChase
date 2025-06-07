import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosSearch, IoIosLogOut, IoMdClose } from "react-icons/io";
import { HiMenu, HiX } from "react-icons/hi";
import { BsSun, BsMoon } from "react-icons/bs";
import { fetchCategories, upMenu } from './Menu';
import { UserContext } from '../../../context/context';
import apiBaseUrl from '../../../config/axiosConfig';
import Cookies from "js-cookie";
import Swal from "sweetalert2"
import logo from "../../../assets/images/new_logo.png"
import { FiImage } from "react-icons/fi";
import { Tooltip } from 'react-tooltip';

type SearchBarProps = {
  onDebouncedSearch: (query: string) => void;
  showCategories: boolean;
  setShowCategories: (show: boolean) => void;
  onImageUpload: (file: File | null) => void;
};

const Navbar: React.FC<SearchBarProps> = ({ onDebouncedSearch, showCategories, setShowCategories, onImageUpload }) => {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [inputSearch, setInputSearch] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });
  const [hoveredCategory, setHoveredCategory] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchByImage, setSearchByImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const userEmail = Cookies.get("userEmail");
    if (userEmail) {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  useEffect(() => {
    if (!searchByImage) {
      const timeout = setTimeout(() => {
        onDebouncedSearch(inputSearch);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [inputSearch, onDebouncedSearch, searchByImage]);

  useEffect(() => {
    const checkLoginStatus = () => {
      const hasAuth = user?.auth || user?.adminAuth;
      setIsLoggedIn(!!hasAuth);
    };
    checkLoginStatus();
  }, [user?.auth, user?.adminAuth]);

  const handleLogout = async () => {
    try {
      const { isConfirmed } = await Swal.fire({
        title: "Are you sure you want to logout?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, logout!",
      });

      if (isConfirmed) {
        const response = await apiBaseUrl.post(
          `/user/logout`,
          {},
          { withCredentials: true }
        );
        if (response.status === 200) {
          Cookies.remove("auth");
          Cookies.remove("adminAuth");
          Cookies.remove("profilePicture");
          Cookies.remove("userEmail");

          user?.setAuth(null);
          user?.setAdminAuth(null);
          user?.setProfilePicture("");

          setIsLoggedIn(false);

          navigate("/login");
          Swal.fire({
            title: "Logged Out!",
            text: "You have been successfully logged out.",
            icon: "success",
          });
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: "An error occurred during logout",
      });
    }
  };

  const currentUser = user?.auth || user?.adminAuth;
  const profilePicture = user?.profilePicture || currentUser?.profilePicture?.url;

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.body.style.overflow = !menuOpen ? 'hidden' : 'unset';
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  const toggleMobileCategories = () => {
    setMobileCategoryOpen(!mobileCategoryOpen);
  };

  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    getCategories();
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onImageUpload(file);
      setSearchByImage(true);
      setInputSearch('');
    }
  };

  const handleCancelImageSearch = () => {
    setSearchByImage(false);
    setImagePreview(null);
    onImageUpload(null);
    setInputSearch('');
  };

  const handleTextSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!searchByImage) {
      setInputSearch(e.target.value);
    }
  };

  return (
    <nav className='sticky top-0 z-50 bg-white dark:bg-gray-900 dark:text-white'>
      <div className='py-4 shadow-md'>
        <div className='w-10/12 mx-auto h-12 flex items-center justify-between'>
          {/* Logo */}
          <div className='flex items-center gap-4'>
            <Link to="/" className='flex items-center'>
              <img 
                src={logo} 
                alt="logo" 
                className='w-20 h-20 md:w-28 md:h-28 rounded-full object-contain scale-125' 
                style={{ transform: 'translateY(1px)', maxHeight: '100%' }} 
              />            
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className='lg:flex hidden items-center gap-8'>
            <ul className='flex items-center gap-8'>
              {upMenu.map(({link, name}, idx) => (
                <li key={idx}>
                  {name === 'Categories' ? (
                    <div 
                      className="relative"
                      onMouseEnter={() => setHoveredCategory(true)}
                      onMouseLeave={() => setHoveredCategory(false)}
                    >
                      <button
                        className={`text-lg font-semibold transition-colors duration-200 
                                  ${hoveredCategory ? 'text-customBlue' : 'hover:text-customBlue'}`}
                      >
                        {name}
                      </button>

                      {/* Categories Dropdown */}
                      <div className={`absolute left-0 top-full mt-2 w-64 bg-white dark:bg-gray-800 
                                    rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 
                                    transition-all duration-300 transform origin-top-left
                                    ${hoveredCategory ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                        <div className="py-2">
                          {categories.map(({ _id, CategoryName }) => (
                            <Link
                              key={_id}
                              to={`/categories/${_id}`}
                              className="block px-4 py-3 text-gray-700 dark:text-gray-200 
                                       hover:bg-blue-50 dark:hover:bg-blue-900/30 
                                       hover:text-blue-600 dark:hover:text-blue-400
                                       transition-all duration-200 first:rounded-t-xl last:rounded-b-xl"
                            >
                              {CategoryName}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : name === 'Popular Products' ? (
                    <button
                      onClick={() => scrollToSection('popular-products')}
                      className='hover:text-customBlue transition-colors duration-200 font-semibold'
                    >
                      {name}
                    </button>
                  ) : name === 'Discount Section' ? (
                    <button
                      onClick={() => scrollToSection('discount-products')}
                      className='hover:text-customBlue transition-colors duration-200 font-semibold'
                    >
                      {name}
                    </button>
                  ) :  (
                    <Link 
                      className='hover:text-customBlue transition-colors duration-200 font-semibold' 
                      to={link}
                    >
                      {name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Search and Actions Container */}
          <div className='flex items-center gap-4'>
            {/* Search Input and Image Upload */}
            <div className='hidden sm:flex items-center gap-2'>
              {/* Image Upload Button */}
              <div className="relative">
                {searchByImage ? (
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <img 
                        src={imagePreview || ''} 
                        alt="Search preview" 
                        className="w-10 h-10 rounded-md object-cover border border-gray-300"
                      />
                      <button
                        onClick={handleCancelImageSearch}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <IoMdClose className="text-xs" />
                      </button>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">Image search active</span>
                  </div>
                ) : (
                  <>
                    <label 
                      className="cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors duration-200 flex items-center justify-center"
                      data-tooltip-id="image-search-tooltip"
                      data-tooltip-content="Search by image (upload or camera)"
                    >
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <FiImage className="text-gray-600 dark:text-gray-300 text-xl" />
                    </label>
                    <Tooltip id="image-search-tooltip" />
                  </>
                )}
              </div>
              
              {/* Search Input */}
              <div className='relative'>
                <input
                  type="text"
                  value={inputSearch}
                  onChange={handleTextSearchChange}
                  placeholder={searchByImage ? 'Image search active' : 'Search products'}
                  className={`w-[180px] lg:w-[220px] transition-all duration-300 rounded-lg border 
                           border-gray-300 px-4 py-2 focus:outline-none focus:border-customBlue 
                           dark:bg-gray-800 dark:border-gray-700 ${searchByImage ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={searchByImage}
                />
                <IoIosSearch className='text-gray-500 text-xl absolute top-1/2 -translate-y-1/2 right-3' />
              </div>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className='p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200'
            >
              {isDarkMode ? 
                <BsSun className='text-xl' /> : 
                <BsMoon className='text-xl' />
              }
            </button>

            {/* Desktop Auth Links */}
            {isLoggedIn ? 
              <div className='hidden lg:flex items-center gap-4'>
                {user?.adminAuth?.email &&
                  <button
                    onClick={() => navigate("/admin")}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Dashboard
                  </button>
                }

                <div className='flex items-center gap-4'>
                  {profilePicture ? (
                    <img 
                      src={profilePicture} 
                      alt="Profile" 
                      className="w-10 h-10 rounded-full object-cover cursor-pointer"
                      onClick={() => navigate("/profile-page")}
                    />
                  ) : (
                    <div 
                      className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center cursor-pointer"
                      onClick={() => navigate("/profile-page")}
                    >
                      <span className="text-gray-700 dark:text-gray-300">
                        {currentUser?.firstName?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                  )}
                  <button
                    onClick={handleLogout}
                    className='flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200'
                  >
                    <IoIosLogOut className='text-xl' />
                    Log Out
                  </button>
                </div>
              </div>
            : 
              <div className='hidden lg:flex items-center gap-4'>
                <Link 
                  to="/login" 
                  className='font-semibold hover:text-customBlue transition-colors duration-200'
                >
                  Log In
                </Link>
                <Link 
                  to="/register" 
                  className='bg-customBlue text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200'
                >
                  Sign Up
                </Link>
              </div>
            }

            {/* Mobile Menu Toggle */}
            <button 
              onClick={toggleMenu}
              className='lg:hidden text-2xl hover:text-customBlue transition-colors duration-200'
            >
              {menuOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div 
          id="mobile-menu"
          className='fixed inset-0 z-50 bg-black bg-opacity-50 lg:hidden'
          onClick={() => {
            setMenuOpen(false);
            document.body.style.overflow = 'unset';
          }}
        >
          <div 
            className='absolute right-0 top-0 h-full w-[280px] bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out flex flex-col'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='p-6 flex flex-col h-full'>
              {/* Close button */}
              <button 
                onClick={() => {
                  setMenuOpen(false);
                  document.body.style.overflow = 'unset';
                }}
                className='self-end mb-4 text-2xl hover:text-customBlue transition-colors duration-200'
              >
                <HiX />
              </button>

              {/* Mobile Search and Image Upload */}
              <div className='relative mb-6 sm:hidden'>
                <div className="flex items-center gap-2 mb-3">
                  {searchByImage ? (
                    <div className="flex items-center gap-2 w-full">
                      <div className="relative">
                        <img 
                          src={imagePreview || ''} 
                          alt="Search preview" 
                          className="w-10 h-10 rounded-md object-cover border border-gray-300"
                        />
                        <button
                          onClick={handleCancelImageSearch}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        >
                          <IoMdClose className="text-xs" />
                        </button>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">Image search active</span>
                    </div>
                  ) : (
                    <label className="cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors duration-200 flex items-center justify-center">
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <FiImage className="text-gray-600 dark:text-gray-300 text-xl" />
                    </label>
                  )}
                </div>
                <div className="relative w-full">
                  <input
                    type="text"
                    value={inputSearch}
                    onChange={handleTextSearchChange}
                    placeholder={searchByImage ? 'Image search active' : 'Search products'}
                    className={`w-full transition-all duration-300 rounded-lg border 
                             border-gray-300 pl-4 pr-10 py-2 focus:outline-none focus:border-customBlue
                             dark:bg-gray-800 dark:border-gray-700 ${searchByImage ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={searchByImage}
                  />
                  <IoIosSearch className="text-gray-500 text-xl absolute top-1/2 -translate-y-1/2 right-3" />
                </div>
              </div>

              {/* Mobile Navigation Links */}
              <ul className='flex flex-col gap-4 mb-6'>
                {upMenu.map(({link, name}, idx) => (
                  <li key={idx}>
                    {name === 'Popular Products' ? (
                      <button
                        onClick={() => {
                          scrollToSection('popular-products');
                          setMenuOpen(false);
                        }}
                        className='text-lg font-semibold hover:text-customBlue transition-colors duration-200 w-full text-left'
                      >
                        {name}
                      </button>
                    ) : name === 'Discount Section' ? (
                      <button
                        onClick={() => {
                          scrollToSection('discount-products');
                          setMenuOpen(false);
                        }}
                        className='text-lg font-semibold hover:text-customBlue transition-colors duration-200 w-full text-left'
                      >
                        {name}
                      </button>
                    ) : name === 'Categories' ? (
                      <div className="relative">
                        <button
                          onClick={toggleMobileCategories}
                          className={`text-lg font-semibold transition-colors duration-200 w-full text-left flex items-center justify-between ${
                            mobileCategoryOpen ? 'text-customBlue' : 'hover:text-customBlue'
                          }`}
                        >
                          {name}
                          <span className="transform transition-transform duration-200">
                            {mobileCategoryOpen ? '−' : '+'}
                          </span>
                        </button>

                        {/* Mobile Categories Dropdown */}
                        <div className={`overflow-hidden transition-all duration-300 ${
                          mobileCategoryOpen ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'
                        }`}>
                          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2 border border-gray-200 dark:border-gray-700">
                            {categories.map(({ _id, CategoryName }) => (
                              <Link
                                key={_id}
                                to={`/categories/${_id}`}
                                onClick={() => setMenuOpen(false)}
                                className="block px-4 py-2 text-gray-700 dark:text-gray-200 
                                         hover:bg-blue-50 dark:hover:bg-blue-900/30 
                                         hover:text-blue-600 dark:hover:text-blue-400
                                         transition-all duration-200 rounded-lg"
                              >
                                {CategoryName}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Link 
                        to={link}
                        className='text-lg font-semibold hover:text-customBlue transition-colors duration-200 block'
                        onClick={() => setMenuOpen(false)}
                      >
                        {name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>

              {/* Mobile Auth Links */}
              <div className='mt-auto'>
                {isLoggedIn ? (
                  <div className='flex flex-col gap-4'>
                    {user?.adminAuth?.email && (
                      <button
                        onClick={() => {
                          navigate("/admin");
                          setMenuOpen(false);
                        }}
                        className="w-full text-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        Dashboard
                      </button>
                    )}
                    
                    <div className='flex items-center gap-4'>
                      {profilePicture ? (
                        <img 
                          src={profilePicture} 
                          alt="Profile" 
                          className="w-10 h-10 rounded-full object-cover cursor-pointer"
                          onClick={() => {
                            navigate("/profile-page");
                            setMenuOpen(false);
                          }}
                        />
                      ) : (
                        <div 
                          className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center cursor-pointer"
                          onClick={() => {
                            navigate("/profile-page");
                            setMenuOpen(false);
                          }}
                        >
                          <span className="text-gray-700 dark:text-gray-300">
                            {currentUser?.firstName?.charAt(0).toUpperCase() || 'U'}
                          </span>
                        </div>
                      )}
                      <button
                        onClick={() => {
                          handleLogout();
                          setMenuOpen(false);
                        }}
                        className='flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200'
                      >
                        <IoIosLogOut className='text-xl' />
                        Log Out
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className='flex flex-col gap-4'>
                    <Link 
                      to="/login" 
                      className='text-center font-semibold hover:text-customBlue transition-colors duration-200'
                      onClick={() => setMenuOpen(false)}
                    >
                      Log In
                    </Link>
                    <Link 
                      to="/register" 
                      className='bg-customBlue text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 text-center'
                      onClick={() => setMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
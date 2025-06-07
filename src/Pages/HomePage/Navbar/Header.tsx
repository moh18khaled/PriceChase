import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosSearch, IoIosLogOut } from "react-icons/io";
import { HiMenu, HiX } from "react-icons/hi";
import { BsSun, BsMoon } from "react-icons/bs";
import { UserContext } from '../../../context/context';
import apiBaseUrl from '../../../config/axiosConfig';
import Cookies from "js-cookie";
import Swal from "sweetalert2"
import logo from "../../../assets/images/new_logo.png"

type SearchBarProps = {
  onDebouncedSearch: (query: string) => void;
};

const Header: React.FC<SearchBarProps> = ({ onDebouncedSearch }) => {
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
    const timeout = setTimeout(() => {
      onDebouncedSearch(inputSearch);
    }, 500);

    return () => clearTimeout(timeout);
  }, [inputSearch, onDebouncedSearch]);

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

  return (
    <nav className='sticky top-0 z-50 bg-white dark:bg-gray-900 dark:text-white'>
      {/* Upper Navbar */}
      <div className='py-3 shadow-md'>
        <div className='w-10/12 mx-auto h-12 flex items-center justify-between'>
          {/* Mobile Layout (logo + theme + search + menu toggle) */}
          <div className='sm:hidden flex items-center justify-between w-full'>
            {/* Logo */}
            <Link to="/" className='flex items-center'>
              <img 
                src={logo} 
                alt="logo" 
                className='w-20 h-20 rounded-full object-contain' 
              />            
            </Link>
            
            {/* Theme Toggle - Mobile */}
            <button
              onClick={toggleTheme}
              className='p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200'
            >
              {isDarkMode ? 
                <BsSun className='text-lg' /> : 
                <BsMoon className='text-lg' />
              }
            </button>

            {/* Centered Search Bar - mobile */}
            <div className='flex-1 max-w-xs mx-2'>
              <div className='relative w-full'>
                <input
                  type="text"
                  value={inputSearch}
                  onChange={(e) => setInputSearch(e.target.value)}
                  placeholder='Search'
                  className='w-full transition-all duration-300 rounded-lg border 
                           border-gray-300 px-3 py-1.5 focus:outline-none focus:border-customBlue 
                           dark:bg-gray-800 dark:border-gray-700 text-sm'
                />
                <IoIosSearch className='text-gray-500 text-lg absolute top-1/2 -translate-y-1/2 right-2' />
              </div>
            </div>
            
            {/* Mobile Menu Toggle */}
            <button 
              onClick={toggleMenu}
              className='text-xl hover:text-customBlue transition-colors duration-200'
            >
              {menuOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>

          {/* Desktop Layout */}
          <div className='hidden sm:flex items-center justify-between w-full'>
            {/* Logo */}
            <Link to="/" className='flex items-center'>
              <img 
                src={logo} 
                alt="logo" 
                className='w-28 h-28 rounded-full object-contain' 
              />            
            </Link>

            {/* Centered Search Bar - desktop */}
            <div className='flex-1 max-w-xl px-4'>
              <div className='relative w-full'>
                <input
                  type="text"
                  value={inputSearch}
                  onChange={(e) => setInputSearch(e.target.value)}
                  placeholder='Search'
                  className='w-full transition-all duration-300 rounded-lg border 
                           border-gray-300 px-4 py-2 focus:outline-none focus:border-customBlue 
                           dark:bg-gray-800 dark:border-gray-700'
                />
                <IoIosSearch className='text-gray-500 text-xl absolute top-1/2 -translate-y-1/2 right-3' />
              </div>
            </div>

            {/* Right-side Actions */}
            <div className='flex items-center gap-4'>
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
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div 
          id="mobile-menu"
          className='fixed inset-0 z-50 bg-black bg-opacity-50 sm:hidden'
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

export default Header;
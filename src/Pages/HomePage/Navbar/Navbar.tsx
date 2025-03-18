import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosSearch, IoIosLogOut } from "react-icons/io";
import { HiMenu, HiX } from "react-icons/hi";
import { BsSun, BsMoon } from "react-icons/bs";
import { upMenu } from './Menu';
import { User } from '../../../context/context';
import apiBaseUrl from '../../../config/axiosConfig';
import Cookies from "js-cookie";
import Swal from "sweetalert2"

const Navbar = () => {
  const checkUser = useContext(User);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  // handle the logout
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
        const response = await apiBaseUrl.post("/user/logout", {}, { withCredentials: true });
        if (response.status === 200) {
          Cookies.remove("auth");
          Cookies.remove("userEmail");
          checkUser.setAuth({});
          navigate("/login");
          Swal.fire({
            title: "Logged Out!",
            text: response.data.message,
            icon: "success",
          });
        }
      }
    } catch (error:any) {
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: error.response?.data?.error || "An error occurred during logout",
      });
    }
  };

  // Toggle menu and prevent scroll when menu is open
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.body.style.overflow = !menuOpen ? 'hidden' : 'unset';
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.getElementById('mobile-menu');
      if (menuOpen && menu && !menu.contains(event.target as Node)) {
        setMenuOpen(false);
        document.body.style.overflow = 'unset';
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  return (
    <nav className='sticky top-0 z-50 bg-white dark:bg-gray-900 dark:text-white'>
      {/* Upper Navbar */}
      <div className='py-4 shadow-md'>
        <div className='w-11/12 mx-auto flex items-center justify-between'>
          {/* Logo */}
          <div className='flex items-center gap-4'>
            <Link to='/' className='font-bold text-2xl sm:text-3xl'>
              Price<span className='text-customBlue'>Chase</span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className='lg:flex hidden items-center gap-8'>
            <ul className='flex items-center gap-8'>
              {upMenu.map(({link, name}, idx) => (
                <li key={idx}>
                  <Link 
                    className='hover:text-customBlue transition-colors duration-200 font-semibold' 
                    to={link}
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Search and Actions Container */}
          <div className='flex items-center gap-4'>
            {/* Search Input */}
            <div className='relative hidden sm:block'>
              <input
                type="text"
                placeholder='Search'
                className='w-[200px] lg:w-[250px] transition-all duration-300 rounded-lg border 
                         border-gray-300 px-4 py-2 focus:outline-none focus:border-customBlue 
                         dark:bg-gray-800 dark:border-gray-700'
              />
              <IoIosSearch className='text-gray-500 text-xl absolute top-1/2 -translate-y-1/2 right-3' />
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
            <div className='hidden lg:flex items-center gap-4'>
              {!isLoggedIn ? (
                <>
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
                </>
              ) : (
                <div className='flex items-center gap-4'>
                  <Link 
                    to="/profile-page"
                    className='font-semibold hover:text-customBlue transition-colors duration-200'
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className='flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200'
                  >
                    <IoIosLogOut className='text-xl' />
                    Log Out
                  </button>
                </div>
              )}
            </div>

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
          className='fixed inset-y-0 right-0 w-[280px] bg-white dark:bg-gray-900 shadow-xl 
                     transform transition-transform duration-300 ease-in-out lg:hidden
                     flex flex-col'
        >
          <div className='p-6 flex flex-col h-full'>
            {/* Mobile Search */}
            <div className='relative mb-6 sm:hidden'>
              <input
                type="text"
                placeholder='Search'
                className='w-full transition-all duration-300 rounded-lg border 
                         border-gray-300 px-4 py-2 focus:outline-none focus:border-customBlue
                         dark:bg-gray-800 dark:border-gray-700'
              />
              <IoIosSearch className='text-gray-500 text-xl absolute top-1/2 -translate-y-1/2 right-3' />
            </div>

            {/* Mobile Navigation Links */}
            <ul className='flex flex-col gap-4 mb-6'>
              {upMenu.map(({link, name}, idx) => (
                <li key={idx}>
                  <Link 
                    to={link}
                    className='text-lg font-semibold hover:text-customBlue transition-colors duration-200'
                    onClick={() => setMenuOpen(false)}
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Auth Links */}
            <div className='mt-auto'>
              {!isLoggedIn ? (
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
                    className='text-center bg-customBlue text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200'
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <div className='flex flex-col gap-4'>
                  <Link 
                    to="/profile-page"
                    className='text-center font-semibold hover:text-customBlue transition-colors duration-200'
                    onClick={() => setMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className='flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200'
                  >
                    <IoIosLogOut className='text-xl' />
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

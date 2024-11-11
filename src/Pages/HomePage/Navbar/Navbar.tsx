import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosSearch, IoIosLogOut } from "react-icons/io";
import { HiMenu, HiX } from "react-icons/hi";
import {  upMenu } from './Menu';

import DownNavbar from './DownNavbar';
const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle menu open/close state
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className=' dark:bg-gray-900 dark:text-white relative'>
      {/* Upper Navbar */}
      <div className='py-3 shadow-md'>
        <div className='w-4/5 mx-auto flex items-center justify-between'>
          {/* Logo */}
          <div>
            <Link to='' className='font-bold text-2xl sm:text-3xl'>Price<span className='text-customBlue'>Chase</span></Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className='lg:flex hidden items-center gap-5 font-bold text-lg'>
            <ul className='flex items-center gap-5'>
              {
                upMenu.map(({link,name},idx)=>(
                  <li key={idx}>
                    <a className='hover:duration-200 hover:text-customBlue hover:underline' href={link}>{name}</a>
                  </li>
                ))
              }
              </ul>
          </div>

          {/* Search Input */}
          <div className='relative lg:w-[250px] sm:w-[200px] w-[150px]'>
            <input
              type="text"
              placeholder='Search'
              className='lg:w-[250px] sm:w-[200px] w-[150px] transition-all duration-300 rounded-md border border-gray-400 px-2 py-1 focus:outline-none focus:border-2 focus:border-customBlue shadow-md'
            />
            <IoIosSearch className='text-gray-500 text-xl absolute top-1/2 -translate-y-1/2 right-3' />
          </div>

          {/* Desktop Auth Links */}
          <div className='lg:block hidden font-bold space-x-3'>
            {isLoggedIn ? (
              <>
                <Link to="login">Log In</Link>
                <Link to="register" className='bg-customBlue text-white p-2 rounded-md'>Sign Up</Link>
              </>
            ) : (
              <div className='lg:flex hidden items-center gap-3'>
                <div>Profile</div>
                <div className='flex items-center gap-2 bg-red-400 text-white p-2 rounded-md'>
                  <IoIosLogOut className='text-2xl' />
                  <Link to="register">Log Out</Link>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className='lg:hidden'>
            <button onClick={toggleMenu} className='text-2xl'>
              {menuOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Visible when `menuOpen` is true) */}
      {menuOpen && (
        <div className='fixed -bottom-16 text-customBlue right-0 h-full w-2/4 bg-gray-100   dark:bg-gray-800 p-5 flex flex-col items-end shadow-lg lg:hidden'>
          <ul className='flex flex-col items-end gap-5 font-bold text-lg mt-10'>
          {
                upMenu.map(({link,name,id})=>(
                  <li key={id}>
                    <a className='hover:duration-200 hover:text-customBlue hover:underline' href={link}>{name}</a>
                  </li>
                ))
              }
          </ul>
          <div className='flex flex-col items-end gap-5 mt-5 font-bold'>
            {isLoggedIn ? (
              <>
                <Link to="login" className='text-lg'>Log In</Link>
                <Link to="register" className='bg-customBlue text-white p-2 rounded-md text-lg'>Sign Up</Link>
              </>
            ) : (
              <>
                <div className='text-lg'>Profile</div>
                <div className='flex items-center gap-2 bg-red-400 text-white p-2 rounded-md'>
                  <IoIosLogOut className='text-2xl' />
                  <Link to="register">Log Out</Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      <DownNavbar />
    </div>
  );
};

export default Navbar;




import React from 'react';
import { Link } from 'react-scroll';
import { BiMenu } from 'react-icons/bi';
import { FiSun } from 'react-icons/fi';
import { MdOutlineNightlight } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';

const Navbar = ({ darkMode, isOpen, toggleMenu, toggleTheme }) => {
  return (
   
<div className={`px-0 2xl:px-40 ${darkMode ? 'bg-gradient-to-tr from-[#0235a3] via-[#030a1c] to-[#05174e] text-white-200' : 'bg-white text-black'}`}>

      <div className='w-full flex items-center justify-between py-4 px-10'>
        <Link to="header" smooth={true} duration={500} className='text-2xl font-bold text-blue-500 cursor-pointer'>PORTFOLIO</Link>
        <ul className='hidden md:flex gap-10 text-lg text-slate-800 dark:text-gray-200'>
          <li className='cursor-pointer hover:text-blue-500'>
            <Link to="header" smooth={true} duration={500}>Home</Link>
          </li>
          <li className='cursor-pointer hover:text-blue-500'>
            <Link to="about" smooth={true} duration={500}>About</Link>
          </li>
          <li className='cursor-pointer hover:text-blue-500'>
            <Link to="skills" smooth={true} duration={500}>Skills</Link>
          </li>
          <li className='cursor-pointer hover:text-blue-500'>
            <Link to="experience" smooth={true} duration={500}>Experience</Link>
          </li>
          <li className='cursor-pointer hover:text-blue-500'>
            <Link to="projects" smooth={true} duration={500}>Projects</Link>
          </li>
          
          <li className='cursor-pointer hover:text-blue-500'>
            <a href="#login">Signup & Login</a>
          </li>
          <li className='cursor-pointer hover:text-blue-500'>
            <a href="#payment">Subscription</a>
          </li>
        </ul>
        <div className='flex items-center'>
          <button onClick={toggleTheme} className='p-2'>
            {darkMode ? (
              <FiSun size={24} color="white" />
            ) : (
              <MdOutlineNightlight size={24} color="gray" />
            )}
          </button>
          <button onClick={toggleMenu} className='md:hidden p-2'>
            {isOpen ? (
              <AiOutlineClose size={26} className="text-gray-700 dark:text-gray-300" />
            ) : (
              <BiMenu size={26} className="text-gray-700 dark:text-gray-300" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? "block pt-4" : "hidden"} md:hidden`} id='mobile-menu'>
        <div className="flex flex-col gap-4 text-md text-gray-700 cursor-pointer dark:text-neutral-200">
          <Link to="header" onClick={toggleMenu}>Home</Link>
          <Link to="about" onClick={toggleMenu}>About</Link>
          <Link to="skills" onClick={toggleMenu}>Skills</Link>
          <Link to="experience" onClick={toggleMenu}>Experience</Link>
          <Link to="projects" onClick={toggleMenu}>Projects</Link>
          <a href="#login" onClick={toggleMenu}>Signup & Login</a>
          <a href="#payment" onClick={toggleMenu}>Payment</a>



        </div>
      </div>
    </div>
  );
};

export default Navbar;

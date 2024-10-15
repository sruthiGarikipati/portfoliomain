import React from "react";
import Navbar from "./Navbar";

const Layout = ({ darkMode, isOpen, toggleMenu, toggleTheme, children }) => {
  return (
    <div className={`min-h-screen overflow-auto ${darkMode ? 'dark:bg-gradient-to-tr from-[#0235a3] via-[#030a1c] to-[#05174e]' : 'bg-white'}`}>
      <Navbar 
        darkMode={darkMode}
        isOpen={isOpen}
        toggleMenu={toggleMenu}
        toggleTheme={toggleTheme}
      />
      {children}
    </div>
  );
};

export default Layout;

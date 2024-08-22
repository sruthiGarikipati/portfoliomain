import React, { useState } from "react";
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import LoginRegister from "./components/LoginRegister";
import ForgotPassword from './components/ForgotPassword';
import Welcome from './components/Welcome';
import UpdatePassword from './components/UpdatePassword';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <Router>
      <div className={`w-full min-h-screen ${darkMode ? 'dark' : ''}`}>
        <Routes>
          <Route path="/login" element={<LoginRegister />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/update-password" element={<UpdatePassword />} />

          <Route path="/" element={
            <div className={`w-full  ${darkMode ? 'dark:bg-gradient-to-tr from-[#0235a3] via-[#030a1c] to-[#05174e]' : 'bg-white'} min-h-screen`}>
              <Navbar 
                darkMode={darkMode}
                isOpen={isOpen}
                toggleMenu={toggleMenu}
                toggleTheme={toggleTheme}
              />
              <Header />
            </div>
          }/>

          <Route path="/about" element={
            <div className={`${darkMode ? 'dark:bg-gradient-to-tr from-[#0235a3] via-[#030a1c] to-[#05174e]' : 'bg-white'} min-h-screen`}>
              <Navbar 
                darkMode={darkMode}
                isOpen={isOpen}
                toggleMenu={toggleMenu}
                toggleTheme={toggleTheme}
              />
              <About />
            </div>
          } />

          <Route path="/skills" element={
            <div className={`${darkMode ? 'dark:bg-gradient-to-tr from-[#0235a3] via-[#030a1c] to-[#05174e]' : 'bg-white'} min-h-screen`}>
              <Navbar 
                darkMode={darkMode}
                isOpen={isOpen}
                toggleMenu={toggleMenu}
                toggleTheme={toggleTheme}
              />
              <Skills />
            </div>
          } />

          <Route path="/experience" element={
            <div className={`${darkMode ? 'dark:bg-gradient-to-tr from-[#0235a3] via-[#030a1c] to-[#05174e]' : 'bg-white'} min-h-screen`}>
              <Navbar 
                darkMode={darkMode}
                isOpen={isOpen}
                toggleMenu={toggleMenu}
                toggleTheme={toggleTheme}
              />
              <Experience />
            </div>
          } />

          <Route path="/projects" element={
            <div className={`${darkMode ? 'dark:bg-gradient-to-tr from-[#0235a3] via-[#030a1c] to-[#05174e]' : 'bg-white'} min-h-screen`}>
              <Navbar 
                darkMode={darkMode}
                isOpen={isOpen}
                toggleMenu={toggleMenu}
                toggleTheme={toggleTheme}
              />
              <Projects />
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;










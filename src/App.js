

// import React, { useState } from "react";
// import { HashRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from "./components/Navbar";
// import Header from "./components/Header";
// import About from "./components/About";
// import Skills from "./components/Skills";
// import Experience from "./components/Experience";
// import Projects from "./components/Projects";
// import LoginRegister from "./components/LoginRegister";
// import ForgotPassword from './components/ForgotPassword';
// import Welcome from './components/Welcome';
// import UpdatePassword from './components/UpdatePassword';
// import PaymentPage from "./components/PaymentPage";

// function App() {
//   const [darkMode, setDarkMode] = useState(true);
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(prev => !prev);
//   };

//   const toggleTheme = () => {
//     setDarkMode(prev => !prev);
//   };

//   const sectionClass = darkMode 
//     ? 'dark:bg-gradient-to-tr from-[#0235a3] via-[#030a1c] to-[#05174e]' 
//     : 'bg-white';

//   return (
//     <Router>
//       <div className={`w-full min-h-screen ${darkMode ? 'dark' : ''}`}>
//         <Navbar 
//           darkMode={darkMode}
//           isOpen={isOpen}
//           toggleMenu={toggleMenu}
//           toggleTheme={toggleTheme}
//         />
//         <Routes>
//           <Route path="/payment" element={<PaymentPage />} />
//           <Route path="/login" element={<LoginRegister />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/welcome" element={<Welcome />} />
//           <Route path="/update-password" element={<UpdatePassword />} />

//           <Route path="/" element={
//             <div className={`w-full ${sectionClass} min-h-screen`}>
//               <div id="header">
//                 <Header />
//               </div>
//               <div id="about">
//                 <About />
//               </div>
//               <div id="skills">
//                 <Skills />
//               </div>
//               <div id="experience">
//                 <Experience />
//               </div>
//               <div id="projects">
//                 <Projects />
//               </div>
//             </div>
//           }/>
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;









import React, { useState } from "react";
import { HashRouter as Router, Route, Routes, useLocation } from 'react-router-dom'; // Import useLocation
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
import PaymentPage from "./components/PaymentPage";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  const sectionClass = darkMode 
    ? 'dark:bg-gradient-to-tr from-[#0235a3] via-[#030a1c] to-[#05174e]' 
    : 'bg-white';

  // Get current location
  const location = useLocation();

  return (
    <div className={`w-full min-h-screen ${darkMode ? 'dark' : ''}`}>
      {/* Only show Navbar if not on the login page */}
      {location.pathname !== "/login" && (
        <Navbar 
          darkMode={darkMode}
          isOpen={isOpen}
          toggleMenu={toggleMenu}
          toggleTheme={toggleTheme}
        />
      )}
      <Routes>
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/update-password" element={<UpdatePassword />} />

        <Route path="/" element={
          <div className={`w-full ${sectionClass} min-h-screen`}>
            <div id="header">
              <Header />
            </div>
            <div id="about">
              <About />
            </div>
            <div id="skills">
              <Skills />
            </div>
            <div id="experience">
              <Experience />
            </div>
            <div id="projects">
              <Projects />
            </div>
          </div>
        }/>
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

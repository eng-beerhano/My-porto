import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faTools, faBriefcase, faProjectDiagram, faSignInAlt, faBars, faTimes, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { FaPhone } from 'react-icons/fa';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignInClick = () => {
    navigate('/login');
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Eng Beerhano</h1>
      <nav className="hidden md:flex">
        <ul className="flex space-x-4">
          <li><Link to="/" className="hover:text-gray-400"><FontAwesomeIcon icon={faHome} /> <span className="hidden sm:inline">Home</span></Link></li>
          <li><Link to="/about" className="hover:text-gray-400"><FontAwesomeIcon icon={faUser} /> <span className="hidden sm:inline">About</span></Link></li>
          <li><Link to="/skills" className="hover:text-gray-400"><FontAwesomeIcon icon={faTools} /> <span className="hidden sm:inline">Skills</span></Link></li>
          <li><Link to="/expPage" className="hover:text-gray-400"><FontAwesomeIcon icon={faBriefcase} /> <span className="hidden sm:inline">Experience</span></Link></li>
          <li><Link to="/projects" className="hover:text-gray-400"><FontAwesomeIcon icon={faProjectDiagram} /> <span className="hidden sm:inline">Projects</span></Link></li>
          <li><Link to="/contact" className="hover:text-gray-400"><FontAwesomeIcon icon={faPhone} /> <span className="hidden sm:inline">ContactMe</span></Link></li>          
        </ul>
      </nav>
      <button
        className="hidden md:block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSignInClick}
      >
        <FontAwesomeIcon icon={faSignInAlt} /> <span className="hidden sm:inline">Sign In</span>
      </button>
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          {isOpen ? (
            <FontAwesomeIcon icon={faTimes} className="w-6 h-6" />
          ) : (
            <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
          )}
        </button>
      </div>
      {isOpen && (
        <nav className="md:hidden absolute top-16 left-0 w-full bg-gray-800 text-white">
          <ul className="flex flex-col items-center space-y-4 py-4">
            <li><Link to="/home" className="hover:text-gray-400" onClick={toggleMenu}><FontAwesomeIcon icon={faHome} /> Home</Link></li>
            <li><Link to="/about" className="hover:text-gray-400" onClick={toggleMenu}><FontAwesomeIcon icon={faUser} /> About</Link></li>
            <li><Link to="/skills" className="hover:text-gray-400" onClick={toggleMenu}><FontAwesomeIcon icon={faTools} /> Skills</Link></li>
            <li><Link to="/experience" className="hover:text-gray-400" onClick={toggleMenu}><FontAwesomeIcon icon={faBriefcase} /> Experience</Link></li>
            <li><Link to="/projects" className="hover:text-gray-400" onClick={toggleMenu}><FontAwesomeIcon icon={faProjectDiagram} /> Projects</Link></li>
            <li><Link to="/contact" className="hover:text-gray-400" onClick={toggleMenu}><FontAwesomeIcon icon={FaPhone} /> ContactMe</Link></li>
            <li>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  toggleMenu();
                  handleSignInClick();
                }}
              >
                <FontAwesomeIcon icon={faSignInAlt} /> Sign In
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
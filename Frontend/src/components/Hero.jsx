import React from 'react';
import { FaFacebook, FaWhatsapp, FaGithub } from 'react-icons/fa';
import pic from '../assets/pic.jpeg';
const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-8 bg-gray-100 mt-6">
      {/* Left Side */}
      <div className="md:w-1/2 text-center md:text-left">
        <h1 className="text-4xl font-bold mb-4">Hi, I am Hassan Jama</h1>
        <h2 className="text-2xl font-semibold mb-4">Full Stack Developer</h2>
        <p className="mb-6">
          I am a passionate software engineer with experience in building web applications using modern technologies. I love solving complex problems and creating efficient solutions.
        </p>
        <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300">
          Hire Me
        </button>
      </div>

      {/* Right Side */}
      <div className="md:w-1/2 flex flex-col items-center">
 <img
          src={pic}
          alt="Profile"
          className="rounded-full w-48 h-48 border-4 border-blue-500 shadow-lg"
        />        <div className="flex space-x-4">
          <a href="https://www.facebook.com/xasan.xhaka.92" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-blue-600 w-8 h-8 hover:text-blue-700 transition duration-300" />
          </a>
          <a href="https://wa.me/613732602" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className="text-green-600 w-8 h-8 hover:text-green-700 transition duration-300" />
          </a>
          <a href="https://github.com/eng-beerhano" target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-gray-800 w-8 h-8 hover:text-gray-900 transition duration-300" />
          </a>
        </div>
      </div>
      
    </div>
  );
};

export default Hero;
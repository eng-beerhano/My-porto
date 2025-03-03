import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <div className="mb-4">
          <h2 className="text-xl font-bold">Contact Me</h2>
          <p>Email: engineerbeerhano@gmail.com</p>
          <p>Phone: (+252) 613-732502</p>
        </div>
        <div className="mb-4">
          {/* <h2 className="text-xl font-bold">Follow Me</h2> */}
          <div className="flex justify-center space-x-4">
            {/* <a href="https://github.com/eng-beerhano" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-200">
              <i className="fab fa-github fa-2x"></i>
            </a>
            <a href="https://linkedin.com/in/engineerHassanBeerhano" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-200">
              <i className="fab fa-linkedin fa-2x"></i>
            </a> */}
          </div>
        </div>
        <div className="text-sm">
          <p>&copy; {new Date().getFullYear()} Eng beerhano. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React from 'react'
import { useNavigate } from 'react-router-dom';
import pic from '../assets/pic.jpeg';

const About = () => {
    const skills = [
      { name: "UI/UX", level: 70 },
      { name: "Website Design", level: 70 },
      { name: "Frontend", level: 89 },
      { name: "Backend", level: 94 },
    ];
  
    const navigate = useNavigate();
  
    return (
      <div>
        <div>
          <section className="bg-gray-100 text-black py-10 px-5 md:px-20 flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 flex justify-center">
              <img
                src={pic}
                alt="Profile"
                className="rounded-full w-48 h-48 border-4 border-blue-500 shadow-lg"
              />
            </div>
  
            {/* Right: About Me Info */}
            <div className="md:w-2/3 mt-11 md:mt-0 md:ml-10">
              <h2 className="text-3xl font-bold mb-3 mt-3">About Me</h2>
              <p className="text-gray-700 mb-5">
                I am a passionate software engineer with experience in building web applications using modern technologies. I love solving complex problems and creating efficient solutions.
              </p>
  
              {/* Skill Bars */}
              {skills.map((skill, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between">
                    <span className="text-lg">{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-2.5">
                    <div
                      className="bg-blue-500 h-2.5 rounded-full"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
  
              {/* See More Button */}
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => navigate('/about')}
                  className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300 w-80"
                >
                  See More
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  };

export default About
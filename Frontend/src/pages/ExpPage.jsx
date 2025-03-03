import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';

const ExpPage = () => {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await axios.get('/admin/experience');
      setExperiences(response.data);
    } catch (error) {
      console.error('Error fetching experiences:', error);
    }
  };

  return (
    <div>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Experiences</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {experiences.map((experience) => (
          <div key={experience._id} className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-bold mb-2">{experience.placeOfWork}</h2>
            <p className="text-gray-700 mb-2">Years at Work: {experience.yearsAtWork}</p>
            {experience.picture && (
              <img
                src={`http://localhost:3000/uploads/${experience.picture}`}
                alt={experience.placeOfWork}
                className="w-full h-32 object-cover rounded mb-2"
              />
            )}
          </div>
        ))}
      </div>
      <button
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-7">  That is my Experiences</button>
    </div>
    <Footer />
        </div>


  );
};

export default ExpPage;
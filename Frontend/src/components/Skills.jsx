import React, { useState, useEffect } from 'react';
import axios from 'axios';

const skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await axios.get('/api/skills');
      setSkills(response.data);
    } catch (error) {
      console.error('Error fetching skills:', error);
      setSkills([]); // Ensure skills is an array even if there's an error
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Skills</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {skills.map((skill) => (
          <div key={skill._id} className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-bold mb-2">{skill.name}</h2>
            <p className="text-gray-700 mb-2">Proficiency: {skill.proficiency}</p>
            {skill.SkillImage && (
              <img
                src={`http://localhost:3000/uploads/${skill.SkillImage}`}
                alt={skill.name}
                className="w-full h-32 object-cover rounded mb-2"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default skills;
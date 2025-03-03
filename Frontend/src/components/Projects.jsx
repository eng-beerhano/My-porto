import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/admin/project');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects([]); // Ensure projects is an array even if there's an error
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {projects.map((project) => (
          <div key={project._id} className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-bold mb-2">{project.title}</h2>
            <p className="text-gray-700 mb-2">{project.description}</p>
           
            {project.picture && (
              <img
                src={`http://localhost:3000/uploads/${project.picture}`}
                alt={project.title}
                className="w-full h-32 object-cover rounded mb-2"
              />
              
            )}
             <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 inline-block text-center"
            >
              Visit Project
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddSkill = () => {
  const [name, setName] = useState('');
  const [proficiency, setProficiency] = useState('');
  const [SkillImage, setSkillImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('proficiency', proficiency);
    formData.append('SkillImage', SkillImage);

    try {
      const response = await axios.post('/api/skills', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Skill added successfully!');
      console.log(response.data);
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Add Skill</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">Skill Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="proficiency">Proficiency</label>
          <input
            type="text"
            id="proficiency"
            value={proficiency}
            onChange={(e) => setProficiency(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="SkillImage">Skill Image</label>
          <input
            type="file"
            id="SkillImage"
            onChange={(e) => setSkillImage(e.target.files[0])}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
          Add Skill
        </button>
      </form>
    </div>
  );
};

export default AddSkill;
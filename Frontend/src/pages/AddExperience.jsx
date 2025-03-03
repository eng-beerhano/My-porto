import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddExperience = () => {
  const [placeOfWork, setPlaceOfWork] = useState('');
  const [yearsAtWork, setYearsAtWork] = useState('');
  const [picture, setPicture] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('placeOfWork', placeOfWork);
    formData.append('yearsAtWork', yearsAtWork);
    formData.append('picture', picture);

    try {
      const response = await axios.post('/admin/experience', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Experience added successfully!');
      console.log(response.data);
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Add Experience</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="placeOfWork">Place of Work</label>
          <input
            type="text"
            id="placeOfWork"
            value={placeOfWork}
            onChange={(e) => setPlaceOfWork(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="yearsAtWork">Years at Work</label>
          <input
            type="text"
            id="yearsAtWork"
            value={yearsAtWork}
            onChange={(e) => setYearsAtWork(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="picture">Experience Image</label>
          <input
            type="file"
            id="picture"
            onChange={(e) => setPicture(e.target.files[0])}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
          Add Experience
        </button>
      </form>
    </div>
  );
};

export default AddExperience;
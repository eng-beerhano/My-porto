import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { FaEdit, FaTrash } from 'react-icons/fa';

Modal.setAppElement('#root');

const AllSkills = () => {
  const [skills, setSkills] = useState([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentSkill, setCurrentSkill] = useState(null);
  const [name, setName] = useState('');
  const [proficiency, setProficiency] = useState('');
  const [SkillImage, setSkillImage] = useState(null);

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

  const openUpdateModal = (skill) => {
    setCurrentSkill(skill);
    setName(skill.name);
    setProficiency(skill.proficiency);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setCurrentSkill(null);
  };

  const openDeleteModal = (skill) => {
    setCurrentSkill(skill);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCurrentSkill(null);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('proficiency', proficiency);
    if (SkillImage) {
      formData.append('SkillImage', SkillImage);
    }

    try {
      await axios.put(`/api/skills/${currentSkill._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchSkills();
      closeUpdateModal();
    } catch (error) {
      console.error('Error updating skill:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/skills/${currentSkill._id}`);
      fetchSkills();
      closeDeleteModal();
    } catch (error) {
      console.error('Error deleting skill:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Skills</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Proficiency</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(skills) && skills.map((skill) => (
            <tr key={skill._id}>
              <td className="py-2 px-4 border-b">{skill.name}</td>
              <td className="py-2 px-4 border-b">{skill.proficiency}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="text-green-500 mr-2"
                  onClick={() => openUpdateModal(skill)}
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-500"
                  onClick={() => openDeleteModal(skill)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update Modal */}
      <Modal
        isOpen={isUpdateModalOpen}
        onRequestClose={closeUpdateModal}
        contentLabel="Update Skill"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2 className="text-xl font-bold mb-4">Update Skill</h2>
        <form onSubmit={handleUpdate}>
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
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
            Update Skill
          </button>
        </form>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        contentLabel="Delete Skill"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2 className="text-xl font-bold mb-4">Delete Skill</h2>
        <p>Are you sure you want to delete this skill?</p>
        <div className="mt-4">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 mr-2"
          >
            Yes
          </button>
          <button
            onClick={closeDeleteModal}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
          >
            No
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AllSkills;
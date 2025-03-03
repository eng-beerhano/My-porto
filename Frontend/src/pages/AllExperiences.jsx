import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { FaEdit, FaTrash } from 'react-icons/fa';

Modal.setAppElement('#root');

const AllExperiences = () => {
  const [experiences, setExperiences] = useState([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentExperience, setCurrentExperience] = useState(null);
  const [placeOfWork, setPlaceOfWork] = useState('');
  const [yearsAtWork, setYearsAtWork] = useState('');
  const [picture, setPicture] = useState(null);

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

  const openUpdateModal = (experience) => {
    setCurrentExperience(experience);
    setPlaceOfWork(experience.placeOfWork);
    setYearsAtWork(experience.yearsAtWork);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setCurrentExperience(null);
  };

  const openDeleteModal = (experience) => {
    setCurrentExperience(experience);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCurrentExperience(null);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('placeOfWork', placeOfWork);
    formData.append('yearsAtWork', yearsAtWork);
    if (picture) {
      formData.append('picture', picture);
    }

    try {
      await axios.put(`/admin/experience/${currentExperience._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchExperiences();
      closeUpdateModal();
    } catch (error) {
      console.error('Error updating experience:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/admin/experience/${currentExperience._id}`);
      fetchExperiences();
      closeDeleteModal();
    } catch (error) {
      console.error('Error deleting experience:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Experiences</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Place of Work</th>
            <th className="py-2 px-4 border-b">Years at Work</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {experiences.map((experience) => (
            <tr key={experience._id}>
              <td className="py-2 px-4 border-b">{experience.placeOfWork}</td>
              <td className="py-2 px-4 border-b">{experience.yearsAtWork}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="text-green-500 mr-2"
                  onClick={() => openUpdateModal(experience)}
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-500"
                  onClick={() => openDeleteModal(experience)}
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
        contentLabel="Update Experience"
        className="modal"
        overlayClassName="modal-overlay"
        style={{
          content: {
            top: '50%',
            left: 'auto',
            right: '0',
            bottom: 'auto',
            marginRight: '20px',
            transform: 'translateY(-50%)',
            width: '300px',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        <h2 className="text-xl font-bold mb-4">Update Experience</h2>
        <form onSubmit={handleUpdate}>
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
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
            Update Experience
          </button>
        </form>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        contentLabel="Delete Experience"
        className="modal"
        overlayClassName="modal-overlay"
        style={{
          content: {
            top: '50%',
            left: 'auto',
            right: '0',
            bottom: 'auto',
            marginRight: '20px',
            transform: 'translateY(-50%)',
            width: '300px',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        <h2 className="text-xl font-bold mb-4">Delete Experience</h2>
        <p>Are you sure you want to delete this experience?</p>
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

export default AllExperiences;
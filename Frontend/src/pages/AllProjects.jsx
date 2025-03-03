import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { FaEdit, FaTrash } from 'react-icons/fa';

Modal.setAppElement('#root');

const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [picture, setPicture] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/admin/project');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const openUpdateModal = (project) => {
    setCurrentProject(project);
    setTitle(project.title);
    setDescription(project.description);
    setLink(project.link);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setCurrentProject(null);
  };

  const openDeleteModal = (project) => {
    setCurrentProject(project);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCurrentProject(null);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('link', link);
    if (picture) {
      formData.append('picture', picture);
    }

    try {
      await axios.put(`/admin/project/${currentProject._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchProjects();
      closeUpdateModal();
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/admin/project/${currentProject._id}`);
      fetchProjects();
      closeDeleteModal();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Projects</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Link</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project._id}>
              <td className="py-2 px-4 border-b">{project.title}</td>
              <td className="py-2 px-4 border-b">{project.description}</td>
              <td className="py-2 px-4 border-b">{project.link}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="text-green-500 mr-2"
                  onClick={() => openUpdateModal(project)}
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-500"
                  onClick={() => openDeleteModal(project)}
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
        contentLabel="Update Project"
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
        <h2 className="text-xl font-bold mb-4">Update Project</h2>
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="title">Project Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="link">Project Link</label>
            <input
              type="text"
              id="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="picture">Project Image</label>
            <input
              type="file"
              id="picture"
              onChange={(e) => setPicture(e.target.files[0])}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
            Update Project
          </button>
        </form>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        contentLabel="Delete Project"
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
        <h2 className="text-xl font-bold mb-4">Delete Project</h2>
        <p>Are you sure you want to delete this project?</p>
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

export default AllProjects;
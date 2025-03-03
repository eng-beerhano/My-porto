import React, { useState } from 'react';
import axios from 'axios';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Send = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    subject: '',
    lastName: '',
    phone: '',
    message: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.subject || !formData.phone || !formData.message) {
      setError('All fields are required');
      toast.error('All fields are required');
      return;
    }

    try {
      const response = await axios.post('/api/contact', formData);
      console.log('Message sent:', response.data);
      toast.success('Message sent successfully');
      // Optionally, show a success message or clear the form
      setError('');
      setFormData({
        firstName: '',
        email: '',
        subject: '',
        lastName: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
      // Optionally, show an error message
      setError('Failed to send message');
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row">
      <ToastContainer />
      <div className="w-full md:w-1/2 p-4">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-4">
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Subject</label>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Message</label>
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              rows="4"
            ></textarea>
          </div>
          <button type="submit" className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-orange-600">
            Send Your Message
          </button>
        </form>
      </div>
      <div className="w-full md:w-1/2 p-4 flex flex-col space-y-4">
        <div className="flex items-center p-4 bg-white border border-gray-300 rounded shadow-md">
          <FaPhone className="text-2xl text-gary-800 mr-4" />
          <p className="text-gray-700">+252 613 73 26 02</p>
        </div>
        <div className="flex items-center p-4 bg-white border border-gray-300 rounded shadow-md">
          <FaEnvelope className="text-2xl text-gray-800 mr-4" />
          <p className="text-gray-700">info@Beeerhano.com</p>
        </div>
        <div className="flex items-center p-4 bg-white border border-gray-300 rounded shadow-md">
          <FaMapMarkerAlt className="text-2xl text-gray-800 mr-4" />
          <p className="text-gray-700"> str 30ka, district Yaqshid, Mogadisho, Somalia</p>
        </div>
        <div className="flex items-center p-4 bg-white border border-gray-300 rounded shadow-md">
          <FaTwitter className="text-2xl text-gray-800 mr-4" />
          <FaFacebook className="text-2xl text-gray-800 mr-4" />
          <FaInstagram className="text-2xl text-gray-800 mr-4" />
          <p className="text-gray-700">Follow us on social media</p>
        </div>
      </div>
    </div>
  );
};

export default Send;
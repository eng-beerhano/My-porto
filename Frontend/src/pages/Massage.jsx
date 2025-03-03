import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';

const Massage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('/api/contacts');
        setMessages(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch messages');
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/contact/${id}`);
      setMessages(messages.filter((message) => message._id !== id));
    } catch (error) {
      console.error('Failed to delete message', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Contact Messages</h2>
      {messages.length === 0 ? (
        <p>No messages available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {messages.map((message) => (
            <div key={message._id} className="bg-white border border-gray-300 p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold">{message.firstName} {message.lastName}</h3>
                <button onClick={() => handleDelete(message._id)} className="text-red-500 hover:text-red-700">
                  <FaTrash />
                </button>
              </div>
              <p className="text-gray-700 mb-2"><strong>Email:</strong> {message.email}</p>
              <p className="text-gray-700 mb-2"><strong>Subject:</strong> {message.subject}</p>
              <p className="text-gray-700 mb-2"><strong>Phone:</strong> {message.phone}</p>
              <p className="text-gray-700 mb-2"><strong>Message:</strong> {message.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Massage;
import express from 'express';
import { createContact, deleteContact, getContacts, updateContact } from '../Controllers/contactController.js';

const contactRoutes = express.Router();

contactRoutes.post('/contact', createContact);
contactRoutes.get('/contacts', getContacts); // Add this route to fetch contacts
contactRoutes.put('/update-contact', updateContact);
contactRoutes.delete('/contact/:id', deleteContact);

export default contactRoutes;
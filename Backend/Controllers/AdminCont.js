import Admin from '../Models/Admin.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Experience from '../Models/Experience.js';
import Project from '../Models/Project.js';
import path from 'path';
import fs from 'fs';
import Skill from '../Models/Skills.js';

// SignUp function
export const signUp = async (req, res) => {
    const { Name, password } = req.body;

    try {
        const existingAdmin = await Admin.findOne({ Name });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newAdmin = new Admin({ Name, password: hashedPassword });
        await newAdmin.save();

        const token = jwt.sign({ Name: newAdmin.Name, id: newAdmin._id }, 'secret', { expiresIn: '1h' });

        res.status(201).json({ result: newAdmin, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Login function
export const login = async (req, res) => {
    const { Name, password } = req.body;

    try {
        const existingAdmin = await Admin.findOne({ Name });
        if (!existingAdmin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingAdmin.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ Name: existingAdmin.Name, id: existingAdmin._id }, 'secret', { expiresIn: '1h' });

        res.status(200).json({ result: existingAdmin, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Register Experience
export const registerExperience = async (req, res) => {
    const { placeOfWork, yearsAtWork } = req.body;
    const picture = req.file ? req.file.filename : null;

    try {
        const newExperience = new Experience({ placeOfWork, yearsAtWork, picture });
        await newExperience.save();

        res.status(201).json(newExperience);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Get All Experiences
export const getAllExperiences = async (req, res) => {
    try {
        const experiences = await Experience.find();
        res.status(200).json(experiences);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Update Experience
export const updateExperience = async (req, res) => {
    const { id } = req.params;
    const { placeOfWork, yearsAtWork } = req.body;
    const picture = req.file ? req.file.filename : null;

    try {
        const updatedExperience = await Experience.findByIdAndUpdate(id, { placeOfWork, yearsAtWork, picture }, { new: true });
        res.status(200).json(updatedExperience);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Delete Experience
export const deleteExperience = async (req, res) => {
    const { id } = req.params;

    try {
        const experience = await Experience.findByIdAndDelete(id);
        if (!experience) {
            return res.status(404).json({ message: 'Experience not found' });
        }
        if (experience.picture) {
            fs.unlinkSync(path.join(__dirname, '../uploads', experience.picture));
        }
        res.status(200).json({ message: 'Experience deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Register Project
export const registerProject = async (req, res) => {
    const { title, description, link } = req.body;
    const picture = req.file ? req.file.filename : null;

    try {
        const newProject = new Project({ title, description, link, picture });
        await newProject.save();

        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Get All Projects
export const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Update Project
export const updateProject = async (req, res) => {
    const { id } = req.params;
    const { title, description, link } = req.body;
    const picture = req.file ? req.file.filename : null;

    try {
        const updatedProject = await Project.findByIdAndUpdate(id, { title, description, link, picture }, { new: true });
        res.status(200).json(updatedProject);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Delete Project
export const deleteProject = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProject = await Project.findByIdAndDelete(id);
        if (!deletedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};

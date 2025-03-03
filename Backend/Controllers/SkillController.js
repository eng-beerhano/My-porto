import Skill from '../Models/Skills.js';
import path from 'path';
import fs from 'fs';

// Register Skill
export const registerSkill = async (req, res) => {
    const { name, proficiency } = req.body;
    const SkillImage = req.file ? req.file.filename : null;

    try {
        const newSkill = new Skill({ name, proficiency, SkillImage });
        await newSkill.save();

        res.status(201).json(newSkill);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Get All Skills
export const getAllSkills = async (req, res) => {
    try {
        const skills = await Skill.find();
        res.status(200).json(skills);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Update Skill
export const updateSkill = async (req, res) => {
    const { id } = req.params;
    const { name, proficiency } = req.body;
    const SkillImage = req.file ? req.file.filename : null;

    try {
        const updatedSkill = await Skill.findByIdAndUpdate(id, { name, proficiency, SkillImage }, { new: true });
        res.status(200).json(updatedSkill);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Delete Skill
export const deleteSkill = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedSkill = await Skill.findByIdAndDelete(id);
        if (!deletedSkill) {
            return res.status(404).json({ message: 'Skill not found' });
        }

        res.status(200).json({ message: 'Skill deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};
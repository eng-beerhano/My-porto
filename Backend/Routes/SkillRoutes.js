import express from 'express';
import multer from 'multer';
import { registerSkill, getAllSkills, updateSkill, deleteSkill } from '../Controllers/SkillController.js';

const skillRouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Skill routes
skillRouter.post('/skills', upload.single('SkillImage'), registerSkill);
skillRouter.get('/skills', getAllSkills);
skillRouter.put('/skills/:id', upload.single('SkillImage'), updateSkill);
skillRouter.delete('/skills/:id', deleteSkill);

export default skillRouter;
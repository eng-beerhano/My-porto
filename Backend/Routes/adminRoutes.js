import express from 'express';
import multer from 'multer';
import { signUp, login, deleteExperience, registerProject, getAllProjects, updateProject, deleteProject} from '../Controllers/AdminCont.js';
import { registerExperience, getAllExperiences, updateExperience } from '../Controllers/AdminCont.js';
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Admin routes
router.post('/signup', signUp);
router.post('/login', login);

// Experience routes
router.post('/experience', upload.single('picture'), registerExperience);
router.get('/experience', getAllExperiences);
router.put('/experience/:id', upload.single('picture'), updateExperience);
router.delete('/experience/:id', deleteExperience);

// Project routes
router.post('/project', upload.single('picture'), registerProject);
router.get('/project', getAllProjects);
router.put('/project/:id', upload.single('picture'), updateProject);
router.delete('/project/:id', deleteProject);

export default router;
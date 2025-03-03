import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './db.js';
import router from './Routes/adminRoutes.js';
import skillRouter from './Routes/SkillRoutes.js';
import contactRoutes from './Routes/contactRoutes.js';
import multer from 'multer';

const app = express();
const upload = multer({ dest: 'uploads/' });
const PORT = process.env.PORT || 3000;

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/admin', router);
app.use('/api', skillRouter);
app.use('/api', contactRoutes);

app.listen(PORT, () => {
  console.log('Server is running on port 3000');
  connectDB();
});
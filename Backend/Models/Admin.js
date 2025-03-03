import mongoose from 'mongoose';


const adminSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        unique: true,
      default: 'Beerhano124'
    },
    password: {
        type: String,
        required: true,
        default: 'Beerhano@2025'
    }
});

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
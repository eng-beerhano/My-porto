import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
    placeOfWork: {
        type: String,
        required: true
    },
    yearsAtWork: {
        type: Number,
        required: true
    },
    picture: {
        type: String,
        required: true
    }
});

const Experience = mongoose.model('Experience', experienceSchema);

export default Experience;
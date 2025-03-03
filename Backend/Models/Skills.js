import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    proficiency: {
        type: String,
        required: true
    },
    SkillImage: {
        type: String,
        required: true,
    },
});

const Skill = mongoose.model('Skill', skillSchema);

export default Skill;
import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  sessionId: {
    type: String,
    unique: true,
    sparse: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true,
  },
  bodyType: {
    type: String,
    enum: ['slim', 'average', 'big', 'heavy'],
    required: true,
  },
  goal: {
    type: String,
    enum: ['lose-weight', 'gain-muscle', 'get-shredded'],
    required: true,
  },
  problemAreas: [
    {
      type: String,
      enum: ['chest', 'arms', 'belly', 'legs', 'full-body'],
    }
  ],
  height: {
    type: Number,
    required: true,
  },
  heightUnit: {
    type: String,
    enum: ['metric', 'imperial'],
    default: 'cm',
  },
  linked: {
    type: Boolean,
    default: false,
  },
  linkedUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, { timestamps: true });

const Quiz = mongoose.model('Quiz', quizSchema);
export default Quiz;

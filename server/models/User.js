import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  quizAnswers: {
    gender: {
      type: String,
      enum: ['male', 'female'],
    },
    bodyType: {
      type: String,
      enum: ['slim', 'average', 'big', 'heavy'],
    },
    goal: {
      type: String,
      enum: ['lose-weight', 'gain-muscle', 'get-shredded'],
    },
    problemAreas: [
      {
        type: String,
        enum: ['chest', 'arms', 'belly', 'legs', 'full-body'],
      }
    ],
    height: Number,
    heightUnit: {
      type: String,
      enum: ['metric', 'imperial'],
      default: 'metric',
    },
    completedAt: Date,
  },
  stripeCustomerId: { type: String, unique: true, sparse: true },
  stripeSubscriptionId: { type: String, unique: true, sparse: true },
  subscriptionStatus: { type: String, default: 'inactive' },
  subscriptionCurrentPeriodEnd: Date,
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;




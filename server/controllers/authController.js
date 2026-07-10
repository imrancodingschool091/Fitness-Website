import User from '../models/User.js';
import Quiz from '../models/Quiz.js';
import jwt from 'jsonwebtoken';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const normalizeEmail = (email) => String(email || '').trim().toLowerCase();
const createToken = (user) => {
  const secret = process.env.JWT_SECRET || 'madmuscles_fallback_secret_12345';
  return jwt.sign({ id: user._id }, secret, { expiresIn: '30d' });
};

export const signUp = async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    if (!emailPattern.test(email)) return res.status(400).json({ message: 'Enter a valid email address.' });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ message: 'An account with this email already exists. Please sign in.' });

    const user = await User.create({ email });
    const quizSessionId = req.body.quizSessionId;
    if (quizSessionId) {
      const quiz = await Quiz.findOne({ sessionId: quizSessionId, linked: false });
      if (quiz) {
        user.quizAnswers = {
          gender: quiz.gender,
          bodyType: quiz.bodyType,
          goal: quiz.goal,
          problemAreas: quiz.problemAreas,
          height: quiz.height,
          heightUnit: quiz.heightUnit,
          completedAt: new Date(),
        };
        quiz.linked = true;
        quiz.linkedUserId = user._id;
        quiz.email = email;
        await quiz.save();
        await user.save();
      }
    }
    return res.status(201).json({ _id: user._id, email: user.email, token: createToken(user), isNewUser: true, quizAnswers: user.quizAnswers });
  } catch (error) {
    console.error('Sign Up Error:', error);
    return res.status(500).json({ message: 'Server error during sign up' });
  }
};

export const signIn = async (req, res) => {
  try {
    const { quizSessionId } = req.body;
    const email = normalizeEmail(req.body.email);
    if (!emailPattern.test(email)) return res.status(400).json({ message: 'Enter a valid email address.' });

    let user = await User.findOne({ email });
    let isNewUser = false;
    if (!user) {
      user = await User.create({ email });
      isNewUser = true;
    }

    if (quizSessionId) {
      const quiz = await Quiz.findOne({ sessionId: quizSessionId, linked: false });
      if (quiz) {
        user.quizAnswers = {
          gender: quiz.gender,
          bodyType: quiz.bodyType,
          goal: quiz.goal,
          problemAreas: quiz.problemAreas,
          height: quiz.height,
          heightUnit: quiz.heightUnit,
          completedAt: new Date(),
        };
        quiz.linked = true;
        quiz.linkedUserId = user._id;
        quiz.email = email;
        await quiz.save();
        await user.save();
      }
    }

    return res.status(200).json({
      _id: user._id,
      email: user.email,
      token: createToken(user),
      isNewUser,
      quizAnswers: user.quizAnswers,
    });
  } catch (error) {
    console.error('Sign In Error:', error);
    return res.status(500).json({ message: 'Server error during sign in' });
  }
};


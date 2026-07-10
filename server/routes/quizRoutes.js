import express from 'express';
import * as quizController from '../controllers/quizController.js';

const router = express.Router();

// Submit quiz answers
router.post('/submit', quizController.submitQuiz);

// Get user's quiz results
router.get('/:userId/results', quizController.getQuizResults);

export default router;


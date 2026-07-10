import User from '../models/User.js';
import Quiz from '../models/Quiz.js';

// Validation helper
const validateQuizAnswers = (answers) => {
  const required = ['gender', 'bodyType', 'goal', 'problemAreas', 'height'];
  const errors = [];

  // Check all required fields exist
  for (const field of required) {
    if (!answers[field]) {
      errors.push(`${field} is required`);
    }
  }

  // Validate gender
  if (answers.gender && !['male', 'female'].includes(answers.gender)) {
    errors.push('Invalid gender value');
  }

  // Validate body type
  if (answers.bodyType && !['slim', 'average', 'big', 'heavy'].includes(answers.bodyType)) {
    errors.push('Invalid body type');
  }

  // Validate goal
  if (answers.goal && !['lose-weight', 'gain-muscle', 'get-shredded'].includes(answers.goal)) {
    errors.push('Invalid goal');
  }

  // Validate problem areas (array)
  if (answers.problemAreas) {
    if (!Array.isArray(answers.problemAreas) || answers.problemAreas.length === 0) {
      errors.push('At least one problem area is required');
    }
  }

  // Validate height
  if (answers.height) {
    if (typeof answers.height !== 'number' || answers.height <= 0) {
      errors.push('Height must be a positive number');
    }
  }

  return errors;
};

// Submit quiz answers - Save directly to quiz collection
export const submitQuiz = async (req, res) => {
  try {
    const { answers, sessionId, email } = req.body;

    if (!answers) {
      return res.status(400).json({ success: false, message: 'Quiz answers are required' });
    }

    // Validate quiz answers
    const validationErrors = validateQuizAnswers(answers);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    // Create quiz record
    const quiz = await Quiz.create({
      email: email || null,
      sessionId: sessionId || `session_${Date.now()}`,
      gender: answers.gender,
      bodyType: answers.bodyType,
      goal: answers.goal,
      problemAreas: answers.problemAreas || [],
      height: answers.height,
      heightUnit: answers.heightUnit || 'cm',
      linked: false,
    });

    res.json({
      success: true,
      message: 'Quiz submitted successfully',
      data: {
        quizId: quiz._id,
        sessionId: quiz.sessionId,
      }
    });
  } catch (error) {
    console.error('Quiz submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting quiz',
      error: error.message
    });
  }
};

// Get user's quiz results
export const getQuizResults = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (!user.quizAnswers) {
      return res.status(404).json({ success: false, message: 'No quiz results found' });
    }

    res.json({
      success: true,
      data: user.quizAnswers
    });
  } catch (error) {
    console.error('Error fetching quiz results:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching quiz results',
      error: error.message
    });
  }
};

import jwt from 'jsonwebtoken';

export const requireAuth = (req, res, next) => {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');
  if (!token) return res.status(401).json({ message: 'Authentication is required' });

  try {
    const secret = process.env.JWT_SECRET || 'madmuscles_fallback_secret_12345';
    req.userId = jwt.verify(token, secret).id;
    next();
  } catch {
    return res.status(401).json({ message: 'Your session has expired. Please sign in again.' });
  }
};


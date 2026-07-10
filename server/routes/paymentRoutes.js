import express from 'express';
import { createCheckoutSession, createPortalSession, getSubscriptionStatus, verifyCheckoutSession } from '../controllers/paymentController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/subscription-status', requireAuth, getSubscriptionStatus);
router.post('/create-checkout-session', requireAuth, createCheckoutSession);
router.post('/verify-checkout-session', requireAuth, verifyCheckoutSession);
router.post('/create-portal-session', requireAuth, createPortalSession);
export default router;

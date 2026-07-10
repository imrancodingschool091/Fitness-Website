import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import { stripeWebhook } from "./controllers/paymentController.js";

dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.post('/api/payments/webhook', express.raw({ type: 'application/json' }), stripeWebhook);
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/payments', paymentRoutes);

app.get('/', (req, res) => res.send('API is running...'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

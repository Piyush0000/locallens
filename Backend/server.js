// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import placeRoutes from './routes/placeRoutes.js';

// Load environment variables
dotenv.config();

// Connect to the database (Must be done before starting server logic)
connectDB();

const app = express();

// CORS Configuration
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Middleware to parse JSON bodies for incoming requests
app.use(express.json());

// ----------------------
// Routes
// ----------------------
// Health Check (Day 3 Goal, but useful for initial testing)
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Backend is running!' });
});

// Mount major route files
app.use('/api/auth', authRoutes);
app.use('/api/places', placeRoutes);
// Review routes will be added later

// Start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
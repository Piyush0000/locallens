// routes/authRoutes.js
import express from 'express';

const router = express.Router();

// POST /api/auth/register (Day 2 Implementation)
router.post('/register', (req, res) => {
  res.status(501).json({ message: 'Register API not implemented (Day 2 task).' });
});

// POST /api/auth/login (Day 2 Implementation)
router.post('/login', (req, res) => {
  res.status(501).json({ message: 'Login API not implemented (Day 2 task).' });
});

export default router;
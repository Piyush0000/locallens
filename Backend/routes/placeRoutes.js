// routes/placeRoutes.js
import express from 'express';

const router = express.Router();

// GET /api/places - Get all nearby places (Day 2 Implementation)
router.get('/', (req, res) => {
  res.status(501).json({ message: 'Get Places API not implemented (Day 2 task).' });
});

// POST /api/places/add - Add a new local place (Day 2 Implementation)
router.post('/add', (req, res) => {
  res.status(501).json({ message: 'Add Place API not implemented (Day 2 task).' });
});

export default router;
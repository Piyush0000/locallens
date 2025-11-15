// routes/placeRoutes.js
import express from 'express';
import Place from '../models/Place.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// GET /api/places - Get all nearby places
router.get('/', async (req, res) => {
  try {
    const { lat, lon, radius = 5000 } = req.query; // radius in meters

    let query = {};

    // If lat/lon provided, find places within radius
    if (lat && lon) {
      query.location = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lon), parseFloat(lat)]
          },
          $maxDistance: parseInt(radius)
        }
      };
    }

    const places = await Place.find(query)
      .populate('addedBy', 'name avatar')
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(places);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST /api/places/add - Add a new local place (protected route)
router.post('/add', protect, async (req, res) => {
  try {
    const { name, description, type, location, imageUrl, tags } = req.body;

    // Validation
    if (!name || !description || !location || !location.lat || !location.lon) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const place = await Place.create({
      name,
      description,
      type: type || 'other',
      location: {
        lat: location.lat,
        lon: location.lon
      },
      addedBy: req.user._id,
      imageUrl: imageUrl || '',
      tags: tags || []
    });

    const populatedPlace = await Place.findById(place._id).populate('addedBy', 'name avatar');

    res.status(201).json(populatedPlace);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/places/:id - Get single place
router.get('/:id', async (req, res) => {
  try {
    const place = await Place.findById(req.params.id).populate('addedBy', 'name avatar');

    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }

    res.json(place);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
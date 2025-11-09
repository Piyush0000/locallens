// models/Place.js
import mongoose from 'mongoose';

const PlaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, enum: ['cafe', 'art', 'park', 'hangout', 'other'], default: 'other' },
  location: {
    lat: { type: Number, required: true }, // Latitude
    lon: { type: Number, required: true }  // Longitude
  },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  imageUrl: { type: String },
  tags: [String],
  rating: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

// Crucial for performance: 2dsphere index for fast geo-queries (Day 3 goal)
PlaceSchema.index({ location: '2dsphere' }); 

const Place = mongoose.model('Place', PlaceSchema);
export default Place;
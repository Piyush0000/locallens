import { useState, useEffect } from "react";
import { MapPin, Star, X, Filter, Navigation, Sparkles, Heart, Share2, Plus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Slider } from "./ui/slider";
import { featuredPlaces, categories } from "../data/mockData";
import { delhiPlaces, DELHI_CENTER, DELHI_ZOOM } from "../data/delhiPlaces";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { placesAPI } from "../utils/api";
import { toast } from "sonner";

// Fix Leaflet default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icon
const createCustomIcon = (isActive) => new L.DivIcon({
  className: 'custom-marker',
  html: `<div class="${isActive ? 'marker-active' : 'marker-default'}">
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

// Component to handle map center
function MapUpdater({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);
  return null;
}

export default function MapPage({ selectedPlace, navigate, user }) {
  const [activePin, setActivePin] = useState(selectedPlace?.id || null);
  const [showFilters, setShowFilters] = useState(false);
  const [distance, setDistance] = useState([5]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [hiddenGemsOnly, setHiddenGemsOnly] = useState(false);
  const [mapCenter, setMapCenter] = useState(DELHI_CENTER);
  const [places, setPlaces] = useState(delhiPlaces);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Try to get user's location, but default to Delhi
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLon = position.coords.longitude;
          // Check if user is near Delhi (within 50km)
          const distanceFromDelhi = Math.sqrt(
            Math.pow(userLat - DELHI_CENTER[0], 2) + 
            Math.pow(userLon - DELHI_CENTER[1], 2)
          ) * 111; // Convert to km
          
          if (distanceFromDelhi < 50) {
            setMapCenter([userLat, userLon]);
            toast.success('📍 Location detected! Showing places near you in Delhi');
          } else {
            toast.info('🗺️ Showing Delhi locations. You can explore places across the city!');
          }
        },
        (error) => {
          console.log('Geolocation error:', error);
          toast.info('🗺️ Showing Delhi locations. Enable location for personalized results!');
        }
      );
    }
  }, []);

  const selectedPlaceData = activePin 
    ? places.find(p => p.id === activePin) 
    : null;

  return (
    <div className="fixed inset-0 pt-24 md:pt-32">
      <div className="relative h-full">
        {/* Filters Sidebar */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              className="absolute left-4 top-4 bottom-4 w-80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg rounded-2xl shadow-2xl z-40 p-6 overflow-y-auto hidden md:block"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-gray-900 dark:text-white">Filters</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowFilters(false)}
                  className="rounded-xl"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Distance Slider */}
              <div className="mb-6">
                <label className="text-purple-100 mb-3 block font-semibold">
                  Distance: {distance[0]} km
                </label>
                <Slider
                  value={distance}
                  onValueChange={setDistance}
                  max={15}
                  min={1}
                  step={1}
                  className="mb-4"
                />
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="text-purple-100 mb-3 block font-semibold">
                  Category
                </label>
                <div className="space-y-3">
                  {categories.slice(0, 4).map((category) => (
                    <div key={category.id} className="flex items-center gap-3">
                      <Checkbox
                        id={category.id}
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedCategories([...selectedCategories, category.id]);
                          } else {
                            setSelectedCategories(selectedCategories.filter(c => c !== category.id));
                          }
                        }}
                      />
                      <label htmlFor={category.id} className="text-cyan-200 cursor-pointer flex items-center gap-2">
                        <span>{category.emoji}</span>
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hidden Gems Toggle */}
              <div className="mb-6">
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="hidden-gems"
                    checked={hiddenGemsOnly}
                    onCheckedChange={(checked) => setHiddenGemsOnly(checked)}
                  />
                  <label htmlFor="hidden-gems" className="text-cyan-200 cursor-pointer">
                    Hidden Gems Only ✨
                  </label>
                </div>
              </div>

              {/* Popularity */}
              <div className="mb-6">
                <label className="text-purple-100 mb-3 block font-semibold">
                  Sort by
                </label>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    Popularity
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Distance
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Rating
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Map Container */}
        <div className="h-full relative overflow-hidden rounded-2xl">
          <MapContainer 
            center={mapCenter} 
            zoom={DELHI_ZOOM} 
            style={{ height: '100%', width: '100%' }}
            className="z-10 rounded-2xl overflow-hidden"
          >
            {/* Dark theme tiles */}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            
            <MapUpdater center={mapCenter} />
            
            {/* Place Markers */}
            {places.map((place, index) => {
              const lat = place.lat;
              const lon = place.lon;
              
              return (
                <Marker
                  key={place.id}
                  position={[lat, lon]}
                  icon={createCustomIcon(activePin === place.id)}
                  eventHandlers={{
                    click: () => setActivePin(place.id),
                  }}
                >
                  <Popup className="custom-popup">
                    <div className="p-2">
                      <h4 className="font-bold text-gray-900 mb-1">{place.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span>{place.rating}</span>
                        <span>•</span>
                        <span>{place.distance}</span>
                      </div>
                      <p className="text-sm text-gray-600">{place.description}</p>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>

        {/* Filter Button */}
        <Button
          onClick={() => setShowFilters(!showFilters)}
          className="absolute top-4 left-4 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg text-gray-900 dark:text-white hover:bg-white dark:hover:bg-slate-900 shadow-xl rounded-2xl"
        >
          <Filter className="w-5 h-5 mr-2" />
          Filters
        </Button>

        {/* Floating AI Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/chat')}
          className="absolute bottom-6 right-6 z-30 bg-gradient-to-br from-green-500 to-blue-500 text-white p-4 rounded-2xl shadow-2xl hover:shadow-green-500/50 transition-all"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6" />
            <span className="hidden md:inline">Talk to LocalLens AI</span>
          </div>
        </motion.button>

        {/* Place Detail Card */}
        <AnimatePresence>
          {selectedPlaceData && (
            <motion.div
              initial={{ y: 400, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 400, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] md:w-[500px]"
            >
              <Card className="overflow-hidden shadow-2xl border-0 bg-white dark:bg-slate-900">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setActivePin(null)}
                  className="absolute top-3 right-3 z-10 bg-white/90 dark:bg-slate-900/90 rounded-xl"
                >
                  <X className="w-5 h-5" />
                </Button>

                <div className="relative h-64">
                  <ImageWithFallback
                    src={selectedPlaceData.image}
                    alt={selectedPlaceData.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-white/90 dark:bg-slate-900/90 text-gray-900 dark:text-white border-0">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                      {selectedPlaceData.rating}
                    </Badge>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h2 className="text-purple-100 mb-1">
                        {selectedPlaceData.name}
                      </h2>
                      <div className="flex items-center gap-2 text-cyan-200">
                        <MapPin className="w-4 h-4" />
                        <span>{selectedPlaceData.distance} away</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-cyan-200 mb-4">
                    {selectedPlaceData.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedPlaceData.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-xl">
                      <Navigation className="w-4 h-4 mr-2" />
                      Get Directions
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-xl">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-xl">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
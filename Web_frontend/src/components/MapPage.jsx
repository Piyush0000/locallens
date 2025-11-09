import { useState } from "react";
import { MapPin, Star, X, Filter, Navigation, Sparkles, Heart, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Slider } from "./ui/slider";
import { featuredPlaces, categories } from "../data/mockData";
import { ImageWithFallback } from "./figma/ImageWithFallback";



export default function MapPage({ selectedPlace, navigate }) {
  const [activePin, setActivePin] = useState(selectedPlace?.id || null);
  const [showFilters, setShowFilters] = useState(false);
  const [distance, setDistance] = useState([2]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [hiddenGemsOnly, setHiddenGemsOnly] = useState(false);

  const selectedPlaceData = activePin 
    ? featuredPlaces.find(p => p.id === activePin) 
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
                <label className="text-gray-900 dark:text-white mb-3 block">
                  Distance: {distance[0]} miles
                </label>
                <Slider
                  value={distance}
                  onValueChange={setDistance}
                  max={10}
                  min={0.5}
                  step={0.5}
                  className="mb-4"
                />
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="text-gray-900 dark:text-white mb-3 block">
                  Type
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
                      <label htmlFor={category.id} className="text-gray-700 dark:text-gray-300 cursor-pointer flex items-center gap-2">
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
                  <label htmlFor="hidden-gems" className="text-gray-700 dark:text-gray-300 cursor-pointer">
                    Hidden Gems Only ✨
                  </label>
                </div>
              </div>

              {/* Popularity */}
              <div className="mb-6">
                <label className="text-gray-900 dark:text-white mb-3 block">
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
        <div className="h-full bg-gradient-to-br from-green-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden">
          {/* Simulated Map Background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(0deg, #cbd5e0 0px, #cbd5e0 1px, transparent 1px, transparent 40px),
                               repeating-linear-gradient(90deg, #cbd5e0 0px, #cbd5e0 1px, transparent 1px, transparent 40px)`
            }} />
          </div>

          {/* Map Pins */}
          {featuredPlaces.map((place, index) => {
            const positions = [
              { top: '25%', left: '30%' },
              { top: '40%', left: '55%' },
              { top: '60%', left: '35%' },
              { top: '35%', left: '70%' },
              { top: '70%', left: '50%' },
              { top: '45%', left: '25%' },
              { top: '55%', left: '65%' },
              { top: '30%', left: '45%' },
            ];

            return (
              <motion.div
                key={place.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1, type: "spring" }}
                className="absolute cursor-pointer group"
                style={positions[index]}
                onClick={() => setActivePin(place.id)}
              >
                <div className={`relative ${activePin === place.id ? 'z-30' : 'z-20'}`}>
                  {/* Pin */}
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all ${
                      activePin === place.id
                        ? 'bg-gradient-to-br from-green-500 to-blue-500 ring-4 ring-white dark:ring-slate-900'
                        : 'bg-gradient-to-br from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500'
                    }`}
                  >
                    <MapPin className="w-6 h-6 text-white fill-white" />
                  </motion.div>

                  {/* Pulse Animation */}
                  {activePin === place.id && (
                    <motion.div
                      initial={{ scale: 1, opacity: 0.5 }}
                      animate={{ scale: 2, opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-400 rounded-full"
                    />
                  )}

                  {/* Mini Card on Hover */}
                  {activePin !== place.id && (
                    <div className="absolute left-14 top-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <Card className="w-64 shadow-2xl border-0 overflow-hidden bg-white dark:bg-slate-800">
                        <div className="relative h-32">
                          <ImageWithFallback
                            src={place.image}
                            alt={place.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-3">
                          <h4 className="text-gray-900 dark:text-white mb-1">{place.name}</h4>
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span>{place.rating}</span>
                            <span>•</span>
                            <span>{place.distance}</span>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 mt-2">{place.description}</p>
                        </div>
                      </Card>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
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
                      <h2 className="text-gray-900 dark:text-white mb-1">
                        {selectedPlaceData.name}
                      </h2>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <MapPin className="w-4 h-4" />
                        <span>{selectedPlaceData.distance} away</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 mb-4">
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

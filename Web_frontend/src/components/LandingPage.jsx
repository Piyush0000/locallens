import { useState } from "react";
import { Search, MapPin, Star, ChevronRight, Sparkles, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { featuredPlaces, categories } from "../data/mockData";

export default function LandingPage({ setSelectedPlace, navigate }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handlePlaceClick = (place) => {
    if (setSelectedPlace) {
      setSelectedPlace(place);
    }
    navigate('/map');
  };

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-24 md:pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-4">
            <Badge className="badge-primary text-white border-0 px-6 py-2 text-sm shadow-lg">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Discovery
            </Badge>
          </div>
          <h1 className="mb-4 text-4xl md:text-6xl font-bold text-gradient-primary">
            Discover Hidden Gems Around You 🌆
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Explore local cafes, art spaces, and community spots powered by AI recommendations and local insights
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Find places or experiences nearby..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-modern pl-12 pr-4 py-7 text-base rounded-2xl shadow-lg hover:shadow-xl transition-all"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          </div>

          {/* AI Ask Button */}
          <Button
            onClick={() => navigate('/chat')}
            className="btn-primary text-white px-10 py-7 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all hover-lift"
          >
            <Sparkles className="w-6 h-6 mr-2" />
            Ask the AI
          </Button>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gradient-primary">Browse by Category</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/map')}
                className="card-gradient p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all group card-hover"
              >
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                  {category.emoji}
                </div>
                <div className="font-semibold text-gray-900 dark:text-white">{category.name}</div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Trending Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-7 h-7 text-gradient-primary" />
            <h2 className="text-2xl font-bold text-gradient-primary">Trending Nearby</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPlaces.slice(0, 3).map((place, index) => (
              <motion.div
                key={place.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -8 }}
              >
                <Card
                  onClick={() => handlePlaceClick(place)}
                  className="overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer group card-gradient card-hover border-0"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={place.image}
                      alt={place.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className="badge-primary text-white border-0 shadow-lg">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                        {place.rating}
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white">{place.name}</h3>
                      <Badge variant="secondary" className="ml-2 badge-secondary text-white">
                        <MapPin className="w-3 h-3 mr-1" />
                        {place.distance}
                      </Badge>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">{place.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {place.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs hover:bg-gradient-to-r hover:from-cyan-100 hover:to-blue-100 dark:hover:from-cyan-900/30 dark:hover:to-blue-900/30 transition-all">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Featured Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gradient-primary mb-6">Nearby Discoveries</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPlaces.slice(3, 7).map((place, index) => (
              <motion.div
                key={place.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.03 }}
              >
                <Card
                  onClick={() => handlePlaceClick(place)}
                  className="overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer card-gradient card-hover border-0"
                >
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={place.image}
                      alt={place.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{place.name}</h4>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{place.rating}</span>
                      </div>
                      <span className="text-gray-400">•</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{place.distance}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <Button
            onClick={() => navigate('/map')}
            size="lg"
            className="btn-primary text-white px-12 py-7 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all hover-lift"
          >
            Start Exploring
            <ChevronRight className="w-6 h-6 ml-2" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
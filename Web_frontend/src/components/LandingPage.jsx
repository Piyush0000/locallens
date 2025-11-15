import { useState } from "react";
import { Search, MapPin, Star, ChevronRight, Sparkles, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { featuredPlaces, categories } from "../data/mockData";
import { delhiPlaces } from "../data/delhiPlaces";

export default function LandingPage({ setSelectedPlace, navigate }) {
  const [searchQuery, setSearchQuery] = useState("");
  const displayPlaces = delhiPlaces.slice(0, 8); // Show first 8 Delhi places

  const handlePlaceClick = (place) => {
    if (setSelectedPlace) {
      setSelectedPlace(place);
    }
    navigate('/map');
  };

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-24 md:pb-16 px-4 relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 8 + 4 + 'px',
              height: Math.random() * 8 + 4 + 'px',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: [
                'linear-gradient(135deg, #10b981, #06b6d4)',
                'linear-gradient(135deg, #8b5cf6, #ec4899)',
                'linear-gradient(135deg, #f59e0b, #ec4899)',
                'linear-gradient(135deg, #06b6d4, #8b5cf6)',
              ][Math.floor(Math.random() * 4)]
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 30 - 15, 0],
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-4">
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 2, 0, -2, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Badge className="badge-primary text-white border-0 px-6 py-2 text-sm shadow-lg">
                <Sparkles className="w-4 h-4 mr-2" />
                AI-Powered Discovery
              </Badge>
            </motion.div>
          </div>
          <motion.h1 
            className="mb-4 text-4xl md:text-6xl font-bold text-gradient-primary neon-glow"
            animate={{ 
              textShadow: [
                "0 0 20px rgba(139, 92, 246, 0.5), 0 0 40px rgba(16, 185, 129, 0.3)",
                "0 0 40px rgba(139, 92, 246, 0.8), 0 0 60px rgba(236, 72, 153, 0.5), 0 0 80px rgba(16, 185, 129, 0.4)",
                "0 0 20px rgba(139, 92, 246, 0.5), 0 0 40px rgba(16, 185, 129, 0.3)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Discover Hidden Gems in Delhi 🏞️
          </motion.h1>
          <motion.p 
            className="text-cyan-200 text-lg max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Explore Delhi's best cafes, art spaces, monuments, and hidden spots powered by AI recommendations
          </motion.p>

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
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ y: { duration: 3, repeat: Infinity } }}
          >
            <Button
              onClick={() => navigate('/chat')}
              className="btn-primary text-white px-10 py-7 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all hover-lift relative overflow-hidden"
            >
              <Sparkles className="w-6 h-6 mr-2" />
              Ask the AI
            </Button>
          </motion.div>
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
                whileHover={{ 
                  scale: 1.1, 
                  y: -10,
                  rotate: [0, -5, 5, 0],
                  boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/map')}
                className="card-gradient card-3d p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all group card-hover"
              >
                <motion.div 
                  className="text-5xl mb-3 group-hover:scale-125 transition-transform"
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: index * 0.2 }}
                >
                  {category.emoji}
                </motion.div>
                <div className="font-semibold text-purple-100">{category.name}</div>
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
            {displayPlaces.slice(0, 3).map((place, index) => (
              <motion.div
                key={place.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -8 }}
              >
                <Card
                  onClick={() => handlePlaceClick(place)}
                  className="overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer group card-gradient card-hover card-3d border-0 ripple-effect"
                >
                  <div className="relative h-48 overflow-hidden">
                    <motion.img
                      src={place.image}
                      alt={place.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.2, rotate: 2 }}
                      transition={{ duration: 0.5 }}
                    />
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className="badge-primary text-white border-0 shadow-lg">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                        {place.rating}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-lg text-purple-100">{place.name}</h3>
                      <Badge variant="secondary" className="ml-2 badge-secondary text-white">
                        <MapPin className="w-3 h-3 mr-1" />
                        {place.distance}
                      </Badge>
                    </div>
                    <p className="text-cyan-200 mb-3">{place.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {place.tags.map((tag) => (
                        <motion.div
                          key={tag}
                          whileHover={{ scale: 1.1, y: -2 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Badge variant="outline" className="text-xs bg-purple-500/20 border-purple-400/50 text-purple-200 hover:bg-purple-500/40 transition-all">
                            #{tag}
                          </Badge>
                        </motion.div>
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
          <h2 className="text-2xl font-bold text-gradient-primary mb-6">More Delhi Discoveries</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayPlaces.slice(3, 7).map((place, index) => (
              <motion.div
                key={place.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.03 }}
              >
                <Card
                  onClick={() => handlePlaceClick(place)}
                  className="overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer card-gradient card-hover card-3d border-0 ripple-effect group"
                >
                  <div className="relative h-32 overflow-hidden">
                    <motion.img
                      src={place.image}
                      alt={place.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.15, rotate: 1 }}
                      transition={{ duration: 0.4 }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-purple-900/70 via-transparent to-transparent"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-purple-100 mb-1">{place.name}</h4>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="text-sm text-cyan-200">{place.rating}</span>
                      </div>
                      <span className="text-purple-400">•</span>
                      <span className="text-sm text-cyan-200">{place.distance}</span>
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
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{ 
              boxShadow: [
                "0 0 30px rgba(139, 92, 246, 0.4)",
                "0 0 50px rgba(16, 185, 129, 0.6)",
                "0 0 30px rgba(139, 92, 246, 0.4)"
              ]
            }}
            transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
          >
            <Button
              onClick={() => navigate('/map')}
              size="lg"
              className="btn-primary text-white px-12 py-7 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all hover-lift"
            >
              Start Exploring Delhi
              <ChevronRight className="w-6 h-6 ml-2" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
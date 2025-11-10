import { useState } from "react";
import { Search, MapPin, Star, ChevronRight, Sparkles, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { featuredPlaces, categories } from "../data/mockData";
import { ImageWithFallback } from "./figma/ImageWithFallback";



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



            <Badge className="bg-gradient-to-r from-green-400 to-blue-500 text-white border-0 px-4 py-1.5">



              <Sparkles className="w-3 h-3 mr-1" />



              AI-Powered Discovery



            </Badge>



          </div>



          <h1 className="mb-4 bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent">



            Discover Hidden Gems Around You 🌆



          </h1>



          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">



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



                className="pl-12 pr-4 py-6 rounded-2xl border-2 border-gray-200 dark:border-gray-700 focus:border-green-400 dark:focus:border-green-400 transition-all shadow-lg"



              />



              <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />



            </div>



          </div>







          {/* AI Ask Button */}



          <Button



            onClick={() => navigate('/chat')}



            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all"



          >



            <Sparkles className="w-5 h-5 mr-2" />



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



            <h2 className="text-gray-900 dark:text-white">Browse by Category</h2>



          </div>



          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">



            {categories.map((category, index) => (



              <motion.button



                key={category.id}



                initial={{ opacity: 0, scale: 0.9 }}



                animate={{ opacity: 1, scale: 1 }}



                transition={{ delay: 0.1 * index }}



                whileHover={{ scale: 1.05 }}



                whileTap={{ scale: 0.95 }}



                onClick={() => navigate('/map')}



                className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700 group"



              >



                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">



                  {category.emoji}



                </div>



                <div className="text-gray-900 dark:text-white">{category.name}</div>



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



          <div className="flex items-center gap-2 mb-6">



            <TrendingUp className="w-6 h-6 text-green-500" />



            <h2 className="text-gray-900 dark:text-white">Trending Nearby</h2>



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



                  className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all cursor-pointer group bg-white dark:bg-slate-800"



                >



                  <div className="relative h-48 overflow-hidden">



                    <ImageWithFallback



                      src={place.image}



                      alt={place.name}



                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"



                    />



                    <div className="absolute top-3 right-3">



                      <Badge className="bg-white/90 dark:bg-slate-900/90 text-gray-900 dark:text-white border-0">



                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />



                        {place.rating}



                      </Badge>



                    </div>



                  </div>



                  <div className="p-5">



                    <div className="flex items-start justify-between mb-2">



                      <h3 className="text-gray-900 dark:text-white">{place.name}</h3>



                      <Badge variant="secondary" className="ml-2">



                        <MapPin className="w-3 h-3 mr-1" />



                        {place.distance}



                      </Badge>



                    </div>



                    <p className="text-gray-600 dark:text-gray-400 mb-3">{place.description}</p>



                    <div className="flex flex-wrap gap-2">



                      {place.tags.map((tag) => (



                        <Badge key={tag} variant="outline" className="text-xs">



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



          <h2 className="text-gray-900 dark:text-white mb-6">Nearby Discoveries</h2>



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



                  className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer bg-white dark:bg-slate-800"



                >



                  <div className="relative h-32 overflow-hidden">



                    <ImageWithFallback



                      src={place.image}



                      alt={place.name}



                      className="w-full h-full object-cover"



                    />



                  </div>



                  <div className="p-4">



                    <h4 className="text-gray-900 dark:text-white mb-1">{place.name}</h4>



                    <div className="flex items-center gap-2">



                      <div className="flex items-center">



                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />



                        <span className="text-gray-600 dark:text-gray-400">{place.rating}</span>



                      </div>



                      <span className="text-gray-400">•</span>



                      <span className="text-gray-600 dark:text-gray-400">{place.distance}</span>



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



            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-10 py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all"



          >



            Start Exploring



            <ChevronRight className="w-5 h-5 ml-2" />



          </Button>



        </motion.div>



      </div>



    </div>



  );



}

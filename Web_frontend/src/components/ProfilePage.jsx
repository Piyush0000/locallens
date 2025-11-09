import { MapPin, Award, Heart, MessageSquare, Settings, Moon, Sun, Bell, Lock } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar } from "./ui/avatar";
import { Switch } from "./ui/switch";
import { featuredPlaces } from "../data/mockData";
import { ImageWithFallback } from "./figma/ImageWithFallback";



export default function ProfilePage({ darkMode, setDarkMode, navigate }) {
  const savedPlaces = featuredPlaces.slice(0, 6);

  const stats = [
    { icon: MapPin, label: "Spots Visited", value: "42" },
    { icon: Heart, label: "Reviews Given", value: "28" },
    { icon: Award, label: "Badges Earned", value: "15" },
  ];

  const badges = [
    { emoji: "🏆", name: "Explorer", description: "Visited 40+ places" },
    { emoji: "☕", name: "Coffee Lover", description: "15 cafe visits" },
    { emoji: "🎨", name: "Art Enthusiast", description: "10 gallery visits" },
    { emoji: "🌿", name: "Nature Seeker", description: "Explored 8 parks" },
  ];

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-24 md:pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-0 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-3xl" />
            
            <div className="relative p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <Avatar className="w-24 h-24 border-4 border-white dark:border-slate-900 shadow-lg">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=User"
                    alt="User"
                  />
                </Avatar>

                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-gray-900 dark:text-white mb-2">Alex Thompson</h1>
                  <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white border-0 mb-3">
                    Local Explorer Level 5
                  </Badge>
                  <p className="text-gray-600 dark:text-gray-300">
                    Passionate about discovering hidden gems and supporting local businesses 🌟
                  </p>
                </div>

                <Button
                  variant="outline"
                  className="rounded-xl"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-4 text-center"
                  >
                    <div className="flex items-center justify-center mb-2">
                      <stat.icon className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="text-gray-900 dark:text-white mb-1">{stat.value}</div>
                    <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-gray-900 dark:text-white mb-4">Badges Earned</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {badges.map((badge, index) => (
              <motion.div
                key={badge.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="p-4 text-center hover:shadow-lg transition-all cursor-pointer bg-white dark:bg-slate-800 border-0">
                  <div className="text-4xl mb-2">{badge.emoji}</div>
                  <h4 className="text-gray-900 dark:text-white mb-1">{badge.name}</h4>
                  <p className="text-gray-600 dark:text-gray-400">{badge.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Saved Places */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-900 dark:text-white">My Saved Places</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/map')}
              className="rounded-xl"
            >
              View All
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {savedPlaces.map((place, index) => (
              <motion.div
                key={place.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -4 }}
              >
                <Card
                  onClick={() => navigate('/map')}
                  className="overflow-hidden cursor-pointer hover:shadow-xl transition-all bg-white dark:bg-slate-800 border-0"
                >
                  <div className="relative h-32 overflow-hidden">
                    <ImageWithFallback
                      src={place.image}
                      alt={place.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3">
                    <h4 className="text-gray-900 dark:text-white mb-1">{place.name}</h4>
                    <p className="text-gray-600 dark:text-gray-400">{place.category}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-gray-900 dark:text-white mb-4">Settings</h2>
          <Card className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-slate-800 border-0 shadow-lg">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {darkMode ? (
                  <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                ) : (
                  <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                )}
                <div>
                  <h4 className="text-gray-900 dark:text-white">Dark Mode</h4>
                  <p className="text-gray-600 dark:text-gray-400">Toggle dark theme</p>
                </div>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <h4 className="text-gray-900 dark:text-white">Notifications</h4>
                  <p className="text-gray-600 dark:text-gray-400">Receive updates about new spots</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <h4 className="text-gray-900 dark:text-white">Privacy</h4>
                  <p className="text-gray-600 dark:text-gray-400">Control your data and visibility</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="rounded-xl">
                Manage
              </Button>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <h4 className="text-gray-900 dark:text-white">AI Preferences</h4>
                  <p className="text-gray-600 dark:text-gray-400">Customize AI recommendations</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="rounded-xl">
                Edit
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

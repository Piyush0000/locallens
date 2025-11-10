import { MapPin, Award, Heart, MessageSquare, Settings, Moon, Sun, Bell, Lock, Edit3, Camera } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar } from "./ui/avatar";
import { Switch } from "./ui/switch";
import { useState } from "react";

export default function ProfilePage({ darkMode, setDarkMode, navigate }) {
  const [userData, setUserData] = useState({
    name: "Alex Thompson",
    bio: "Passionate about discovering hidden gems and supporting local businesses 🌟",
    level: "Local Explorer Level 5",
    joinDate: "January 2024",
    location: "New Delhi, India"
  });

  const [savedPlaces, setSavedPlaces] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(userData);

  const stats = [
    { icon: MapPin, label: "Spots Visited", value: "0" },
    { icon: Heart, label: "Reviews Given", value: "0" },
    { icon: Award, label: "Badges Earned", value: "0" },
  ];

  const badges = [
    { emoji: "🌟", name: "New Explorer", description: "Just getting started" },
  ];

  const handleSaveProfile = () => {
    setUserData(editForm);
    setIsEditing(false);
  };

  const handleEditChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-24 md:pb-16 px-4 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-5xl mx-auto">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="bg-white dark:bg-slate-800 border-0 shadow-lg overflow-hidden">
            <div className="relative h-32 bg-gradient-to-r from-green-400 to-blue-500">
              {/* Cover Photo Area */}
              <div className="absolute bottom-4 right-4">
                <Button variant="secondary" size="sm" className="rounded-full bg-white/90 backdrop-blur-sm">
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="px-6 pb-6">
              <div className="flex flex-col md:flex-row items-start gap-6 -mt-16">
                {/* Profile Picture */}
                <div className="relative">
                  <Avatar className="w-32 h-32 border-4 border-white dark:border-slate-800 shadow-lg bg-white">
                    <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=User"
                      alt="User"
                      className="w-full h-full"
                    />
                  </Avatar>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="absolute bottom-2 right-2 rounded-full w-8 h-8 p-0 bg-white shadow-md border"
                  >
                    <Camera className="w-3 h-3" />
                  </Button>
                </div>

                {/* Profile Info */}
                <div className="flex-1 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mt-4 md:mt-0">
                  <div className="flex-1">
                    {isEditing ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) => handleEditChange('name', e.target.value)}
                          className="text-2xl font-bold bg-transparent border-b border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:border-green-500"
                        />
                        <textarea
                          value={editForm.bio}
                          onChange={(e) => handleEditChange('bio', e.target.value)}
                          className="w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-gray-600 dark:text-gray-300 focus:outline-none focus:border-green-500 resize-none"
                          rows="2"
                        />
                        <input
                          type="text"
                          value={editForm.location}
                          onChange={(e) => handleEditChange('location', e.target.value)}
                          className="bg-transparent border-b border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 focus:outline-none focus:border-green-500"
                          placeholder="Add your location"
                        />
                      </div>
                    ) : (
                      <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                          {userData.name}
                        </h1>
                        <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white border-0 mb-2">
                          {userData.level}
                        </Badge>
                        <p className="text-gray-600 dark:text-gray-300 mb-2">
                          {userData.bio}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <span>📍 {userData.location}</span>
                          <span>Joined {userData.joinDate}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {isEditing ? (
                      <>
                        <Button
                          variant="outline"
                          onClick={() => setIsEditing(false)}
                          className="rounded-xl"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleSaveProfile}
                          className="rounded-xl bg-green-500 hover:bg-green-600"
                        >
                          Save
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="outline"
                        onClick={() => {
                          setEditForm(userData);
                          setIsEditing(true);
                        }}
                        className="rounded-xl"
                      >
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-4 text-center border border-gray-200 dark:border-slate-600"
                  >
                    <div className="flex items-center justify-center mb-2">
                      <stat.icon className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
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
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Badges Earned</h2>
          {badges.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {badges.map((badge, index) => (
                <motion.div
                  key={badge.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="p-6 text-center hover:shadow-lg transition-all cursor-pointer bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600">
                    <div className="text-4xl mb-3">{badge.emoji}</div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{badge.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{badge.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center bg-white dark:bg-slate-800 border border-dashed border-gray-300 dark:border-slate-600">
              <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No Badges Yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Start exploring places to earn your first badge!
              </p>
              <Button onClick={() => navigate('/map')}>
                Start Exploring
              </Button>
            </Card>
          )}
        </motion.div>

        {/* Saved Places */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">My Saved Places</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/map')}
              className="rounded-xl"
            >
              View All
            </Button>
          </div>
          
          {savedPlaces.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {/* Saved places will be shown here when user saves them */}
            </div>
          ) : (
            <Card className="p-8 text-center bg-white dark:bg-slate-800 border border-dashed border-gray-300 dark:border-slate-600">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No Saved Places
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Save your favorite places to see them here
              </p>
              <Button onClick={() => navigate('/map')}>
                Explore Places
              </Button>
            </Card>
          )}
        </motion.div>

        {/* Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Settings</h2>
          <Card className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-slate-800 border-0 shadow-lg">
            {/* Dark Mode Toggle */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {darkMode ? (
                  <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                ) : (
                  <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                )}
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Dark Mode</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Toggle dark theme</p>
                </div>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>

            {/* Notifications */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Notifications</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Receive updates about new spots</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            {/* Privacy */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Privacy</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Control your data and visibility</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="rounded-xl">
                Manage
              </Button>
            </div>

            {/* AI Preferences */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">AI Preferences</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Customize AI recommendations</p>
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
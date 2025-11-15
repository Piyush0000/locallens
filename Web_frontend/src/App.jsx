import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import MapPage from "./components/MapPage";
import ChatPage from "./components/ChatPage";
import FeedPage from "./components/FeedPage";
import ProfilePage from "./components/ProfilePage";
import SignUpPage from "./components/SignUpPage";
import LoginPage from "./components/LoginPage";
import LoadingAnimation from "./components/LoadingAnimation";
import { Toaster } from "./components/ui/sonner";

function AppContent() {
  const [darkMode, setDarkMode] = useState(true);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    // Check if user is logged in (from localStorage)
    const savedUser = localStorage.getItem('localLensUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('localLensUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('localLensUser');
    }
  }, [user]);

  const handleSetUser = (userData) => {
    setUser(userData);
  };

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="min-h-screen animated-gradient-bg transition-all duration-700">
      {/* Navigation - Always visible */}
      <Navigation
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        navigate={navigate}
        user={user}
        setUser={setUser}
      />

      <div className="transition-opacity duration-300">
        <Routes>
          {/* All routes accessible - protection handled in components */}
          <Route path="/" element={<LandingPage setSelectedPlace={setSelectedPlace} navigate={navigate} user={user} />} />
          <Route path="/signup" element={<SignUpPage navigate={navigate} setUser={handleSetUser} />} />
          <Route path="/login" element={<LoginPage navigate={navigate} setUser={handleSetUser} />} />
          <Route path="/map" element={<MapPage selectedPlace={selectedPlace} navigate={navigate} user={user} />} />
          <Route path="/chat" element={<ChatPage navigate={navigate} user={user} />} />
          <Route path="/feed" element={<FeedPage navigate={navigate} user={user} />} />
          <Route path="/profile" element={<ProfilePage darkMode={darkMode} setDarkMode={setDarkMode} navigate={navigate} user={user} />} />
        </Routes>
      </div>

      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
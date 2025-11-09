import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import MapPage from "./components/MapPage";
import ChatPage from "./components/ChatPage";
import FeedPage from "./components/FeedPage";
import ProfilePage from "./components/ProfilePage";
import LoadingAnimation from "./components/LoadingAnimation";
import { Toaster } from "./components/ui/sonner";

function AppContent() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
      <Navigation
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        navigate={navigate}
      />

      <div className="transition-opacity duration-300">
        <Routes>
          <Route path="/" element={<LandingPage setSelectedPlace={setSelectedPlace} navigate={navigate} />} />
          <Route path="/map" element={<MapPage selectedPlace={selectedPlace} navigate={navigate} />} />
          <Route path="/chat" element={<ChatPage navigate={navigate} />} />
          <Route path="/feed" element={<FeedPage navigate={navigate} />} />
          <Route path="/profile" element={<ProfilePage darkMode={darkMode} setDarkMode={setDarkMode} navigate={navigate} />} />
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

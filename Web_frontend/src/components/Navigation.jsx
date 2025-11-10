import { Moon, Sun, Sparkles, Compass, Map, MessageSquare, Grid, User } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate, Link, useLocation } from "react-router-dom";

export default function Navigation({ darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const location = useLocation();

  const getActive = (path) => location.pathname === path;

  return (
    <>
      {/* Top Navigation - Desktop */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="glass nav-modern rounded-2xl shadow-xl px-4 md:px-6 py-3">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 group"
              >
                <div className="btn-primary p-2 rounded-xl group-hover:scale-110 transition-transform shadow-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="hidden md:block text-gradient-primary font-bold text-xl">LocalLens</span>
              </button>

              {/* Nav Links - Desktop */}
              <div className="hidden md:flex items-center gap-2">
                <NavLink 
                  active={getActive('/')} 
                  to="/"
                >
                  Explore
                </NavLink>
                <NavLink 
                  active={getActive('/map')} 
                  to="/map"
                >
                  Map
                </NavLink>
                <NavLink 
                  active={getActive('/chat')} 
                  to="/chat"
                >
                  AI Buddy
                </NavLink>
                <NavLink 
                  active={getActive('/feed')} 
                  to="/feed"
                >
                  Feed
                </NavLink>
                <NavLink 
                  active={getActive('/profile')} 
                  to="/profile"
                >
                  Profile
                </NavLink>
              </div>

              {/* Dark Mode Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDarkMode(!darkMode)}
                className="rounded-xl hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:text-white transition-all"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom Navigation - Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-4">
        <div className="glass nav-modern rounded-2xl shadow-2xl px-2 py-3">
          <div className="flex items-center justify-around">
            <MobileNavButton
              icon={Compass}
              label="Explore"
              active={getActive('/')}
              to="/"
            />
            <MobileNavButton
              icon={Map}
              label="Map"
              active={getActive('/map')}
              to="/map"
            />
            <MobileNavButton
              icon={MessageSquare}
              label="AI"
              active={getActive('/chat')}
              to="/chat"
            />
            <MobileNavButton
              icon={Grid}
              label="Feed"
              active={getActive('/feed')}
              to="/feed"
            />
            <MobileNavButton
              icon={User}
              label="Profile"
              active={getActive('/profile')}
              to="/profile"
            />
          </div>
        </div>
      </nav>
    </>
  );
}

function NavLink({ active, to, children }) {
  return (
    <Link
      to={to}
      className={`px-4 py-2 rounded-xl font-medium transition-all ${
        active
          ? 'btn-primary text-white shadow-lg scale-105'
          : 'hover:bg-gradient-to-r hover:from-cyan-100 hover:to-blue-100 dark:hover:from-cyan-900/30 dark:hover:to-blue-900/30'
      }`}
    >
      {children}
    </Link>
  );
}

function MobileNavButton({ 
  icon: Icon, 
  label, 
  active, 
  to 
}) {
  return (
    <Link
      to={to}
      className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all group"
    >
      <div className={`p-2 rounded-xl transition-all ${
        active
          ? 'btn-primary text-white scale-110 shadow-lg glow-primary'
          : 'text-gray-600 dark:text-gray-400 group-hover:bg-gradient-to-r group-hover:from-cyan-100 group-hover:to-blue-100 dark:group-hover:from-cyan-900/30 dark:group-hover:to-blue-900/30'
      }`}>
        <Icon className="w-5 h-5" />
      </div>
      <span className={`text-xs font-medium transition-all ${
        active
          ? 'text-gradient-primary font-semibold'
          : 'text-gray-600 dark:text-gray-400'
      }`}>
        {label}
      </span>
    </Link>
  );
}
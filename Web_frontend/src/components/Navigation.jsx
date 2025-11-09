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
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg rounded-2xl shadow-lg px-4 md:px-6 py-3 border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 group"
              >
                <div className="bg-gradient-to-br from-green-400 to-blue-500 p-2 rounded-xl group-hover:scale-110 transition-transform">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="hidden md:block">LocalLens</span>
              </button>

              {/* Nav Links - Desktop */}
              <div className="hidden md:flex items-center gap-1">
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
                className="rounded-xl"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom Navigation - Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-4">
        <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg rounded-2xl shadow-2xl px-2 py-3 border border-gray-200/50 dark:border-gray-700/50">
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
      className={`px-4 py-2 rounded-xl transition-all ${
        active
          ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white'
          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
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
          ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white scale-110'
          : 'text-gray-600 dark:text-gray-400 group-hover:bg-gray-100 dark:group-hover:bg-gray-800'
      }`}>
        <Icon className="w-5 h-5" />
      </div>
      <span className={`transition-all ${
        active
          ? 'text-green-600 dark:text-green-400'
          : 'text-gray-600 dark:text-gray-400'
      }`}>
        {label}
      </span>
    </Link>
  );
}

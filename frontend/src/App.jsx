import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Profile from "./components/Profile"
import "./App.css"

const Navigation = () => {
  const location = useLocation()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 nav-blur backdrop-blur-md border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 rounded-xl flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <div className="absolute inset-0 w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-800 rounded-xl blur-md opacity-50 -z-10"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
                TalentHub
              </span>
             
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { path: "/register", label: "Register" },
              { path: "/login", label: "Login" },
              { path: "/profile", label: "Profile" }
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg hover:scale-105 ${
                  location.pathname === item.path
                    ? "text-purple-300 bg-purple-500/10 shadow-lg"
                    : "text-white/70 hover:text-purple-300 hover:bg-purple-500/5"
                }`}
              >
                {item.label}
                {location.pathname === item.path && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg -z-10 blur-sm"></div>
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-white/80 hover:text-purple-300 transition-all duration-300 p-2 hover:bg-purple-500/10 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 overflow-x-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {/* Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          ></div>
          
          {/* Floating Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/15 to-indigo-600/15 rounded-full blur-3xl animate-float"></div>
          <div 
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-600/10 to-purple-600/10 rounded-full blur-3xl animate-float-delayed"
          ></div>
          <div 
            className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-r from-indigo-600/8 to-purple-600/8 rounded-full blur-3xl animate-float-slow"
          ></div>
          
          {/* Gradient Overlays */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/5 via-transparent to-indigo-900/5"></div>
        </div>

        <Navigation />
        
        <main className="relative z-10 pt-20">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </main>

        {/* Sparkle Effects */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-purple-400 rounded-full animate-sparkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
      </div>
    </Router>
  )
}

export default App
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Profile from "./components/Profile"

const Navigation = () => {
  const location = useLocation()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span className="text-xl font-bold text-gradient">RecruitPro</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/register"
              className={`text-sm font-medium transition-all duration-300 hover:text-green-400 ${
                location.pathname === "/register" ? "text-green-400" : "text-white/80"
              }`}
            >
              Register
            </Link>
            <Link
              to="/login"
              className={`text-sm font-medium transition-all duration-300 hover:text-green-400 ${
                location.pathname === "/login" ? "text-green-400" : "text-white/80"
              }`}
            >
              Login
            </Link>
            <Link
              to="/profile"
              className={`text-sm font-medium transition-all duration-300 hover:text-green-400 ${
                location.pathname === "/profile" ? "text-green-400" : "text-white/80"
              }`}
            >
              Profile
            </Link>
          </div>

          <div className="md:hidden">
            <button className="text-white/80 hover:text-white transition-colors">
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
      <div className="min-h-screen bg-black grid-pattern">
        <Navigation />
        <main className="pt-20">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </main>

        {/* Floating background elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-600/10 rounded-full blur-3xl animate-float"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>
      </div>
    </Router>
  )
}

export default App

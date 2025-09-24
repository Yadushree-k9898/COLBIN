"use client"

import { useEffect, useState } from "react"
import API from "../services/api"

export default function Profile() {
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/profile")
        setUser(res.data.data)
      } catch (err) {
        setMessage(err.response?.data?.message || "Error fetching profile")
      } finally {
        setIsLoading(false)
      }
    }
    fetchProfile()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.href = "/login"
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative">
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div className="neon-card rounded-3xl p-12 max-w-md animate-pulse-glow">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl animate-pulse"></div>
              <div className="absolute inset-0 w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl blur-md opacity-50"></div>
            </div>
            <div>
              <div className="flex items-center space-x-3">
                <div className="spinner"></div>
                <span className="text-white/80 text-lg">Loading your profile...</span>
              </div>
              <p className="text-purple-400 text-sm mt-2">Please wait a moment</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-6 py-12 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-600/8 to-indigo-600/8 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-indigo-600/6 to-purple-600/6 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-pink-600/4 to-purple-600/4 rounded-full blur-3xl animate-float-slow"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {user ? (
          <div className="animate-slide-up">
            {/* Header Section */}
            <div className="text-center mb-16">
              <h1 className="text-6xl font-bold text-gradient mb-4">Your Profile</h1>
              <p className="text-xl text-white/60">
                Manage your <span className="text-gradient-purple font-semibold">TalentHub</span> account and
                preferences
              </p>
            </div>

            {/* Main Profile Card */}
            <div className="neon-card rounded-3xl p-12 shadow-2xl mb-12 backdrop-blur-xl">
              <div className="flex items-start justify-between mb-12">
                <div className="flex items-center space-x-8">
                  {/* Profile Avatar */}
                  <div className="relative">
                    <div className="profile-avatar w-32 h-32 rounded-3xl flex items-center justify-center text-4xl font-bold text-white shadow-2xl">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="absolute inset-0 w-32 h-32 profile-avatar rounded-3xl blur-lg opacity-50 -z-10"></div>
                    {/* Status Indicator */}
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-slate-950 flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </div>

                  {/* User Info */}
                  <div>
                    <h2 className="text-4xl font-bold text-white mb-2">{user.name}</h2>
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="px-4 py-2 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-full border border-green-500/30">
                        <span className="text-green-300 font-semibold text-sm">Verified</span>
                      </div>
                    </div>
                    <p className="text-white/60 text-lg mb-1">
                      Email: <span className="text-purple-400 font-semibold">{user.email}</span>
                    </p>
                    {user.username && (
                      <p className="text-white/60 text-lg mb-1">
                        Username: <span className="text-purple-400 font-semibold">{user.username}</span>
                      </p>
                    )}
                    <p className="text-white/60 text-lg">
                      Member since{" "}
                      <span className="text-purple-400 font-semibold">
                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Sign Out Button */}
                <button
                  onClick={handleLogout}
                  className="btn-secondary px-6 py-3 hover:bg-red-600/20 hover:border-red-500/50 hover:text-red-300 transition-all duration-300"
                >
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span>Sign Out</span>
                  </div>
                </button>
              </div>

              {/* Profile Details Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Additional Details */}
                {user.bio && (
                  <div>
                    <h3 className="text-xl text-white/70 mb-2">Bio</h3>
                    <p className="text-white/60">{user.bio}</p>
                  </div>
                )}
                {user.contact && (
                  <div>
                    <h3 className="text-xl text-white/70 mb-2">Contact</h3>
                    <p className="text-white/60">{user.contact}</p>
                  </div>
                )}
                {/* Add more fields as needed */}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="neon-card rounded-3xl p-12 max-w-md mx-auto">
              <div className="text-red-400 text-xl mb-4">⚠️ Error</div>
              <p className="text-white/80 text-lg">{message}</p>
              <button onClick={() => window.location.reload()} className="btn-primary mt-6 px-6 py-3">
                Try Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

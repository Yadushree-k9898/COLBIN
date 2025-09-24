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
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-effect rounded-2xl p-8">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 border-4 border-green-600/30 border-t-green-600 rounded-full animate-spin"></div>
            <span className="text-white/80">Loading your profile...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {user ? (
          <div className="animate-slide-in">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gradient mb-2">Your Profile</h1>
              <p className="text-white/60 text-lg">Manage your RecruitPro account</p>
            </div>

            {/* Profile Card */}
            <div className="glass-effect rounded-2xl p-8 shadow-2xl mb-8">
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center text-2xl font-bold text-white animate-pulse-glow">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">{user.name}</h2>
                    <p className="text-green-400 font-medium">Active Member</p>
                    <p className="text-white/60 text-sm">
                      Member since{" "}
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <button onClick={handleLogout} className="btn-secondary text-sm px-4 py-2">
                  Sign Out
                </button>
              </div>

              {/* Profile Details Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white">User ID</h3>
                  </div>
                  <p className="text-white/80 font-mono text-sm bg-black/30 rounded-lg p-3">{user._id}</p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white">Email Address</h3>
                  </div>
                  <p className="text-white/80">{user.email}</p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white">Account Created</h3>
                  </div>
                  <p className="text-white/80">{new Date(user.createdAt).toLocaleString()}</p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-orange-600/20 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white">Account Status</h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 font-medium">Active & Verified</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="glass-effect rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300 cursor-pointer">
                <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Edit Profile</h3>
                <p className="text-white/60 text-sm">Update your personal information</p>
              </div>

              <div className="glass-effect rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300 cursor-pointer">
                <div className="w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Security</h3>
                <p className="text-white/60 text-sm">Manage password and security settings</p>
              </div>

              <div className="glass-effect rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300 cursor-pointer">
                <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Preferences</h3>
                <p className="text-white/60 text-sm">Customize your experience</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center animate-slide-in">
            <div className="glass-effect rounded-2xl p-12 max-w-md mx-auto">
              <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Profile Not Found</h2>
              <p className="text-red-400 mb-6">{message}</p>
              <a href="/login" className="btn-primary inline-block">
                Sign In Again
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

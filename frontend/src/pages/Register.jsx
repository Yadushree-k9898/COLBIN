"use client"

import { useState } from "react"
import API from "../services/api"
import { Link } from "react-router-dom"

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await API.post("/register", form)
      localStorage.setItem("token", res.data.data.token)
      setMessage("Registration Successful! Welcome aboard! 🎉")
    } catch (error) {
      setMessage(error.response?.data?.message || "Error registering")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 right-16 w-36 h-36 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-16 left-16 w-44 h-44 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 rounded-full blur-2xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-gradient-to-r from-pink-600/5 to-purple-600/5 rounded-full blur-2xl animate-float-slow"></div>
      </div>

      <div className="w-full max-w-lg animate-slide-up relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 rounded-3xl shadow-2xl mb-6 animate-pulse-glow">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold text-gradient mb-4">
            Join TalentHub
          </h1>
          <p className="text-xl text-white/60">
            Create your account and start your <span className="text-gradient-purple font-semibold">AI-powered</span> journey
          </p>
        </div>

        {/* Registration Card */}
        <div className="neon-card rounded-3xl p-10 shadow-2xl backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Form Fields */}
            <div className="space-y-6">
              <div className="group">
                <label className="block text-sm font-semibold text-white/90 mb-3 group-focus-within:text-purple-300 transition-colors">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-purple-400/60 group-focus-within:text-purple-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    name="name"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={handleChange}
                    className="form-input w-full pl-12"
                    required
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-white/90 mb-3 group-focus-within:text-purple-300 transition-colors">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-purple-400/60 group-focus-within:text-purple-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={form.email}
                    onChange={handleChange}
                    className="form-input w-full pl-12"
                    required
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-white/90 mb-3 group-focus-within:text-purple-300 transition-colors">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-purple-400/60 group-focus-within:text-purple-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    name="password"
                    type="password"
                    placeholder="Create a strong password"
                    value={form.password}
                    onChange={handleChange}
                    className="form-input w-full pl-12"
                    required
                  />
                </div>
              </div>
            </div>



            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-3">
                  <div className="spinner"></div>
                  <span>Creating your account...</span>
                </div>
              ) : (
                <span className="flex items-center justify-center space-x-2">
                  <span>Create Account</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </span>
              )}
            </button>
          </form>

          {/* Message Display */}
          {message && (
            <div className={`mt-8 p-4 rounded-2xl text-center font-medium animate-fade-in ${
              message.includes("Successful")
                ? "bg-gradient-to-r from-green-600/20 to-emerald-600/20 text-green-400 border border-green-600/30"
                : "bg-gradient-to-r from-red-600/20 to-rose-600/20 text-red-400 border border-red-600/30"
            }`}>
              {message}
            </div>
          )}

          {/* Login Link */}
          <div className="mt-10 text-center">
            <p className="text-white/60 mb-4">
              Already have an account?
            </p>
            <Link 
              to="/login" 
              className="inline-flex items-center space-x-2 text-purple-400 hover:text-purple-300 font-semibold transition-all duration-300 hover:underline decoration-2 underline-offset-4"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <span>Sign in to your account</span>
            </Link>
          </div>
        </div>

  
      </div>
    </div>
  )
}
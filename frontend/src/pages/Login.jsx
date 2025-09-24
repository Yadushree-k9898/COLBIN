"use client"

import { useState } from "react"
import API from "../services/api"
import {Link} from 'react-router-dom'

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" })
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await API.post("/login", form)
      localStorage.setItem("token", res.data.data.token)
      setMessage("Login successful! Welcome back! 🎉")
    } catch (error) {
      setMessage(error.response?.data?.message || "Error logging in")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 relative">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-indigo-600/10 rounded-full blur-2xl animate-float-delayed"></div>
      </div>

      <div className="w-full max-w-md animate-slide-up relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 rounded-2xl shadow-2xl mb-6 animate-pulse-glow">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold text-gradient mb-4">
            Welcome Back
          </h1>
          <p className="text-xl text-white/60">
            Sign in to your <span className="text-gradient-purple font-semibold">TalentHub</span> account
          </p>
        </div>

        {/* Login Card */}
        <div className="neon-card rounded-3xl p-10 shadow-2xl backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Form Fields */}
            <div className="space-y-6">
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
                    placeholder="Enter your password"
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
                  <span>Signing you in...</span>
                </div>
              ) : (
                <span className="flex items-center justify-center space-x-2">
                  <span>Sign In</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              )}
            </button>
          </form>

          {/* Message Display */}
          {message && (
            <div className={`mt-8 p-4 rounded-2xl text-center font-medium animate-fade-in ${
              message.includes("successful")
                ? "bg-gradient-to-r from-green-600/20 to-emerald-600/20 text-green-400 border border-green-600/30"
                : "bg-gradient-to-r from-red-600/20 to-rose-600/20 text-red-400 border border-red-600/30"
            }`}>
              {message}
            </div>
          )}


<div className="mt-10 text-center">
  <p className="text-white/60 mb-4">
    Don't have an account?
  </p>
  <Link 
    to="/register" 
    className="inline-flex items-center space-x-2 text-purple-400 hover:text-purple-300 font-semibold transition-all duration-300 hover:underline decoration-2 underline-offset-4"
  >
    <span>Create your account</span>
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  </Link>
</div>

        </div>

      </div>
    </div>
  )
}
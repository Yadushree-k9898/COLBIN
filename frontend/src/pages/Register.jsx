"use client"

import { useState } from "react"
import API from "../services/api"

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
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md animate-slide-in">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gradient mb-2">Join RecruitPro</h1>
          <p className="text-white/60 text-lg">Create your account and start your journey</p>
        </div>

        {/* Registration Card */}
        <div className="glass-effect rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Full Name</label>
                <input
                  name="name"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange}
                  className="input-field w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Email Address</label>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  className="input-field w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Password</label>
                <input
                  name="password"
                  type="password"
                  placeholder="Create a strong password"
                  value={form.password}
                  onChange={handleChange}
                  className="input-field w-full"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full animate-pulse-glow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creating Account...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {message && (
            <div
              className={`mt-6 p-4 rounded-xl text-center font-medium ${
                message.includes("Successful")
                  ? "bg-green-600/20 text-green-400 border border-green-600/30"
                  : "bg-red-600/20 text-red-400 border border-red-600/30"
              }`}
            >
              {message}
            </div>
          )}

          <div className="mt-8 text-center">
            <p className="text-white/60">
              Already have an account?{" "}
              <a href="/login" className="text-green-400 hover:text-green-300 font-medium transition-colors">
                Sign in here
              </a>
            </p>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-8 text-center">
          <p className="text-white/40 text-sm mb-4">Trusted by professionals worldwide</p>
          <div className="flex justify-center items-center space-x-6 opacity-60">
            <div className="text-xs font-medium">🔒 Secure</div>
            <div className="text-xs font-medium">⚡ Fast</div>
            <div className="text-xs font-medium">🚀 Modern</div>
          </div>
        </div>
      </div>
    </div>
  )
}

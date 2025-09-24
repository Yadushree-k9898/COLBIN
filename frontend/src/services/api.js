import axios from "axios"

const apiUrl = window.REACT_APP_API_URL || "http://localhost:5000/api";

const API = axios.create({
  baseURL: apiUrl,
})


API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default API

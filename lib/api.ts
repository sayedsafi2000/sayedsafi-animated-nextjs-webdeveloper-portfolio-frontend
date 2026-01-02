import axios from 'axios'

// API URL configuration
// Priority: Environment variable > Local development fallback
// Local development: Use env var if set, otherwise fallback to localhost:5000
// Production: Environment variable is required
const getAPIURL = () => {
  // First, check if environment variable is set (works everywhere)
  // In Next.js, NEXT_PUBLIC_ variables are available on both server and client
  const envApiUrl = process.env.NEXT_PUBLIC_API_URL
  
  // Check if env var exists and is not empty
  if (envApiUrl && envApiUrl.trim() !== '') {
    return envApiUrl.trim()
  }
  
  // If no env var, check if we're in local development
  const isNodeDevelopment = process.env.NODE_ENV === 'development'
  const isClientLocalhost = typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  
  // In local development without env var, use localhost backend
  if (isNodeDevelopment || isClientLocalhost) {
    return 'http://localhost:5000/api'
  }
  
  // In production without env var, this is an error
  return '' // Return empty string to make errors obvious
}

const API_URL = getAPIURL()

// Normalize API URL (remove trailing slash if present)
const normalizeURL = (url: string) => {
  return url.endsWith('/') ? url.slice(0, -1) : url
}

// Create axios instance
const api = axios.create({
  baseURL: normalizeURL(API_URL),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
})

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error)
  }
)

// Blog API
export const blogAPI = {
  getAll: async (params?: { limit?: number; page?: number; published?: boolean }) => {
    try {
      const queryParams = new URLSearchParams()
      if (params?.limit) queryParams.append('limit', params.limit.toString())
      if (params?.page) queryParams.append('page', params.page.toString())
      if (params?.published !== undefined) queryParams.append('published', params.published.toString())
      
      const response = await api.get(`/blog?${queryParams.toString()}`)
      return response.data
    } catch (error: any) {
      throw error
    }
  },
  getBySlug: async (slug: string) => {
    try {
      const response = await api.get(`/blog/${slug}`)
      return response.data
    } catch (error: any) {
      throw error
    }
  },
}

// Projects API
export const projectsAPI = {
  getAll: async (params?: { limit?: number; page?: number; featured?: boolean; isCustomCode?: boolean }) => {
    try {
      const queryParams = new URLSearchParams()
      if (params?.limit) queryParams.append('limit', params.limit.toString())
      if (params?.page) queryParams.append('page', params.page.toString())
      if (params?.featured !== undefined) queryParams.append('featured', params.featured.toString())
      if (params?.isCustomCode !== undefined) queryParams.append('isCustomCode', params.isCustomCode.toString())
      
      const response = await api.get(`/projects?${queryParams.toString()}`)
      return response.data
    } catch (error: any) {
      throw error
    }
  },
}

// Services API
export const servicesAPI = {
  getAll: async (params?: { limit?: number; page?: number; active?: boolean }) => {
    try {
      const queryParams = new URLSearchParams()
      if (params?.limit) queryParams.append('limit', params.limit.toString())
      if (params?.page) queryParams.append('page', params.page.toString())
      if (params?.active !== undefined) queryParams.append('active', params.active.toString())
      
      const response = await api.get(`/services?${queryParams.toString()}`)
      return response.data
    } catch (error: any) {
      throw error
    }
  },
}

// Test API connection
export const testAPI = async () => {
  try {
    const response = await api.get('/health')
    return { success: true, data: response.data }
  } catch (error: any) {
    return { 
      success: false, 
      error: error.message,
      details: error.response?.data || error.request
    }
  }
}

export default api


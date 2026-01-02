import axios from 'axios'

// API URL configuration
// Production backend URL
const PRODUCTION_API_URL = 'https://sayedsafi-animated-nextjs-webdevelo-gamma.vercel.app/api'
const LOCAL_API_URL = 'http://localhost:5000/api'

// Determine API URL
// Priority: 1. Environment variable, 2. Production URL (default)
const getAPIURL = () => {
  // If environment variable is explicitly set, use it
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL
  }
  
  // Default to production URL
  // For local development, create .env.local with NEXT_PUBLIC_API_URL=http://localhost:5000/api
  return PRODUCTION_API_URL
}

const API_URL = getAPIURL()

// Log API URL on initialization (helps debug)
if (typeof window !== 'undefined') {
  console.log('🔧 API URL Configured:', API_URL)
  console.log('🔧 Environment Variable:', process.env.NEXT_PUBLIC_API_URL || 'Not set (using production)')
  console.log('🔧 Current Location:', window.location.hostname)
}

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

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    // Always log in development, and in production if there's an issue
    const url = (config.baseURL || '') + (config.url || '')
    console.log('📡 API Request:', url)
    console.log('📡 Full Config:', {
      baseURL: config.baseURL,
      url: config.url,
      method: config.method
    })
    return config
  },
  (error) => {
    console.error('❌ Request Error:', error)
    return Promise.reject(error)
  }
)

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error('❌ API Error Response:', {
        status: error.response.status,
        data: error.response.data,
        url: error.config?.url
      })
    } else if (error.request) {
      // Request made but no response received
      console.error('❌ API No Response:', error.request)
    } else {
      // Error setting up request
      console.error('❌ API Request Setup Error:', error.message)
    }
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
      console.log('✅ Blog API Response:', response.data)
      return response.data
    } catch (error: any) {
      console.error('❌ Blog API Error:', error)
      console.error('❌ Error Details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: error.config?.url
      })
      throw error
    }
  },
  getBySlug: async (slug: string) => {
    try {
      const response = await api.get(`/blog/${slug}`)
      return response.data
    } catch (error: any) {
      console.error('❌ Blog Slug API Error:', error)
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
      console.log('✅ Projects API Response:', response.data)
      return response.data
    } catch (error: any) {
      console.error('❌ Projects API Error:', error)
      console.error('❌ Error Details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: error.config?.url
      })
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
      console.log('✅ Services API Response:', response.data)
      return response.data
    } catch (error: any) {
      console.error('❌ Services API Error:', error)
      console.error('❌ Error Details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: error.config?.url
      })
      throw error
    }
  },
}

// Test API connection
export const testAPI = async () => {
  try {
    console.log('🧪 Testing API Connection...')
    console.log('🧪 API URL:', API_URL)
    const response = await api.get('/health')
    console.log('✅ API Test Successful:', response.data)
    return { success: true, data: response.data }
  } catch (error: any) {
    console.error('❌ API Test Failed:', error)
    return { 
      success: false, 
      error: error.message,
      details: error.response?.data || error.request
    }
  }
}

export default api


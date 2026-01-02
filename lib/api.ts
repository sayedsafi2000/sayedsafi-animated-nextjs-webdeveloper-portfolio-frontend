import axios from 'axios'

// API URL configuration
// Local development: always use localhost:5000 (ignores env var)
// Production: use environment variable (required)
const getAPIURL = () => {
  // Check if we're in local development FIRST
  // Check NODE_ENV (works in both SSR and client)
  const isNodeDevelopment = process.env.NODE_ENV === 'development'
  
  // Check window location (only works on client-side)
  const isClientLocalhost = typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  
  // In local development, ALWAYS use localhost backend (ignore env var)
  if (isNodeDevelopment || isClientLocalhost) {
    return 'http://localhost:5000/api'
  }
  
  // In production, use environment variable (required)
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  
  if (!apiUrl) {
    const errorMsg = 'NEXT_PUBLIC_API_URL environment variable is not set in production.'
    console.error('❌', errorMsg)
    console.error('⚠️ Please set NEXT_PUBLIC_API_URL in Vercel environment variables.')
    return '' // Return empty string to make errors obvious
  }
  
  return apiUrl
}

const API_URL = getAPIURL()

// Log API URL configuration status
if (typeof window !== 'undefined') {
  if (API_URL) {
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    if (isLocal) {
      console.log('✅ API URL: Using localhost:5000 (local development)')
      console.log('📡 Backend URL: http://localhost:5000/api')
    } else {
      console.log('✅ API URL: Using environment variable (production mode)')
    }
  } else {
    console.error('❌ API URL is not configured! Set NEXT_PUBLIC_API_URL environment variable.')
  }
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
    // Only log in development mode for security
    if (process.env.NODE_ENV === 'development') {
      const url = (config.baseURL || '') + (config.url || '')
      console.log('📡 API Request:', url)
      console.log('📡 Method:', config.method)
    }
    return config
  },
  (error) => {
    console.error('❌ Request Error:', error.message)
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
      if (process.env.NODE_ENV === 'development') {
        console.log('✅ Projects API Response:', response.data)
      }
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
      if (process.env.NODE_ENV === 'development') {
        console.log('✅ Services API Response:', response.data)
      }
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
    const response = await api.get('/health')
    console.log('✅ API Test Successful')
    return { success: true, data: response.data }
  } catch (error: any) {
    console.error('❌ API Test Failed:', error.message)
    return { 
      success: false, 
      error: error.message,
      details: error.response?.data || error.request
    }
  }
}

export default api


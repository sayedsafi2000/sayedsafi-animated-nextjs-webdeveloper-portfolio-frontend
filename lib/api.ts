import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Blog API
export const blogAPI = {
  getAll: async (params?: { limit?: number; page?: number; published?: boolean }) => {
    const queryParams = new URLSearchParams()
    if (params?.limit) queryParams.append('limit', params.limit.toString())
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.published !== undefined) queryParams.append('published', params.published.toString())
    
    const response = await api.get(`/blog?${queryParams.toString()}`)
    return response.data
  },
  getBySlug: async (slug: string) => {
    const response = await api.get(`/blog/${slug}`)
    return response.data
  },
}

// Projects API
export const projectsAPI = {
  getAll: async (params?: { limit?: number; page?: number; featured?: boolean; isCustomCode?: boolean }) => {
    const queryParams = new URLSearchParams()
    if (params?.limit) queryParams.append('limit', params.limit.toString())
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.featured !== undefined) queryParams.append('featured', params.featured.toString())
    if (params?.isCustomCode !== undefined) queryParams.append('isCustomCode', params.isCustomCode.toString())
    
    const response = await api.get(`/projects?${queryParams.toString()}`)
    return response.data
  },
}

// Services API
export const servicesAPI = {
  getAll: async (params?: { limit?: number; page?: number; active?: boolean }) => {
    const queryParams = new URLSearchParams()
    if (params?.limit) queryParams.append('limit', params.limit.toString())
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.active !== undefined) queryParams.append('active', params.active.toString())
    
    const response = await api.get(`/services?${queryParams.toString()}`)
    return response.data
  },
}

export default api


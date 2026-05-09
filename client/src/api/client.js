import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/api',
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

apiClient.interceptors.response.use(
  (res) => res.data,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('user')
      window.location.href = '/register'
    }
    return Promise.reject(err)
  }
)

export default apiClient

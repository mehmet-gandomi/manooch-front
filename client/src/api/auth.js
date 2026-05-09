import apiClient from './client'

export const requestOtp = (phone) =>
  apiClient.post('/auth/request-otp', { phone })

export const verifyOtp = (phone, code) =>
  apiClient.post('/auth/verify-otp', { phone, code })

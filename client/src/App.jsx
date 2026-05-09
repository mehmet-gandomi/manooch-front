import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './context/AuthContext.jsx'
import ProtectedRoute from './components/layout/ProtectedRoute.jsx'

// Admin onboarding
import RegisterScreen from './screens/admin/onboarding/RegisterScreen.jsx'
import OtpScreen from './screens/admin/onboarding/OtpScreen.jsx'
import ProfileFormScreen from './screens/admin/onboarding/ProfileFormScreen.jsx'
import ShopReadyScreen from './screens/admin/onboarding/ShopReadyScreen.jsx'

// Admin dashboard
import AdminLayout from './components/layout/AdminLayout.jsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
    },
  },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Admin onboarding */}
            <Route path="/" element={<Navigate to="/register" replace />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/otp" element={<OtpScreen />} />
            <Route path="/profile" element={<ProfileFormScreen />} />
            <Route path="/ready" element={<ShopReadyScreen />} />

            {/* Protected admin panel */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            />

            {/* Consumer-facing (public) */}
            <Route path="/shop/:slug/*" element={<div>فروشگاه</div>} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  )
}

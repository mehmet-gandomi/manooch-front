// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import RegisterScreen from './screens/RegisterScreen'
import OtpScreen from './screens/OtpScreen'
import SuccessScreen from './screens/SuccessScreen'
import ProfileFormScreen from './screens/ProfileFormScreen'
import ShopReadyScreen from './screens/ShopReadyScreen'
import AdminDashboardScreen from './screens/admin/AdminDashboardScreen'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/otp" element={<OtpScreen />} />
        <Route path="/success" element={<SuccessScreen />} />
        <Route path="/profile" element={<ProfileFormScreen />} />
        <Route path="/ready" element={<ShopReadyScreen />} />
        <Route path="/admin" element={<AdminDashboardScreen />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

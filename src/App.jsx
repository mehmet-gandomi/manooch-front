import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import RegisterScreen from './screens/admin/onboarding/RegisterScreen'
import OtpScreen from './screens/admin/onboarding/OtpScreen'
import SuccessScreen from './screens/admin/onboarding/SuccessScreen'
import UserRegisterScreen from './screens/front/auth/RegisterScreen'
import UserOtpScreen from './screens/front/auth/OtpScreen'
import UserOtpErrorScreen from './screens/front/auth/OtpErrorScreen'
import UserSuccessScreen from './screens/front/auth/SuccessScreen'
import ProfileFormScreen from './screens/admin/onboarding/ProfileFormScreen'
import ShopReadyScreen from './screens/admin/onboarding/ShopReadyScreen'
import AdminDashboardScreen from './screens/admin/dashboard/AdminDashboardScreen'
import FrontPdpScreen from './screens/front/pdp/FrontPdpScreen'
import FrontDashboardScreen from './screens/front/dashboard/FrontDashboardScreen'
import LinkdooneScreen from './screens/front/linkdoone/LinkdooneScreen'
import BillingScreen from './screens/front/billing/BillingScreen'
import GalleryScreen from './screens/front/gallery/GalleryScreen'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/otp" element={<OtpScreen />} />
        <Route path="/success" element={<SuccessScreen />} />
        <Route path="/user" element={<Navigate to="/user/register" replace />} />
        <Route path="/user/register" element={<UserRegisterScreen />} />
        <Route path="/user/otp" element={<UserOtpScreen />} />
        <Route path="/user/otp-error" element={<UserOtpErrorScreen />} />
        <Route path="/user/success" element={<UserSuccessScreen />} />
        <Route path="/profile" element={<ProfileFormScreen />} />
        <Route path="/ready" element={<ShopReadyScreen />} />
        <Route path="/admin/*" element={<AdminDashboardScreen />} />
        <Route path="/front/pdp/:type" element={<FrontPdpScreen />} />
        <Route path="/front/pdp" element={<Navigate to="/front/pdp/shirt" replace />} />
        <Route path="/front/dashboard/:storeType" element={<FrontDashboardScreen />} />
        <Route path="/front/dashboard" element={<Navigate to="/front/dashboard/restaurant" replace />} />
        <Route path="/front/linkdoone/:storeType" element={<LinkdooneScreen />} />
        <Route path="/front/linkdoone" element={<Navigate to="/front/linkdoone/restaurant" replace />} />
        <Route path="/front/billing" element={<BillingScreen />} />
        <Route path="/front/gallery/:storeType" element={<GalleryScreen />} />
        <Route path="/front/gallery" element={<Navigate to="/front/gallery/restaurant" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

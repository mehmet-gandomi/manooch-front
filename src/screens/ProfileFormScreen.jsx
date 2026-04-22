// src/screens/ProfileFormScreen.jsx
// Multi-step profile completion form

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TextInput from '../components/TextInput'
import Dropdown from '../components/Dropdown'
import Button from '../components/Button'
import StepIndicator from '../components/StepIndicator'
import userIcon from '../assets/images/user.svg'
import shopIcon from '../assets/images/shop.svg'
import categoryIcon from '../assets/images/category.svg'

const ProfileFormScreen = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)

  // Step 1: Personal Info
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [nationalId, setNationalId] = useState('')
  const [gender, setGender] = useState('')
  const phoneNumber = '09120000000' // From previous step

  // Step 2: Business Info
  const [businessName, setBusinessName] = useState('')
  const [category, setCategory] = useState('')
  const [supportPhone, setSupportPhone] = useState('')
  const [website, setWebsite] = useState('')

  // Step 3: Address Info
  const [province, setProvince] = useState('')
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')

  const genderOptions = [
    { value: 'male', label: 'مرد' },
    { value: 'female', label: 'زن' },
  ]

  const categoryOptions = [
    { value: 'jewelry', label: 'بدلیجات' },
    { value: 'clothing', label: 'پوشاک' },
    { value: 'food', label: 'مواد غذایی' },
  ]

  const provinceOptions = [
    { value: 'khorasan', label: 'خراسان رضوی' },
    { value: 'tehran', label: 'تهران' },
    { value: 'isfahan', label: 'اصفهان' },
  ]

  const cityOptions = [
    { value: 'mashhad', label: 'مشهد' },
    { value: 'tehran', label: 'تهران' },
    { value: 'isfahan', label: 'اصفهان' },
  ]

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      navigate('/ready')
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-bg-main flex justify-between flex-col px-4 py-10 max-w-sm mx-auto"
    >
      {/* Header with step indicator */}
      <div>
        <StepIndicator currentStep={currentStep} totalSteps={3} />
      </div>

      {/* Form content - fills remaining space */}
      <div className="flex flex-col gap-8 flex-1 mt-10">
        {/* Step 1: Personal Info */}
        {currentStep === 1 && (
          <>
            <TextInput
              label="نام"
              placeholder="رضا"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              showInfoIcon
            />
            <TextInput
              label="نام خانوادگی"
              placeholder="قائمی"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              showInfoIcon
            />
            <TextInput
              label="کد ملی"
              placeholder="۰۹۲۱۱۱۱۱۱۱۱"
              value={nationalId}
              className="flex-row-reverse"
              onChange={(e) => setNationalId(e.target.value)}
              required
              showInfoIcon
            />
            <Dropdown
              label="جنسیت"
              placeholder="انتخاب کنید"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              options={genderOptions}
              required
              icon={userIcon}
            />
            <TextInput
              label="شماره همراه"
              value={phoneNumber}
              className='flex-row-reverse'
              helperText="شماره همراه ثبت شده و قابل ویرایش نیست"
              disabled
            />
          </>
        )}

        {/* Step 2: Business Info */}
        {currentStep === 2 && (
          <>
            <TextInput
              label="نام کسب و کار"
              placeholder="بدلیجات تاج محل"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              required
              icon={shopIcon}
              showInfoIcon
            />
            <Dropdown
              label="دسته"
              placeholder="انتخاب کنید"
              helperText="این یک متن راهنمایی برای کمک به کاربر است."
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={categoryOptions}
              required
              icon={categoryIcon}
            />
            <TextInput
              label="تلفن پشتیبانی"
              placeholder="۰۹۱۵"
              className='flex-row-reverse'
              value={supportPhone}
              onChange={(e) => setSupportPhone(e.target.value)}
              showInfoIcon
            />
            <TextInput
              label="وبسایت"
              placeholder="ieffect.ir"
              className='flex-row-reverse'
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              showInfoIcon
            />
          </>
        )}

        {/* Step 3: Address Info */}
        {currentStep === 3 && (
          <>
            <Dropdown
              label="استان"
              placeholder="انتخاب کنید"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              options={provinceOptions}
              required
            />
            <Dropdown
              label="شهر"
              placeholder="انتخاب کنید"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              options={cityOptions}
              required
            />
            <TextInput
              label="آدرس تکمیلی"
              placeholder="مصلی, پاساژ یاقوت"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              showInfoIcon
              multiline
            />
          </>
        )}
      </div>

      {/* Bottom section - CTA buttons */}
      <div>
        <Button onClick={handleNext} variant="primary">
          {currentStep === 3 ? 'تکمیل ثبت نام' : 'مرحله بعد'}
        </Button>
      </div>
    </div>
  )
}

export default ProfileFormScreen

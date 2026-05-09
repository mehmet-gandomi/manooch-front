import { useNavigate } from 'react-router-dom'
import Button from '../../../components/ui/Button'
import heartTickIcon from '../../../assets/images/heart-tick.svg'

const SuccessScreen = () => {
  const navigate = useNavigate()

  const handleContinue = () => {
    navigate('/profile')
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-bg-main flex flex-col px-4 py-10 max-w-sm mx-auto"
    >
      <div className="flex-1 flex flex-col justify-center items-center gap-8">
        <img src={heartTickIcon} alt="Success" className="w-160 h-160" />

        <div className="flex flex-col gap-3 text-center">
          <h1 className="text-xl font-bold text-text-strong mb-4">
            دوست عزیز، به هوشنگ پیوستید
          </h1>
          <p className="text-base font-normal text-text-moderate">
            ثبت نام اولیه شما با موفقیت انجام شد
          </p>
        </div>
      </div>

      <Button onClick={handleContinue} variant="primary">
        تکمیل ثبت نام
      </Button>
    </div>
  )
}

export default SuccessScreen

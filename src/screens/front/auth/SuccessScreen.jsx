import { useNavigate } from 'react-router-dom'
import Button from '../../../components/ui/Button'
import heartTickIcon from '../../../assets/images/heart-tick.svg'

const SuccessScreen = () => {
  const navigate = useNavigate()

  return (
    <div
      dir="rtl"
      className="mx-auto flex min-h-screen max-w-sm flex-col bg-bg-main px-4 pb-24"
    >
      <div className="flex flex-1 translate-y-4 flex-col items-center justify-center gap-8 text-center">
        <img
          src={heartTickIcon}
          alt=""
          className="h-40 w-40 icon-auth-success"
        />

        <div className="flex flex-col gap-3">
          <h1 className="text-xl font-bold leading-[48px] text-text-strong">
            دوست عزیز، به هوشنگ پیوستید
          </h1>
          <p className="text-base font-normal leading-8 text-text-moderate">
            ثبت نام اولیه شما با موفقیت انجام شد
          </p>
        </div>
      </div>

      <Button onClick={() => navigate('/profile')} variant="admin" size="front">
        تکمیل ثبت نام
      </Button>
    </div>
  )
}

export default SuccessScreen

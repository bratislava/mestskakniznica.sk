import Calendar from '@assets/images/calendar.svg'
import cx from 'classnames'

export interface BannerProps {
  className?: string
  onBannerClick: () => void
  title?: string
  description?: string
  buttonContent?: string
}

export const Banner = ({
  className,
  onBannerClick,
  title,
  description,
  buttonContent,
}: BannerProps) => {
  return (
    <div
      className={cx(
        'flex flex-col items-center justify-between gap-y-6 bg-gray-universal-100 p-4 text-center lg:flex-row lg:gap-y-0 lg:p-10 lg:text-left',
        className
      )}
    >
      <div className="max-w-[288px] lg:max-w-[754px]">
        <h4 className="text-[18px] text-white lg:text-md">{title}</h4>
        <p className="pt-3 text-xs text-[#B0B0B0] lg:text-sm">{description}</p>
      </div>
      <button
        onClick={onBannerClick}
        className="flex items-center gap-x-[11px] bg-white py-[9px] px-5 text-xs hover:bg-gray-100"
      >
        <Calendar />
        <p>{buttonContent}</p>
      </button>
    </div>
  )
}

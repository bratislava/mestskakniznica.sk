import Calendar from '@assets/images/calendar.svg'
import cx from 'classnames'

export interface BannerProps {
  className?: string
  onBannerClick: () => void
  title?: string
  description?: string
  buttonContent?: string
}

export function Banner({ className, onBannerClick, title, description, buttonContent }: BannerProps) {
  return <div
    className={cx(
      'bg-gray-universal-100 flex flex-col gap-y-6 lg:gap-y-0 lg:flex-row text-center lg:text-left items-center justify-between p-4 lg:p-10',
      className
    )}
  >
    <div className="max-w-[288px] lg:max-w-[754px]">
      <h4 className="text-[18px] lg:text-md text-white">{title}</h4>
      <p className="text-xs lg:text-sm text-[#B0B0B0] pt-3">{description}</p>
    </div>
    <button
      onClick={onBannerClick}
      className="flex items-center gap-x-[11px] py-[9px] px-5 bg-white text-xs hover:bg-gray-100"
    >
      <Calendar />
      <p>{buttonContent}</p>
    </button>
  </div>
}

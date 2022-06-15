import Globe from '@assets/images/language.svg'
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import cx from 'classnames'

export interface PartnerProps {
  className?: string
  title?: string
  pageLink?: { title?: string; url?: string }
  logo?: string
  alt?: string
  featured?: boolean | null | undefined
}

export function Partner({ className, title, pageLink, logo, alt, featured }: PartnerProps) {
  const { Link: UILink, Image: UIImage } = useUIContext()
  return (
    <div
      className={cx(className, 'flex p-4 w-full lg:p-5 border-gray-universal-100', {
        'flex-col items-center min-h-[199px] justify-end border': featured,
        'flex-row justify-between border-b last:border-0 lg:border lg:last:border': !featured,
      })}
    >
      {featured && (
        <div className="h-24">
          <img className="max-w-[250px] w-full h-full object-contain" src={logo ?? ''} alt={alt ?? ''} />
        </div>
      )}
      <h5
        className={cx('text-sm lg:text-default', {
          'mt-4 text-center lg:mt-5': featured,
          'max-w-[246px] lg:max-w-full': !featured,
        })}
      >
        {title}
      </h5>

      <UILink
        target="_blank"
        className={cx(className, 'flex items-center space-x-[9px]', {
          'mt-[6px] lg:mt-[13px]': featured,
        })}
        href={pageLink?.url ?? '#'}
      >
        <Globe />
        <span
          className={cx('text-[12px] lg:text-xs font-medium', {
            'hidden lg:inline-flex': !featured,
          })}
        >
          {pageLink?.title}
        </span>
      </UILink>
    </div>
  )
}

export default Partner

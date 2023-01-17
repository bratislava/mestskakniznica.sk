import Globe from '@assets/images/language.svg'
import MLink from '@modules/common/MLink'
import cx from 'classnames'

export interface PartnerProps {
  className?: string
  title?: string
  pageLink?: { title?: string; url?: string }
  logo?: string
  alt?: string
  featured?: boolean | null | undefined
}

export const Partner = ({ className, title, pageLink, logo, alt, featured }: PartnerProps) => {
  return (
    <div
      className={cx(className, 'flex w-full border-border-dark p-4 lg:p-5', {
        'min-h-[199px] flex-col items-center justify-end border': featured,
        'flex-row justify-between border-b last:border-0 lg:border lg:last:border': !featured,
      })}
    >
      {featured && (
        <div className="h-24">
          <img
            className="h-full w-full max-w-[250px] object-contain"
            src={logo ?? ''}
            alt={alt ?? ''}
          />
        </div>
      )}
      <h5
        className={cx('text-h5', {
          'mt-4 text-center lg:mt-5': featured,
          'max-w-[246px] lg:max-w-full': !featured,
        })}
      >
        {title}
      </h5>

      <MLink
        target="_blank"
        className={cx(className, 'flex items-center space-x-[9px]', {
          'mt-[6px] lg:mt-[13px]': featured,
        })}
        href={pageLink?.url ?? '#'}
      >
        <Globe />
        <span
          className={cx('text-[12px] font-medium lg:text-sm', {
            'hidden lg:inline-flex': !featured,
          })}
        >
          {pageLink?.title}
        </span>
      </MLink>
    </div>
  )
}

export default Partner

import Globe from '@assets/icons/language.svg'
import MLink from '@modules/common/MLink'
import cx from 'classnames'
import { useTranslation } from 'next-i18next'

export interface PartnerProps {
  id?: string | null
  title?: string
  linkHref?: string
  logo?: string
  alt?: string
  featured?: boolean | null | undefined
}

export const PartnerCard = ({ id, title, linkHref, logo, alt, featured }: PartnerProps) => {
  const { t } = useTranslation('common')
  return (
    <li
      className={cx('relative flex w-full border-border-dark p-4 lg:p-5', {
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
        id={id ?? title}
      >
        {title}
      </h5>

      <div
        className={cx('mt-[6px] flex text-xs font-medium leading-[1.2] lg:mt-[13px] lg:text-sm', {
          'hidden lg:inline-flex': !featured,
        })}
      >
        <MLink
          target="_blank"
          className={cx('flex items-center space-x-[9px]', {
            '': featured,
          })}
          stretched
          aria-labelledby={id ?? title}
          href={linkHref ?? '#'}
        >
          <Globe />
          <span className="uppercase">{t('showWeb')}</span>
        </MLink>
      </div>
    </li>
  )
}

export default PartnerCard

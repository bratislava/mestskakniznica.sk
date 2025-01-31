import cx from 'classnames'
import { useTranslation } from 'next-i18next'

import { GlobeIcon } from '@/assets/icons'
import CardWrapper from '@/modules/cards-and-rows/CardWrapper'
import MLink from '@/modules/common/MLink'

type PartnerCardRowProps = {
  title: string
  linkHref: string
  id: string
  logo?: string
  featured?: boolean
}

const PartnerCardRow = ({ title, id, linkHref, logo, featured = false }: PartnerCardRowProps) => {
  const { t } = useTranslation()
  return (
    <CardWrapper
      className={cx('relative flex w-full border-border-dark py-4 lg:p-5', {
        'min-h-[199px] flex-col items-center justify-end border': featured,
        'flex-row justify-between border-b last:border-0 lg:border lg:last:border': !featured,
      })}
    >
      {featured && (
        <div className="h-24">
          <img
            className="h-full w-full max-w-[250px] object-contain"
            src={logo ?? ''}
            // empty alt on purpose
            alt=""
          />
        </div>
      )}
      <h3
        className={cx('text-h5', {
          'mt-4 text-center lg:mt-5': featured,
        })}
        id={id}
      >
        {title}
      </h3>

      <div
        className={cx('text-xs font-medium leading-[1.2] lg:text-sm', {
          'mt-[6px] lg:mt-[13px]': featured,
        })}
      >
        <MLink
          target="_blank"
          variant="basic"
          stretched
          aria-labelledby={id}
          href={linkHref}
          className="flex items-center gap-x-[9px] uppercase"
        >
          <GlobeIcon />
          <span
            className={cx({
              'hidden lg:inline-flex': !featured,
            })}
          >
            {t('showWeb')}
          </span>
        </MLink>
      </div>
    </CardWrapper>
  )
}

export default PartnerCardRow

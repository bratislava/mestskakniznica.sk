import Image from 'next/image'
import { useTranslation } from 'next-i18next'

import { GlobeIcon } from '@/assets/icons'
import CardWrapper from '@/modules/cards-and-rows/CardWrapper'
import MLink from '@/modules/common/MLink'
import cn from '@/utils/cn'

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
      className={cn('relative flex w-full border-border-dark py-4 lg:p-5', {
        'min-h-[199px] flex-col items-center justify-end border': featured,
        'flex-row justify-between border-b last:border-0 lg:border lg:last:border': !featured,
      })}
    >
      {featured ? (
        <div className="relative h-24 w-[250px] max-w-[250px] shrink-0">
          <Image
            src={logo ?? ''}
            alt="" // Empty alt on purpose
            fill
            className="object-contain"
          />
        </div>
      ) : null}
      <h3
        className={cn('text-h5', {
          'mt-4 text-center lg:mt-5': featured,
        })}
        id={id}
      >
        {title}
      </h3>

      <div
        className={cn('text-xs font-medium leading-[1.2] lg:text-sm', {
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
            className={cn({
              'hidden lg:inline-flex': !featured,
            })}
          >
            {t('partnerCardRow.showWeb')}
          </span>
        </MLink>
      </div>
    </CardWrapper>
  )
}

export default PartnerCardRow

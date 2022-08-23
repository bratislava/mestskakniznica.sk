import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { ImageEntityFragment } from '../../graphql'

interface PremiseCardProps {
  title: string
  address: string
  url: string
  image: ImageEntityFragment | undefined | null
}

function PremiseCard({ title, address, url, image }: PremiseCardProps) {
  const { t } = useTranslation('common')
  return (
    <Link href={url} passHref>
      <a href={url}>
        <div key={title} className="relative w-full">
          <img
            src={image?.attributes?.url ?? ''}
            alt={image?.attributes?.alternativeText ?? ''}
            className="h-48 w-full object-cover"
          />
          <div className="">
            <div className="pt-4">{title}</div>
            <div className="pt-3 text-sm leading-[19.6px] text-gray-universal-70">{address}</div>
            <div className="cursor-pointer pt-6 text-sm uppercase">
              {t('showDetails')} {'>'}
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default PremiseCard

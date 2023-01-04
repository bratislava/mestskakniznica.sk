import MLink from '@modules/common/MLink'
import { useTranslation } from 'next-i18next'

import { ImageEntityFragment } from '../../graphql'

interface BranchCardProps {
  title: string
  address: string
  linkHref: string
  image: ImageEntityFragment | undefined | null
}

const BranchCard = ({ title, address, linkHref, image }: BranchCardProps) => {
  const { t } = useTranslation('common')
  return (
    <div className="relative flex w-full flex-col">
      <img
        src={image?.attributes?.url ?? ''}
        alt={image?.attributes?.alternativeText ?? ''}
        className="h-48 w-full object-cover"
      />
      <div className="pt-4">
        <div>
          <MLink href={linkHref} className="peer after:absolute after:inset-0">
            {title}
          </MLink>
        </div>
        <div className="pt-3 text-base text-foreground-body">{address}</div>
        <div className="pt-6 text-base uppercase peer-hover:underline">
          {t('showDetails')} {'>'}
        </div>
      </div>
    </div>
  )
}

export default BranchCard

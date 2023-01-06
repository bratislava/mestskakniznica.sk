import MLink from '@modules/common/MLink'
import ShowMoreLink from '@modules/common/ShowMoreLink'
import { useTranslation } from 'next-i18next'
import React from 'react'

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
    <div className="group/showMore relative flex w-full flex-col">
      <img
        src={image?.attributes?.url ?? ''}
        alt={image?.attributes?.alternativeText ?? ''}
        className="h-48 w-full object-cover"
      />
      <div className="pt-4">
        <div>
          <MLink href={linkHref} stretched variant="basic">
            {title}
          </MLink>
        </div>
        <div className="pt-3 text-base text-foreground-body">{address}</div>
        <ShowMoreLink href={linkHref} tabIndex={-1} className="mt-6" parentGroup>
          {t('showMore')}
        </ShowMoreLink>
      </div>
    </div>
  )
}

export default BranchCard

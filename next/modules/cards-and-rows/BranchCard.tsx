import MLink from '@modules/common/MLink'
import ShowMoreLink from '@modules/common/ShowMoreLink'
import { UploadImageEntityFragment } from '@services/graphql'
import { useNavikronos } from '@utils/navikronos'
import { useTranslation } from 'next-i18next'
import React from 'react'

type BranchCardProps = {
  title: string
  address: string
  pageId: string | null | undefined
  image: UploadImageEntityFragment | undefined | null
}

const BranchCard = ({ title, address, pageId, image }: BranchCardProps) => {
  const { t } = useTranslation('common')
  const { getPathForEntity } = useNavikronos()
  const href = (pageId ? getPathForEntity({ type: 'page', id: pageId }) : null) ?? ''

  return (
    <div className="group/showMore relative flex w-full flex-col">
      <img
        src={image?.attributes?.url ?? ''}
        alt={image?.attributes?.alternativeText ?? ''}
        className="h-48 w-full object-cover"
      />
      <div className="pt-4">
        <h3>
          <MLink href={href} stretched variant="basic">
            {title}
          </MLink>
        </h3>

        <div className="pt-3 text-base text-foreground-body">{address}</div>

        <ShowMoreLink href={href} tabIndex={-1} className="mt-6" parentGroup>
          {t('showMore')}
        </ShowMoreLink>
      </div>
    </div>
  )
}

export default BranchCard

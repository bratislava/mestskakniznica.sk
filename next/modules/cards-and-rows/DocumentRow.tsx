import { useTranslation } from 'next-i18next'
import { ReactNode } from 'react'

import ChevronRight from '@/assets/images/chevron-right.svg'
import CardWrapper from '@/modules/cards-and-rows/CardWrapper'
import FileExtBadge from '@/modules/common/FileExtBadge'
import MLink from '@/modules/common/MLink'
import FormatDate from '@/modules/formatting/FormatDate'

type DocumentRowProps = {
  title: string
  fileExt: string | JSX.Element
  linkHref: string | null
  category?: string
  metadata?: ReactNode
  addedAt?: string
}

const DocumentRow = ({
  title,
  fileExt,
  linkHref,
  category,
  addedAt,
  metadata,
}: DocumentRowProps) => {
  const { t } = useTranslation()

  return (
    <CardWrapper className="group/showMore relative flex gap-5 border-b border-border-dark py-4 pr-2 text-foreground-body lg:gap-8">
      <FileExtBadge className="hidden lg:flex" fileExt={fileExt} />
      <div className="flex w-8 shrink-0 self-center text-xs lg:hidden">{fileExt}</div>

      <div className="flex grow flex-col gap-y-2">
        {category && <div className="text-sm">{category}</div>}
        <h3 className="text-h5 group-hover/showMore:underline">
          <MLink href={linkHref ?? '#'} stretched>
            {title}
          </MLink>
        </h3>
        <div className="flex gap-x-3 text-sm text-foreground-body empty:hidden">
          {metadata && <span className="hidden lg:block">{metadata}</span>}
          {metadata && addedAt ? <span className="hidden lg:block">&bull;</span> : null}
          {addedAt && (
            <div>
              {t('added')} <FormatDate value={addedAt} valueType="ISO" />
            </div>
          )}
        </div>
      </div>
      <ChevronRight className="mt-1.5 hidden shrink-0 lg:block" />
    </CardWrapper>
  )
}

export default DocumentRow

import ChevronRight from '@assets/images/chevron-right.svg'
import SingleDot from '@assets/images/dot.svg'
import { FileIcon } from '@components/ui/FileIcon/FileIcon'
import MLink from '@modules/common/MLink'
import FormatDate from '@modules/formatting/FormatDate'
import { useTranslation } from 'next-i18next'
import { ReactNode } from 'react'

export interface RowFileProps {
  title: string
  fileExt: string
  linkHref: string
  category?: string
  metadata?: ReactNode
  addedAt?: string
}

export const DocumentRow = ({
  title,
  fileExt,
  linkHref,
  category,
  addedAt,
  metadata,
}: RowFileProps) => {
  const { t } = useTranslation('common')

  return (
    <div className="group/showMore relative flex gap-5 border-b border-border-dark py-4 pr-2 text-foreground-body lg:gap-8">
      <FileIcon type={fileExt} />

      <div className="flex grow flex-col gap-y-2">
        {category && <div className="text-sm">{category}</div>}
        <h3 className="text-h5 group-hover/showMore:underline">
          <MLink href={linkHref} stretched>
            {title}
          </MLink>
        </h3>
        <div className="flex gap-x-3 text-sm text-foreground-body empty:hidden">
          {metadata && <span className="hidden lg:block">{metadata}</span>}
          {metadata && addedAt ? <SingleDot className="hidden lg:block" /> : null}
          {addedAt && (
            <div>
              {t('added')} <FormatDate value={addedAt} valueType="ISO" />
            </div>
          )}
        </div>
      </div>
      <ChevronRight className="mt-1.5 hidden shrink-0 lg:block" />
    </div>
  )
}

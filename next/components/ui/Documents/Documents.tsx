import Metadata from '@components/Molecules/Metadata'
import { RowFile } from '@components/ui'
import MLink from '@modules/common/MLink'
import { BasicDocumentEntityFragment } from '@services/graphql'
import { isDefined } from '@utils/isDefined'
import cx from 'classnames'
import { useTranslation } from 'next-i18next'

import { Link } from '../Link/Link'

export interface DocumentsProps {
  className?: string
  title?: string | null | undefined
  moreLink?: { title?: string; url?: string }
  documents: BasicDocumentEntityFragment[]
  targetBlank?: boolean
}

export const Documents = ({
  className,
  title,
  moreLink,
  documents,
  targetBlank = false,
}: DocumentsProps) => {
  const { t } = useTranslation('common')

  const parsedDocuments = documents.map((document) => ({
    key: document.id,
    url: `${t('documents_slug')}${document?.attributes?.slug}`,
    content: {
      type: document?.attributes?.file_category?.data?.attributes?.name ?? '',
      title: document?.attributes?.title ?? '',
      metadata:
        <Metadata metadata={document?.attributes?.metadata?.filter(isDefined) || []} /> ?? '',
      dateAdded: document?.attributes?.date_added,
      fileType:
        document?.attributes?.attachment?.data?.attributes?.ext?.toUpperCase().replace('.', '') ??
        '',
    },
  }))

  return (
    <div className={cx(className, 'flex flex-col')}>
      <h3 className="text-h3">{title}</h3>

      <div className={cx('flex flex-col', { 'mt-6': !!title })}>
        {parsedDocuments?.map((file) => (
          <MLink key={file.key} href={file.url ?? ''} target={targetBlank ? '_blank' : undefined}>
            <RowFile
              className="cursor-pointer"
              type={file.content?.type ?? ''}
              title={file.content?.title ?? ''}
              metadata={file.content?.metadata}
              dateAdded={file.content?.dateAdded || ''}
              fileType={file.content?.fileType}
            />
          </MLink>
        ))}
      </div>

      {moreLink?.url && (
        <Link className="mt-6" href={moreLink?.url ?? ''} hasIcon>
          {moreLink?.title}
        </Link>
      )}
    </div>
  )
}

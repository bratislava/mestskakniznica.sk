import Metadata from '@components/Molecules/Metadata'
import { RowFile } from '@components/ui'
import MLink from '@modules/common/MLink'
import { BasicDocumentEntityFragment } from '@services/graphql'
import { hasAttributes, isDefined } from '@utils/isDefined'
import cx from 'classnames'

import { Link } from '../Link/Link'
import { useNavikronos } from '@utils/navikronos'

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
  const { getPathForEntity } = useNavikronos()

  const parsedDocuments = documents.filter(hasAttributes).map((document) => {
    const {
      slug,
      file_category,
      title: titleInner,
      metadata,
      date_added,
      attachment,
    } = document.attributes

    return {
      key: document.id,
      url: getPathForEntity({ type: 'basic-document', slug }) ?? '',
      content: {
        type: file_category?.data?.attributes?.name ?? '',
        title: titleInner ?? '',
        metadata: <Metadata metadata={metadata?.filter(isDefined) || []} /> ?? '',
        dateAdded: date_added,
        fileType: attachment?.data?.attributes?.ext?.toUpperCase().replace('.', '') ?? '',
      },
    }
  })

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

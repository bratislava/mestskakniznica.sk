import { DocumentRow } from '@modules/cards-and-rows/DocumentRow'
import { DisclosureEntityFragment, DocumentEntityFragment } from '@services/graphql'
import { hasAttributes, isDefined } from '@utils/isDefined'
import { useNavikronos } from '@utils/navikronos'
import { useDisclosureMetadata } from '@utils/useDisclosureMetadata'
import cx from 'classnames'

export interface DocumentsProps {
  className?: string
  title?: string | null | undefined
  documents: (DocumentEntityFragment | DisclosureEntityFragment)[]
}

export const Documents = ({ className, title, documents }: DocumentsProps) => {
  const { getPathForEntity } = useNavikronos()
  const { getDisclosureMetadata } = useDisclosureMetadata()

  const parsedDocuments = documents
    .filter(hasAttributes)
    .map((document) => {
      const { title: docTitle, slug, file } = document.attributes

      if (document.__typename === 'DisclosureEntity') {
        const { type } = document.attributes

        return {
          id: document.id,
          linkHref: getPathForEntity({ type: 'disclosure', slug }) ?? '',
          content: {
            category: type,
            title: docTitle,
            metadata: getDisclosureMetadata(document)
              .map(({ label, value }) => `${label}: ${value}`)
              .join(', '),
            // eslint-disable-next-line unicorn/consistent-destructuring
            addedAt: document.attributes?.addedAt,
            fileExt: file?.data?.attributes?.ext?.toUpperCase().replace('.', '') ?? '',
          },
        }
      }

      if (document.__typename === 'DocumentEntity') {
        const { documentCategory } = document.attributes

        return {
          id: document.id,
          linkHref: getPathForEntity({ type: 'document', slug }) ?? '',
          content: {
            category: documentCategory?.data?.attributes?.label,
            title: docTitle,
            // eslint-disable-next-line unicorn/consistent-destructuring
            addedAt: document.attributes.publishedAt,
            fileExt: file.data?.attributes?.ext?.toUpperCase().replace('.', '') ?? '',
          },
        }
      }

      return null
    })
    .filter(isDefined)

  return (
    <div className={cx(className, 'flex flex-col')}>
      {title && <h3 className="text-h3">{title}</h3>}

      <div className={cx('flex flex-col', { 'mt-6': !!title })}>
        {parsedDocuments?.map((doc) => (
          <DocumentRow
            title={doc.content.title}
            fileExt={doc.content.fileExt}
            linkHref={doc.linkHref}
            category={doc.content.category}
            addedAt={doc.content.addedAt}
            metadata={doc.content.metadata}
          />
        ))}
      </div>
    </div>
  )
}

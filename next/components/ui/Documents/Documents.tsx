import { FolderIcon } from '@/assets/icons'
import DocumentRow from '@/modules/cards-and-rows/DocumentRow'
import { DisclosureEntityFragment, DocumentEntityFragment } from '@/services/graphql'
import cn from '@/utils/cn'
import { hasAttributes, isDefined } from '@/utils/isDefined'
import { useNavikronos } from '@/utils/navikronos'

export interface DocumentsProps {
  className?: string
  title?: string | null | undefined
  documents: (DocumentEntityFragment | DisclosureEntityFragment)[]
}

export const Documents = ({ className, title, documents }: DocumentsProps) => {
  const { getPathForStrapiEntity } = useNavikronos()

  const parsedDocuments = documents
    .filter(hasAttributes)
    .map((document) => {
      const { title: docTitle, file } = document.attributes

      const badgeExt =
        file?.data.length > 1 ? (
          <FolderIcon />
        ) : (
          file?.data[0]?.attributes?.ext?.toUpperCase().replace('.', '') ?? ''
        )

      if (document.__typename === 'DisclosureEntity') {
        const { type, contractor } = document.attributes

        return {
          id: document.id,
          linkHref: getPathForStrapiEntity(document),
          content: {
            category: type,
            title: docTitle,
            metadata: contractor ? `${contractor}` : undefined,
            // eslint-disable-next-line unicorn/consistent-destructuring
            fileExt: badgeExt,
          },
        }
      }

      if (document.__typename === 'DocumentEntity') {
        const { documentCategory } = document.attributes

        return {
          id: document.id,
          linkHref: getPathForStrapiEntity(document),
          content: {
            category: documentCategory?.data?.attributes?.label,
            title: docTitle,
            // eslint-disable-next-line unicorn/consistent-destructuring
            fileExt: badgeExt,
          },
        }
      }

      return null
    })
    .filter(isDefined)

  return (
    <div className={cn(className, 'flex flex-col')}>
      {title && <h3 className="text-h3">{title}</h3>}

      <div className={cn('flex flex-col', { 'mt-6': !!title })}>
        {parsedDocuments?.map((doc, index) => (
          <DocumentRow
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            title={doc.content.title}
            fileExt={doc.content.fileExt}
            linkHref={doc.linkHref}
            category={doc.content.category}
            metadata={doc.content.metadata}
          />
        ))}
      </div>
    </div>
  )
}

import { FolderIcon } from '@/assets/icons'
import AssetRow from '@/modules/cards-and-rows/AssetRow'
import { AssetEntityFragment, DisclosureEntityFragment } from '@/services/graphql'
import cn from '@/utils/cn'
import { hasAttributes, isDefined } from '@/utils/isDefined'
import { useNavikronos } from '@/utils/navikronos'

export interface AssetsProps {
  className?: string
  title?: string | null | undefined
  assets: (AssetEntityFragment | DisclosureEntityFragment)[]
}

export const Assets = ({ className, title, assets }: AssetsProps) => {
  const { getPathForStrapiEntity } = useNavikronos()

  const parsedAssets = assets
    .filter(hasAttributes)
    .map((asset) => {
      const { title: docTitle, file } = asset.attributes

      const badgeExt =
        file?.data.length > 1 ? (
          <FolderIcon />
        ) : (
          (file?.data[0]?.attributes?.ext?.toUpperCase().replace('.', '') ?? '')
        )

      if (asset.__typename === 'DisclosureEntity') {
        const { type, contractor } = asset.attributes

        return {
          id: asset.id,
          linkHref: getPathForStrapiEntity(asset),
          content: {
            category: type,
            title: docTitle,
            metadata: contractor ? contractor : undefined,
            fileExt: badgeExt,
          },
        }
      }

      if (asset.__typename === 'AssetEntity') {
        const { assetCategory } = asset.attributes

        return {
          id: asset.id,
          linkHref: getPathForStrapiEntity(asset),
          content: {
            category: assetCategory?.data?.attributes?.label,
            title: docTitle,
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
        {parsedAssets?.map((doc, index) => (
          <AssetRow
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

import { FolderIcon } from '@/assets/icons'
import AssetRow from '@/modules/cards-and-rows/AssetRow'
import { AssetEntityFragment, DisclosureEntityFragment } from '@/services/graphql'
import cn from '@/utils/cn'
import { isDefined } from '@/utils/isDefined'
import { useNavikronos } from '@/utils/navikronos'

export interface AssetsProps {
  className?: string
  title?: string | null | undefined
  assets: (AssetEntityFragment | DisclosureEntityFragment)[]
}

export const Assets = ({ className, title, assets }: AssetsProps) => {
  const { getPathForStrapiEntity } = useNavikronos()

  const parsedAssets = assets
    .filter(isDefined)
    .map((asset) => {
      const { title: assetTitle, file } = asset

      const badgeExt =
        file.length > 1 ? <FolderIcon /> : (file[0]?.ext?.toUpperCase().replace('.', '') ?? '')

      if (asset.__typename === 'Disclosure') {
        const { type, contractor } = asset

        return {
          id: asset.documentId,
          linkHref: getPathForStrapiEntity(asset),
          content: {
            category: type,
            title: assetTitle,
            metadata: contractor ? contractor : undefined,
            fileExt: badgeExt,
          },
        }
      }

      if (asset.__typename === 'Asset') {
        const { assetCategory } = asset

        return {
          id: asset.documentId,
          linkHref: getPathForStrapiEntity(asset),
          content: {
            category: assetCategory?.label,
            title: assetTitle,
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
        {parsedAssets?.map((asset, index) => (
          <AssetRow
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            title={asset.content.title}
            fileExt={asset.content.fileExt}
            linkHref={asset.linkHref}
            category={asset.content.category}
            metadata={asset.content.metadata}
          />
        ))}
      </div>
    </div>
  )
}

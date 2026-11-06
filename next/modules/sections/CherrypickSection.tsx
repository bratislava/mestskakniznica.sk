import Listing from '@/components/ui/Listing/Listing'
import { CherrypickSectionFragment } from '@/services/graphql'
import { useNavigation } from '@/services/navigation/NavigationProvider'
import { isDefined } from '@/utils/isDefined'

type CherrypickSectionProps = {
  section: CherrypickSectionFragment
}

const CherrypickSection = ({ section }: CherrypickSectionProps) => {
  const { getPathForStrapiEntity } = useNavigation()

  const listingChildren =
    section.pages?.data
      ?.map((page) => {
        const path = getPathForStrapiEntity(page)
        if (!page.attributes || !path) {
          return null
        }

        return {
          title: page.attributes.title,
          path,
        }
      })
      .filter(isDefined) ?? []

  return (
    <Listing
      title={section.title ?? undefined}
      listingChildren={listingChildren}
      className="pt-8"
    />
  )
}

export default CherrypickSection

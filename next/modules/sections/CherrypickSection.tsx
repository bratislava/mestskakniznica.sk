import Listing from '@components/ui/Listing/Listing'
import { CherrypickSectionFragment } from '@services/graphql'
import { isDefined } from '@utils/isDefined'
import { useNavikronos } from '@utils/navikronos'

type CherrypickSectionProps = {
  section: CherrypickSectionFragment
}

const CherrypickSection = ({ section }: CherrypickSectionProps) => {
  const { getPathForEntity } = useNavikronos()

  const listingChildren =
    section.pages?.data
      ?.map((page) => {
        const path = getPathForEntity({ type: 'page', id: page.id })
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

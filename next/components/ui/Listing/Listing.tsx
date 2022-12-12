import ChevronRight from '@assets/images/chevron-right.svg'
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import cx from 'classnames'

import { CallToAction } from '../CallToAction/CallToAction'
import { Link } from '../Link/Link'
import { RowSubcategory } from '../RowSubcategory/RowSubcategory'

export interface ListingProps {
  className?: string
  title?: string
  url?: string
  moreLinkTitle?: string
  pages: { title: string; url: string; moreLinkTitle: string }[]
  hasDivider?: boolean
}

export const Listing = ({
  className,
  title,
  url,
  moreLinkTitle,
  pages,
  hasDivider,
}: ListingProps) => {
  const { Link: UILink } = useUIContext()
  return (
    <div className={cx(className)}>
      {moreLinkTitle && url && (
        <Link href={url} hasIcon>
          <div className="flex w-full items-center justify-between">
            <h2 className="text-md normal-case lg:text-lg">{title}</h2>
            {moreLinkTitle}
          </div>
        </Link>
      )}

      <div className="mt-4 grid grid-cols-1 gap-y-2 md:mt-6 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
        {pages?.map((page) => (
          <UILink href={page.url} key={page.title}>
            <CallToAction
              className="mt-0 hidden h-[180px] w-full md:flex"
              key={page.title}
              title={page.title}
              href={page.url}
              bottomText={page.moreLinkTitle}
              hasIcon={false}
              uppercase={false}
              customIcon={
                <span className="ml-2 inline-flex">
                  <ChevronRight />
                </span>
              }
            />

            <RowSubcategory className="md:hidden" title={page.title} icon={<ChevronRight />} />
          </UILink>
        ))}
      </div>
      {hasDivider && (
        <div className="mt-16 hidden w-full border-b-[1px] border-border-dark md:flex" />
      )}
    </div>
  )
}

export default Listing

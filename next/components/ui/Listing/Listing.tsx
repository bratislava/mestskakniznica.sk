import { useUIContext } from '@bratislava/common-frontend-ui-context';
import cx from 'classnames';
import { ReactComponent as ChevronRight } from '../../assets/images/chevron-right.svg';
import { CallToAction } from '../CallToAction/CallToAction';
import { Link } from '../Link/Link';
import { RowSubcategory } from '../RowSubcategory/RowSubcategory';

export interface ListingProps {
  className?: string;
  title?: string;
  url?: string;
  moreLinkTitle?: string;
  pages: { title: string; url: string; moreLinkTitle: string }[];
  hasDivider?: boolean;
}

export function Listing({
  className,
  title,
  url,
  moreLinkTitle,
  pages,
  hasDivider,
}: ListingProps) {
  const { Link: UILink } = useUIContext();
  return (
    <div className={cx(className)}>
      {moreLinkTitle && url && (
        <Link href={url} hasIcon={true}>
          <div className="flex w-full justify-between items-center">
            <h2 className="text-md lg:text-lg normal-case">{title}</h2>
            {moreLinkTitle}
          </div>
        </Link>
      )}

      <div className="grid grid-cols-1 gap-y-2 mt-4 md:mt-6 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
        {pages?.map((page) => (
          <UILink href={page.url}>
            <CallToAction
              className="hidden md:flex w-full h-[180px] mt-0"
              key={page.title}
              title={page.title}
              href={page.url}
              bottomText={page.moreLinkTitle}
              hasIcon={false}
              uppercase={false}
              customIcon={
                <span className="inline-flex ml-2">
                  <ChevronRight />
                </span>
              }
            />

            <RowSubcategory
              className="md:hidden"
              title={page.title}
              icon={<ChevronRight />}
            />
          </UILink>
        ))}
      </div>
      {hasDivider && (
        <div className="hidden mt-16 border-b-[1px] border-gray-700 w-full md:flex" />
      )}
    </div>
  );
}

export default Listing;

import cx from 'classnames';
import { Link } from '../Link/Link';
import { ReactComponent as Home } from '../../assets/images/home.svg';
import { ReactComponent as ChevronRight } from '../../assets/images/chevron-right.svg';
import { Fragment } from 'react';

export interface BreadcrumbsProps {
  homeLabel?: string;
  items: IBreadcrumb[];
}

interface IBreadcrumb {
  title: string;
  url: string;
}

export const Breadcrumbs = ({
  items,
  homeLabel = 'Home',
}: BreadcrumbsProps) => (
  <div className=" flex text-sm h-[56px]">
    <Link href="/" className="py-4">
      <Home />
      <span className="sr-only">{homeLabel}</span>
    </Link>
    <div className="flex">
      {items.map((item) => {
        return (
          <Fragment key={item.url}>
            <div className="pl-[18px] py-6">
              <ChevronRight />
            </div>
            {item.url && item.url !== null ? (
              <Link
                href={item.url}
                className="py-4 pl-3 cursor-pointer"
                uppercase={false}
                size="large"
              >
                <a href={item.url} className="">
                  {item.title}
                </a>
              </Link>
            ) : (
              <div className="flex items-center gap-x-2.5 py-4 pl-3 text-[16px]">
                <div>{item.title}</div>
              </div>
            )}
          </Fragment>
        );
      })}
    </div>
  </div>
);

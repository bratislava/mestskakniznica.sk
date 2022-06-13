import {
  BlogPostFragment,
  DocumentCategoryFragment,
  PageCategoryFragment,
  PageFragment,
  ParentPageFragment,
} from '@bratislava/strapi-sdk-city-library';
import cx from 'classnames';
import Link from 'next/link';
import * as React from 'react';
import { useTranslation } from 'next-i18next';
import { ReactComponent as ArrowLeft } from '../../assets/images/arrow-left.svg';
import { ReactComponent as ChevronDown } from '../../assets/images/chevron-down.svg';
import { ReactComponent as ChevronRight } from '../../assets/images/chevron-right.svg';
import { ReactComponent as ChevronUp } from '../../assets/images/chevron-up.svg';
import { ReactComponent as Home } from '../../assets/images/home.svg';
import { pagePath } from '../../utils/page';

interface PageBreadcrumbsProps {
  page: PageFragment | ParentPageFragment | null | undefined;
  blogPost?: BlogPostFragment;
  documentCategory?: DocumentCategoryFragment;
}

interface BreadcrumbsProps {
  crumbs: { title: string; url: string | null }[];
  homeLabel?: string;
}

const BreadCrumbs = ({ crumbs, homeLabel = 'Home' }: BreadcrumbsProps) => (
  <>
    {crumbs.map((crumb, i) => {
      const last = i === crumbs.length - 1;
      const first = i === 0;

      return (
        <React.Fragment key={i}>
          {crumb.url ? (
            <Link href={crumb.url} passHref>
              <a className="flex-shrink" href={crumb.url}>
                {first ? (
                  <>
                    <Home className="cursor-pointer" />
                    <span className="sr-only">{homeLabel}</span>
                  </>
                ) : (
                  <span
                    style={{
                      textUnderlineOffset: 1,
                    }}
                    className={cx('cursor-pointer text-xs truncate', {
                      underline: !last,
                    })}
                  >
                    {crumb.title}
                  </span>
                )}
              </a>
            </Link>
          ) : (
            <span>{crumb.title}</span>
          )}
          {!last && (
            <span className="px-4">
              <ChevronRight />
            </span>
          )}
        </React.Fragment>
      );
    })}
  </>
);

// Mobile version
const MobilePageBreadcrumbs = ({ crumbs }: BreadcrumbsProps) => {
  const [isOpen, setOpen] = React.useState(false);
  const { t } = useTranslation('common');

  const primaryBreadcrumbs: { title: string; url: string | null }[] = [];
  const secondaryBreadcrumbs: { title: string; url: string | null }[] = [];

  //homepage
  primaryBreadcrumbs.push({ title: '', url: '/' });
  secondaryBreadcrumbs.push({ title: t('homepage'), url: '/' });

  // homepage > link1 > link2
  if (crumbs.length > 2) {
    primaryBreadcrumbs.push({ title: '...', url: '' });
    crumbs
      .slice(1, crumbs.length - 1)
      .map((crumb) => secondaryBreadcrumbs.push(crumb));
  }

  // homepage > link1
  if (crumbs.length > 1) {
    primaryBreadcrumbs.push(crumbs[crumbs.length - 1]);
  }

  return (
    <div className={cx('w-full overflow-hidden lg:hidden')}>
      <button
        onClick={() => setOpen((prevState) => !prevState)}
        className={cx(
          'flex items-center justify-between w-full cursor-pointer py-4 overflow-x-auto'
        )}
      >
        <div className="w-fit flex flex-row flex-shrink items-center">
          <BreadCrumbs crumbs={primaryBreadcrumbs} homeLabel={t('homepage')} />
        </div>
        <div className="ml-4">{isOpen ? <ChevronUp /> : <ChevronDown />}</div>
      </button>

      <div
        className={cx('transform transition-all duration-200 ease-linear', {
          'h-0': !isOpen,
          'h-full mt-3': isOpen,
        })}
      >
        <div className="flex flex-col space-y-3">
          {secondaryBreadcrumbs.map((crumb) => (
            <Link href={crumb.url || ''} passHref key={crumb.title}>
              <a>
                <div className="flex space-x-4 items-center" key={crumb.title}>
                  <ArrowLeft />
                  <span>{crumb.title}</span>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

// Desktop version
const PageBreadcrumbs = ({
  page,
  blogPost,
  documentCategory,
}: PageBreadcrumbsProps) => {
  const { t } = useTranslation('common');

  const crumbs: { title: string; url: string | null }[] = [];

  // document category pagee
  if (documentCategory) {
    crumbs.push({
      title: documentCategory.name ?? '',
      url: `/documents/${documentCategory.slug}` ?? '#',
    });
  }
  // blog post page
  if (page?.layout === 'blog_posts' && blogPost) {
    crumbs.push({
      title: blogPost.title ?? '',
      url: `${t('blog_slug') + pagePath(blogPost)}`,
    });
  }

  // self, if is only subpage and not pagecategory, to avoid mutliple appearance
  if (page?.pageCategory?.pageLink?.page?.slug !== page?.slug) {
    crumbs.push({ title: page?.title ?? '', url: `/${pagePath(page)}` });
  }

  // get parent pagecategory
  let current:
    | Pick<PageCategoryFragment, 'parentCategory' | 'title' | 'pageLink'>
    | undefined
    | null = page?.pageCategory || null;

  while (current) {
    crumbs.push({
      title: current.pageLink?.page?.title ?? '',
      url: current === page ? null : `/${pagePath(current.pageLink?.page)}`,
    });
    current = current.parentCategory;
  }

  // homepage
  crumbs.push({ title: '', url: '/' });

  crumbs.reverse();

  return (
    <>
      <div className="hidden lg:flex flex-row py-[18px] items-center">
        <BreadCrumbs crumbs={crumbs} homeLabel={t('homepage')} />
      </div>
      <MobilePageBreadcrumbs crumbs={crumbs} />
    </>
  );
};

export default PageBreadcrumbs;

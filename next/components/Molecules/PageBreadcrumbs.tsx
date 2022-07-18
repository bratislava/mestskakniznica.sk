import ArrowLeft from '@assets/images/arrow-left.svg'
import ChevronDown from '@assets/images/chevron-down.svg'
import ChevronRight from '@assets/images/chevron-right.svg'
import ChevronUp from '@assets/images/chevron-up.svg'
import Home from '@assets/images/home.svg'
import {
  BlogPostEntity,
  Category,
  FileCategoryEntity,
  PageEntity,
} from '@bratislava/strapi-sdk-city-library'
import cx from 'classnames'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import * as React from 'react'

import { pagePath } from '../../utils/page'

interface PageBreadcrumbsProps {
  page: PageEntity | null | undefined
  blogPost?: BlogPostEntity
  documentCategory?: FileCategoryEntity
}

interface BreadcrumbsProps {
  crumbs: { title: string; url: string | null }[]
  homeLabel?: string
}

function BreadCrumbs({ crumbs, homeLabel = 'Home' }: BreadcrumbsProps) {
  return <>
    {crumbs.map((crumb, i) => {
      const last = i === crumbs.length - 1
      const first = i === 0

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
      )
    })}
  </>
}

// Mobile version
function MobilePageBreadcrumbs({ crumbs }: BreadcrumbsProps) {
  const [isOpen, setOpen] = React.useState(false)
  const { t } = useTranslation('common')

  const primaryBreadcrumbs: { title: string; url: string | null }[] = []
  const secondaryBreadcrumbs: { title: string; url: string | null }[] = []

  // homepage
  primaryBreadcrumbs.push({ title: '', url: '/' })
  secondaryBreadcrumbs.push({ title: t('homepage'), url: '/' })

  // homepage > link1 > link2
  if (crumbs.length > 2) {
    primaryBreadcrumbs.push({ title: '...', url: '' })
    crumbs.slice(1, - 1).map((crumb) => secondaryBreadcrumbs.push(crumb))
  }

  // homepage > link1
  if (crumbs.length > 1) {
    primaryBreadcrumbs.push(crumbs[crumbs.length - 1])
  }

  return (
    <div className={cx('w-full overflow-hidden lg:hidden')}>
      <button
        onClick={() => setOpen((prevState) => !prevState)}
        className={cx('flex items-center justify-between w-full cursor-pointer py-4 overflow-x-auto')}
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
  )
}

// Desktop version
function PageBreadcrumbs({ page, blogPost, documentCategory }: PageBreadcrumbsProps) {
  const { t } = useTranslation('common')

  const crumbs: { title: string; url: string | null }[] = []

  // document category pagee
  if (documentCategory) {
    crumbs.push({
      title: documentCategory?.attributes?.name ?? '',
      url: `${t('documents_category_slug')}${documentCategory?.attributes?.slug}` ?? '#',
    })
  }
  // blog post page
  if (page?.attributes?.layout === 'blog_posts' && blogPost) {
    crumbs.push({
      title: blogPost?.attributes?.title ?? '',
      url: `${t('blog_slug') + pagePath(blogPost?.attributes)}`,
    })
  }

  // self, if is only subpage and not pagecategory, to avoid mutliple appearance
  if (page?.attributes?.pageCategory?.data?.attributes?.pageLink?.page?.data?.attributes?.slug !== page?.attributes?.slug) {
    crumbs.push({ title: page?.attributes?.title ?? '', url: `/${pagePath(page?.attributes)}` })
  }

  // get parent pagecategory
  let current: Pick<Category, 'parentCategory' | 'title' | 'pageLink'> | undefined | null =
    page?.attributes?.pageCategory?.data?.attributes || null

  while (current) {
    crumbs.push({
      title: current.pageLink?.page?.data?.attributes?.title ?? '',
      url: current === page ? null : `/${pagePath(current.pageLink?.page?.data?.attributes)}`,
    })
    current = current.parentCategory?.data?.attributes
  }

  // homepage
  crumbs.push({ title: '', url: '/' })

  crumbs.reverse()

  return (
    <>
      <div className="hidden lg:flex flex-row py-[18px] items-center">
        <BreadCrumbs crumbs={crumbs} homeLabel={t('homepage')} />
      </div>
      <MobilePageBreadcrumbs crumbs={crumbs} />
    </>
  )
}

export default PageBreadcrumbs

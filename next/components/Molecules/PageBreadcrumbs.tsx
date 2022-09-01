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

import { pagePath } from '../../utils/page'
import { Fragment, useState } from 'react'
import Breadcrumbs from './Breadcrumbs'

interface PageBreadcrumbsProps {
  page: PageEntity | null | undefined
  blogPost?: BlogPostEntity
  documentCategory?: FileCategoryEntity
  breadCrumbs?: { title: string; url: string | null }[]
}

function PageBreadcrumbs({ page, blogPost, documentCategory, breadCrumbs }: PageBreadcrumbsProps) {
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
  if (
    page?.attributes?.pageCategory?.data?.attributes?.pageLink?.page?.data?.attributes?.slug !==
    page?.attributes?.slug
  ) {
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

  return <Breadcrumbs crumbs={crumbs} />
}

export default PageBreadcrumbs

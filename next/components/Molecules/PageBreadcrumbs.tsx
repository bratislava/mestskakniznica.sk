import Breadcrumbs, { BreadcrumbListItem } from '@modules/breadcrumbs/Breadcrumbs'
import { BlogPostEntity, Category, FileCategoryEntity, PageEntity } from '@services/graphql'
import { pagePath } from '@utils/page'
import { useTranslation } from 'next-i18next'

interface PageBreadcrumbsProps {
  page: PageEntity | null | undefined
  blogPost?: BlogPostEntity
  documentCategory?: FileCategoryEntity
  breadCrumbs?: { title: string; url: string | null }[]
}

const PageBreadcrumbs = ({ page, blogPost, breadCrumbs }: PageBreadcrumbsProps) => {
  const { t } = useTranslation('common')

  const crumbs: BreadcrumbListItem[] = []

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
      url: current === page ? undefined : `/${pagePath(current.pageLink?.page?.data?.attributes)}`,
    })
    current = current.parentCategory?.data?.attributes
  }

  crumbs.reverse()

  return <Breadcrumbs crumbs={crumbs} />
}

export default PageBreadcrumbs

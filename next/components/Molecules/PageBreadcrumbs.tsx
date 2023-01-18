import Breadcrumbs, { BreadcrumbListItem } from '@modules/breadcrumbs/Breadcrumbs'
import { PageEntity, PageSitemapParentFragment } from '@services/graphql'
import { useMemo } from 'react'

interface PageBreadcrumbsProps {
  page: PageEntity | null | undefined
}

const PageBreadcrumbs = ({ page }: PageBreadcrumbsProps) => {
  const breadcrumbs = useMemo(() => {
    if (!page?.attributes) {
      return []
    }

    const crumbs: BreadcrumbListItem[] = [{ title: page.attributes.title }]
    let current: PageSitemapParentFragment | null | undefined =
      page?.attributes?.sitemapParent?.data

    while (current?.attributes) {
      crumbs.push({
        title: current.attributes?.title,
        url: current.attributes.slug,
      })
      current = current.attributes?.sitemapParent?.data
    }

    return crumbs.reverse()
  }, [page])

  return <Breadcrumbs crumbs={breadcrumbs} />
}

export default PageBreadcrumbs

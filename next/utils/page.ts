import { SidebarProps, TableRowProps, TExternalLinksSection } from '@bratislava/ui-city-library'
import {
  CategoryEntity,
  ExternalLinkFragment,
  FlatTextFragment,
  TableRowFragment,
} from '@services/graphql'
import groupBy from 'lodash/groupBy'

// SideBar for content with sidebar
export const parseSidebar = (
  pageCategory: CategoryEntity | undefined,
  activePageId: string | null
): SidebarProps | undefined => {
  if (!pageCategory) return undefined

  return {
    title: pageCategory?.attributes?.pageLink?.title ?? '',
    id: pageCategory?.attributes?.pageLink?.page?.data?.id ?? null,
    categories:
      pageCategory?.attributes?.pages?.map((p) => ({
        title: p?.page?.data?.attributes?.title ?? '',
        id: p?.page?.data?.id ?? null,
      })) ?? [],
    activeCategory:
      pageCategory?.attributes?.pages?.findIndex((x) => x?.page?.data?.id === activePageId) ?? 0,
  }
}

export const groupByTableCategory = (
  tableRows: (TableRowFragment | undefined | null)[]
): { title: string; rows: TableRowProps[] }[] => {
  const grouped = groupBy(tableRows, 'tableCategory')
  const groupedRows = Object.keys(grouped).map((key) => ({
    title: key,
    rows: grouped[key],
  }))

  return groupedRows.map((groupedRow) => ({
    title: groupedRow.title,
    rows:
      groupedRow.rows?.map((row) => ({
        label: row?.label ?? '',
        value: row?.value ?? '',
        valueAlign: row?.valueAlign ?? 'start',
      })) ?? [],
  }))
}

// Group by for accordion
export const groupByAccordionCategory = (
  tableRows: (TableRowFragment | undefined | null)[]
): { title: string; tables: { title: string; rows: TableRowProps[] }[] }[] => {
  const groupedItems = groupBy(tableRows, 'accordionCategory')
  return Object.keys(groupedItems).map((key) => ({
    title: key,
    tables: groupByTableCategory(groupedItems[key]),
  }))
}

// Page Accordion Items
export const groupByCategory = <T>(items: T[]) => {
  const grouped = groupBy(items, 'category')
  return Object.keys(grouped).map((key) => ({
    category: key,
    items: grouped[key],
  }))
}

// Page external links sections
export const groupByLinksCategory = (
  descriptions?: Array<FlatTextFragment | null | undefined>,
  links?: Array<ExternalLinkFragment | null | undefined>
): TExternalLinksSection[] => {
  const groupedLinks = links ? groupByCategory(links) : []
  const groupedDescriptions = descriptions ? groupByCategory(descriptions) : []

  return groupedLinks.map((link) => ({
    description:
      groupedDescriptions.find((d) => d.category === link.category)?.items[0]?.content ?? undefined,
    links: link.items?.map((item) => ({
      title: item?.title ?? '',
      url: item?.url ?? '#',
    })),
  }))
}

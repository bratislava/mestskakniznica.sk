import { SubpageItemProps, TableRowProps } from '@bratislava/ui-city-library'
import { SubpagesFragment, TableRowFragment } from '@services/graphql'
import { isPresent } from '@utils/utils'
import groupBy from 'lodash/groupBy'

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

// Subpages
export const parseSubpages = (subpages: SubpagesFragment): SubpageItemProps[] =>
  subpages?.subpages?.filter(isPresent).map((subpage) => ({
    title: subpage?.title ?? '',
    description: subpage?.description ?? '',
    id: subpage?.page?.data?.id,
  })) ?? []

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

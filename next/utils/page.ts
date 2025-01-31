import groupBy from 'lodash/groupBy'

import { SubpageItemProps, TableRowWithIdProp } from '@/components/ui'
import {
  Enum_Componentaccordionitemstablerow_Valuealign,
  SubpagesSectionFragment,
  TableRowWithIdFragment,
} from '@/services/graphql'
import { isPresent } from '@/utils/utils'

export const groupByTableCategory = (
  tableRows: (TableRowWithIdFragment | undefined | null)[]
): { title: string; rows: TableRowWithIdProp[] }[] => {
  const grouped = groupBy(tableRows, 'tableCategory')
  const groupedRows = Object.keys(grouped).map((key) => ({
    title: key,
    rows: grouped[key],
  }))

  return groupedRows.map((groupedRow) => ({
    title: groupedRow.title,
    rows:
      groupedRow.rows?.map((row) => ({
        id: row?.id ?? '',
        label: row?.label ?? '',
        value: row?.value ?? '',
        valueAlign: row?.valueAlign ?? Enum_Componentaccordionitemstablerow_Valuealign.Start,
      })) ?? [],
  }))
}

// Subpages
export const parseSubpages = (subpages: SubpagesSectionFragment): SubpageItemProps[] =>
  subpages?.subpages?.filter(isPresent).map((subpage) => ({
    title: subpage?.title ?? '',
    description: subpage?.description ?? '',
    id: subpage?.page?.data?.id,
  })) ?? []

// Group by for accordion
export const groupByAccordionCategory = (
  tableRows: (TableRowWithIdFragment | undefined | null)[]
): { title: string; tables: { title: string; rows: TableRowWithIdProp[] }[] }[] => {
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

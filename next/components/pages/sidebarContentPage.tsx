import * as React from 'react'
import PageBreadcrumbs from '../../components/Molecules/PageBreadcrumbs'
import Sections from '../../components/Molecules/Sections'

import { PageFragment } from '@bratislava/strapi-sdk-city-library'
import { parsePageLink, parseSidebar } from '../../utils/page'

import { SectionContainer, Sidebar } from '@bratislava/ui-city-library'

import { useUIContext } from '@bratislava/common-frontend-ui-context'

export interface SidebarContentProps {
  page: PageFragment
}

const SidebarContentPage = ({ page }: SidebarContentProps) => {
  const { Markdown: UIMarkdown } = useUIContext()
  const sideBar = parseSidebar(page?.pageCategory ?? undefined, page?.slug ?? '')

  return (
    <>
      <SectionContainer>
        <PageBreadcrumbs page={page} />
      </SectionContainer>
      <SectionContainer>
        <div className="grid grid-cols-12">
          {/* <div className="col-span-12 md:col-span-5 col-start-1"></div> */}
          {/* Sidebar */}
          {sideBar && (
            <div className="hidden md:flex md:col-span-5 row-start-3 col-start-1 mt-8">
              <Sidebar
                href={parsePageLink(page?.pageCategory?.pageLink)?.url ?? '#'}
                className="w-4/5"
                title={sideBar.title}
                categories={sideBar.categories}
                activeCategory={sideBar.activeCategory}
              />
            </div>
          )}
          <div className="col-span-12 row-start-2 mt-6 border-b-[1px] border-gray-700" />
          {/* Title */}
          <h1 className="col-span-12 mt-16 text-2xl md:col-span-7 row-start-1 md:col-start-6">{page?.title ?? ''}</h1>
          {/* Description*/}
          <div className="col-span-12 md:col-span-7 mt-8">
            {page?.description && (
              <UIMarkdown paragraphClassName="text-sm" className="w-full text-sm" content={page.description ?? ''} />
            )}

            {/* Sections */}
            {page?.sections && <Sections sections={page.sections} />}
          </div>
        </div>

        <div className="flex mt-8"></div>
      </SectionContainer>
    </>
  )
}

export default SidebarContentPage

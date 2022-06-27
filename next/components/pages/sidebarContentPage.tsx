import { useUIContext } from '@bratislava/common-frontend-ui-context'
import { PageFragment } from '@bratislava/strapi-sdk-city-library'
import { SectionContainer, Sidebar } from '@bratislava/ui-city-library'
import * as React from 'react'

import { parsePageLink, parseSidebar } from '../../utils/page'
import PageBreadcrumbs from "../Molecules/PageBreadcrumbs"
import Sections from "../Molecules/Sections"

export interface SidebarContentProps {
  page: PageFragment
}

function SidebarContentPage({ page }: SidebarContentProps) {
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
          {/* Description */}
          <div className="col-span-12 md:col-span-7 mt-8">
            {page?.description && (
              <UIMarkdown paragraphClassName="text-sm" className="w-full text-sm" content={page.description ?? ''} />
            )}

            {/* Sections */}
            {page?.sections && <Sections pageTitle={page?.title} sections={page.sections} />}
          </div>
        </div>

        <div className="flex mt-8" />
      </SectionContainer>
    </>
  )
}

export default SidebarContentPage

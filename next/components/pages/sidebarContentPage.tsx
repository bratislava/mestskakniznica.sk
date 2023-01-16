import { PageEntity } from '@bratislava/strapi-sdk-city-library'
import { SectionContainer, Sidebar } from '@bratislava/ui-city-library'
import { parsePageLink, parseSidebar } from '@utils/page'
import Image from 'next/image'

import PageBreadcrumbs from '../Molecules/PageBreadcrumbs'
import Sections from '../Molecules/Sections'

export interface SidebarContentProps {
  page: PageEntity
}

const SidebarContentPage = ({ page }: SidebarContentProps) => {
  const sideBar = parseSidebar(
    page?.attributes?.pageCategory?.data ?? undefined,
    page?.attributes?.slug ?? ''
  )

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
            <div className="col-start-1 row-start-3 mt-8 hidden md:col-span-5 md:flex">
              <Sidebar
                href={
                  parsePageLink(page?.attributes?.pageCategory?.data?.attributes?.pageLink)?.url ??
                  '#'
                }
                className="w-4/5"
                title={sideBar.title}
                categories={sideBar.categories}
                activeCategory={sideBar.activeCategory}
              />
            </div>
          )}
          <div className="col-span-12 row-start-2 mt-6 border-b-[1px] border-border-dark" />
          {/* Title */}
          <h1 className="col-span-12 row-start-1 mt-16 text-h1 md:col-span-7 md:col-start-6">
            {page?.attributes?.title}
          </h1>
          <div className="col-span-12 mt-8 md:col-span-7">
            {/* Perex */}
            {page?.attributes?.perex && (
              <div className="mb-6 w-full text-h3">{page.attributes.perex}</div>
            )}
            {/* Cover image, empty alt on purpose */}
            {page?.attributes?.listingImage?.data?.attributes?.url && (
              <div className="aspect-w-16 aspect-h-9 mb-8">
                <Image
                  src={page.attributes.listingImage.data.attributes.url}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Sections */}
            {page?.attributes?.sections && (
              <Sections pageTitle={page?.attributes?.title} sections={page?.attributes.sections} />
            )}
          </div>
        </div>

        <div className="mt-8 flex" />
      </SectionContainer>
    </>
  )
}

export default SidebarContentPage

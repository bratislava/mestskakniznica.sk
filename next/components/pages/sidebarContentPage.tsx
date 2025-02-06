import Image from 'next/image'

import PageBreadcrumbs from '@/components/Molecules/PageBreadcrumbs'
import Sections from '@/components/Molecules/Sections'
import { SectionContainer, Sidebar } from '@/components/ui'
import { PageEntityFragment } from '@/services/graphql'
import { isDefined } from '@/utils/isDefined'

export interface SidebarContentProps {
  page: PageEntityFragment
}

const SidebarContentPage = ({ page }: SidebarContentProps) => {
  return (
    <>
      <SectionContainer>
        <PageBreadcrumbs />
      </SectionContainer>
      <SectionContainer>
        <div className="grid grid-cols-12">
          {/* <div className="col-span-12 md:col-span-5 col-start-1"></div> */}
          {/* Sidebar */}

          <div className="col-start-1 row-start-3 mt-8 hidden md:col-span-5 md:flex">
            <Sidebar className="w-4/5" />
          </div>
          <div className="col-span-12 row-start-2 mt-6 border-b border-border-dark" />
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
              <div className="relative mb-8 aspect-video">
                <Image
                  src={page.attributes.listingImage.data.attributes.url}
                  alt=""
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}

            {/* Sections */}
            <Sections sections={page?.attributes?.sections?.filter(isDefined) ?? []} />
          </div>
        </div>

        <div className="mt-8 flex" />
      </SectionContainer>
    </>
  )
}

export default SidebarContentPage

import { useTranslation } from 'next-i18next/pages'
import { Fragment } from 'react'

import BranchDetailsServices from '@/components/Molecules/BranchDetails/BranchDetailsServices'
import BranchDetailsWhere from '@/components/Molecules/BranchDetails/BranchDetailsWhere'
import ContactsAndOpeningHours from '@/components/Molecules/BranchDetails/ContactsAndOpeningHours'
import ContactUsSidebar from '@/components/Molecules/BranchDetails/ContactUsSidebar/ContactUsSidebar'
import ImageGallery from '@/modules/common/ImageGallery/ImageGallery'
import MLink from '@/modules/common/MLink'
import RichText from '@/modules/formatting/RichText'
import { BranchEntityFragment } from '@/services/graphql'
import { isDefined } from '@/utils/isDefined'

export interface PageProps {
  branch: BranchEntityFragment
}

const BranchDetails = ({ branch }: PageProps) => {
  const { t } = useTranslation()

  const AnchorLink = (anchor: string, text: string) => (
    <MLink href={anchor} className="cursor-pointer whitespace-nowrap uppercase hover:underline">
      {text}
    </MLink>
  )

  if (!branch) {
    return null
  }

  const { title, body, servicePages, medias } = branch
  // Strapi 5 relations come back as `(T | null)[]`.
  const subBranches = branch.subBranches.filter(isDefined)
  const branchMedias = medias.filter(isDefined)

  return (
    <>
      <div className="py-8">
        {branchMedias.length > 0 && <ImageGallery images={branchMedias} variant="aside" />}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0px,1fr)_380px] lg:gap-30">
        <div>
          <div className="border-b border-border-dark pb-10">
            <div className="py-3 text-[32px]">
              <div className="pb-6">
                <h1 className="text-h1">{title}</h1>

                <div className="-mx-4 -mb-2 overflow-x-auto pb-2">
                  <div className="flex gap-x-6 px-4 pt-9 text-sm uppercase">
                    {AnchorLink('#description', t('branchDetails.description'))}
                    {servicePages.length
                      ? AnchorLink('#services', t('branchDetails.services'))
                      : null}
                    {subBranches.length
                      ? AnchorLink('#sections', t('branchDetails.sections'))
                      : null}
                    {AnchorLink('#where', t('branchDetails.localityWhereToFind'))}
                  </div>
                </div>
              </div>
            </div>

            {body?.trim() ? (
              <div id="description">
                <h2 className="text-h3">{t('branchDetails.description')}</h2>
                <div className="flex flex-col gap-4 pt-5 text-[16px] text-foreground-body">
                  <RichText content={body} />
                  {subBranches.map((subBranch) => {
                    const { body: subBranchBody, title: subBranchTitle } = subBranch

                    return subBranchBody?.trim() ? (
                      <Fragment key={subBranch.documentId}>
                        <h3 className="text-h3 not-first:mt-6">{subBranchTitle}</h3>
                        <RichText content={subBranchBody} />
                      </Fragment>
                    ) : null
                  })}
                </div>
              </div>
            ) : null}
          </div>

          <BranchDetailsServices branch={branch} />

          {/* TODO: Extract events */}
          {/* {(events?.length || 0) > 0 && ( */}
          {/*  <div className="hidden border-b border-border-dark py-12" id="events"> */}
          {/*    <div className="text-h3">{t('branchDetails.events')}</div> */}
          {/*    <div className="grid grid-cols-1 md:grid-cols-2"> */}
          {/*      {events?.map((event) => { */}
          {/*        const eventBranch = getBranchInfo(event?.branch?.data) */}

          {/*        return ( */}
          {/*          <div className="h-23 w-full cursor-pointer" key={event.id}> */}
          {/*            <div className="h-10 pt-4 text-foreground-body"> */}
          {/*              <Link href={event?.slug || ''} passHref> */}
          {/*                <a href={event?.slug || ''} className="flex"> */}
          {/*                  <div className="flex h-16 w-16 bg-promo-yellow"> */}
          {/*                    <EventDetailsDateBox */}
          {/*                      dateFrom={event?.dateFrom || ''} */}
          {/*                      dateTo={event?.dateTo || ''} */}
          {/*                      textClassname="text-[18px]" */}
          {/*                      wrapperClassname="w-16" */}
          {/*                    /> */}
          {/*                  </div> */}

          {/*                  <div className="overflow-hidden pl-5"> */}
          {/*                    <div className="overflow-hidden text-ellipsis whitespace-pre text-foreground-heading hover:underline md:w-52"> */}
          {/*                      {event?.title} */}
          {/*                    </div> */}
          {/*                    <div className="pt-[5px] text-sm text-foreground-body"> */}
          {/*                      <FormatEventDateRange */}
          {/*                        dateFrom={event?.dateFrom} */}
          {/*                        dateTo={event?.dateTo} */}
          {/*                      /> */}
          {/*                    </div> */}
          {/*                    {eventBranch?.title && ( */}
          {/*                      <div className="overflow-hidden text-ellipsis whitespace-pre text-sm text-foreground-body md:w-52"> */}
          {/*                        &#9679; {eventBranch.title} */}
          {/*                      </div> */}
          {/*                    )} */}
          {/*                  </div> */}
          {/*                </a> */}
          {/*              </Link> */}
          {/*            </div> */}
          {/*          </div> */}
          {/*        ) */}
          {/*      })} */}
          {/*    </div> */}
          {/*    <div className="pt-6"> */}
          {/*      <Link href={eventsListingUrl || ''} passHref> */}
          {/*        <a href={eventsListingUrl} className="cursor-pointer text-base uppercase"> */}
          {/*          {t('branchDetails.moreEvents')} {'>'} */}
          {/*        </a> */}
          {/*      </Link> */}
          {/*    </div> */}
          {/*  </div> */}
          {/* )} */}

          {(subBranches || branch) && (
            <ContactsAndOpeningHours branch={branch} branches={subBranches} />
          )}
          <BranchDetailsWhere branch={branch} />
        </div>
        <ContactUsSidebar branch={branch} />
      </div>
    </>
  )
}

export default BranchDetails

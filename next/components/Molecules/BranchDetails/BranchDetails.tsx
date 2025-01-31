import { useTranslation } from 'next-i18next'
import { Fragment } from 'react'

import BranchDetailsServices from '@/components/Molecules/BranchDetails/BranchDetailsServices'
import BranchDetailsWhere from '@/components/Molecules/BranchDetails/BranchDetailsWhere'
import ContactsAndOpeningHours from '@/components/Molecules/BranchDetails/ContactsAndOpeningHours'
import ContactUsSidebar from '@/components/Molecules/BranchDetails/ContactUsSidebar/ContactUsSidebar'
import ImageGallery from '@/modules/common/ImageGallery/ImageGallery'
import MLink from '@/modules/common/MLink'
import RichText from '@/modules/formatting/RichText'
import { BranchEntityFragment } from '@/services/graphql'

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

  if (!branch?.attributes) {
    return null
  }

  const { title, body, servicePages, subBranches, medias } = branch.attributes

  return (
    <>
      <div className="py-8">
        {medias?.data && <ImageGallery images={medias.data} variant="aside" />}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0px,_1fr)_380px] lg:gap-30">
        <div>
          <div className="border-b border-border-dark pb-10">
            <div className="py-[12px] text-[32px]">
              <div className="pb-6">
                <h1 className="text-h1">{title}</h1>

                <div className="-mx-4 -mb-2 overflow-x-auto pb-2">
                  <div className="flex gap-x-6 px-4 pt-9 text-sm uppercase">
                    {AnchorLink('#description', t('branchDetails.description'))}
                    {servicePages?.data.length
                      ? AnchorLink('#services', t('branchDetails.services'))
                      : null}
                    {subBranches?.data.length
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
                  {subBranches?.data.map((subBranch) => {
                    const { body: subBranchBody, title: subBranchTitle } =
                      subBranch.attributes ?? {}
                    return subBranchBody?.trim() ? (
                      <Fragment key={subBranch.id}>
                        <h3 className="text-h3 [&:not(:first-child)]:mt-6">{subBranchTitle}</h3>
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
          {/*        const eventBranch = getBranchInfo(event.attributes?.branch?.data) */}

          {/*        return ( */}
          {/*          <div className="h-23 w-full cursor-pointer" key={event.id}> */}
          {/*            <div className="h-10 pt-4 text-foreground-body"> */}
          {/*              <Link href={event.attributes?.slug || ''} passHref> */}
          {/*                <a href={event.attributes?.slug || ''} className="flex"> */}
          {/*                  <div className="flex h-16 w-16 bg-promo-yellow"> */}
          {/*                    <EventDetailsDateBox */}
          {/*                      dateFrom={event.attributes?.dateFrom || ''} */}
          {/*                      dateTo={event.attributes?.dateTo || ''} */}
          {/*                      textClassname="text-[18px]" */}
          {/*                      wrapperClassname="w-16" */}
          {/*                    /> */}
          {/*                  </div> */}

          {/*                  <div className="overflow-hidden pl-5"> */}
          {/*                    <div className="overflow-hidden text-ellipsis whitespace-pre text-foreground-heading hover:underline md:w-52"> */}
          {/*                      {event.attributes?.title} */}
          {/*                    </div> */}
          {/*                    <div className="pt-[5px] text-sm text-foreground-body"> */}
          {/*                      <FormatEventDateRange */}
          {/*                        dateFrom={event?.attributes?.dateFrom} */}
          {/*                        dateTo={event?.attributes?.dateTo} */}
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
            <ContactsAndOpeningHours branch={branch} branches={subBranches?.data} />
          )}
          <BranchDetailsWhere branch={branch} />
        </div>
        <ContactUsSidebar branch={branch} />
      </div>
    </>
  )
}

export default BranchDetails

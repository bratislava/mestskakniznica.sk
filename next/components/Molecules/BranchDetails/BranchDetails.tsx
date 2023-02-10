import LocalityDetailsContactUs from '@components/Molecules/BranchDetails/BranchDetailsContactUs'
import BranchDetailsServices from '@components/Molecules/BranchDetails/BranchDetailsServices'
import LocalityDetailsSubBranches from '@components/Molecules/BranchDetails/BranchDetailsSubBranches'
import BranchDetailsWhere from '@components/Molecules/BranchDetails/BranchDetailsWhere'
import ImageGallery from '@modules/common/ImageGallery/ImageGallery'
import MLink from '@modules/common/MLink'
import RichText from '@modules/formatting/RichText'
import { BranchEntityFragment } from '@services/graphql'
import { useTranslation } from 'next-i18next'

export interface PageProps {
  branch: BranchEntityFragment
}

const LocalityDetails = ({ branch }: PageProps) => {
  const { t } = useTranslation('common')

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
              <div className="pb-8">
                <h1 className="text-h1">{title}</h1>

                <div className="-mx-4 overflow-x-auto">
                  <div className="flex gap-x-6 px-4 pt-9 text-sm uppercase">
                    {AnchorLink('#description', t('description'))}
                    {servicePages?.data.length ? AnchorLink('#services', t('services')) : null}
                    {subBranches?.data.length ? AnchorLink('#sections', t('sections')) : null}
                    {AnchorLink('#where', t('localityWhereToFind'))}
                  </div>
                </div>
              </div>
            </div>

            {/* TODO: Extract description from subbranches */}
            {body?.trim() ? (
              <div id="description">
                <h3 className="text-h3">{t('description')}</h3>
                <div className="pt-5 text-[16px] text-foreground-body">
                  <RichText content={body} />
                </div>
              </div>
            ) : null}
          </div>

          <BranchDetailsServices branch={branch} />

          {/* TODO: Extract events */}
          {/* {(events?.length || 0) > 0 && ( */}
          {/*  <div className="hidden border-b border-border-dark py-12" id="events"> */}
          {/*    <div className="text-h3">{t('events')}</div> */}
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
          {/*          {t('moreEvents')} {'>'} */}
          {/*        </a> */}
          {/*      </Link> */}
          {/*    </div> */}
          {/*  </div> */}
          {/* )} */}

          <LocalityDetailsSubBranches branch={branch} />
          <BranchDetailsWhere branch={branch} />
        </div>
        <LocalityDetailsContactUs branch={branch} />
      </div>
    </>
  )
}

export default LocalityDetails

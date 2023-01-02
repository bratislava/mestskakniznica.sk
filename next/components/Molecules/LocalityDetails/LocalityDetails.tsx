import BusinessSvg from '@assets/images/business.svg'
import MailSvg from '@assets/images/mail.svg'
import PhoneSvg from '@assets/images/phone.svg'
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import { BranchEntityFragment } from '@bratislava/strapi-sdk-city-library'
import LocalityDetailsContactUs from '@components/Molecules/LocalityDetails/LocalityDetailsContactUs'
import LocalityDetailsWhere from '@components/Molecules/LocalityDetails/LocalityDetailsWhere'
import Accordion from '@modules/common/Accordion'
import MLink from '@modules/common/MLink'
import { useTranslation } from 'next-i18next'

export interface PageProps {
  branch: BranchEntityFragment
}

const LocalityDetails = ({ branch }: PageProps) => {
  const { Markdown: UIMarkdown } = useUIContext()
  const { t } = useTranslation('common')

  const AnchorLink = (anchor: string, text: string) => (
    <MLink href={anchor} className="cursor-pointer whitespace-nowrap uppercase hover:underline">
      {text}
    </MLink>
  )

  if (!branch?.attributes) {
    return null
  }

  const { title, body, servicePages, subBranches } = branch.attributes

  return (
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

          {/* TODO: Extract description */}
          {body?.trim() ? (
            <div id="description">
              <h3 className="text-h3">{t('description')}</h3>
              <div className="pt-5 text-[16px] text-foreground-body">
                <UIMarkdown content={body} paragraphClassName="text-base" />
              </div>
            </div>
          ) : null}
        </div>

        {/* TODO services */}
        {/* <LocalityDetailsServices localityDetails={localityDetails} /> */}

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

        {/* TODO: Extract sections */}
        <div className="py-10" id="sections">
          <div className="text-[24px]">{t('sections')}</div>
          <div className="pt-5">
            {subBranches?.data.map((subBranch) => (
              <Accordion
                key={subBranch?.id}
                title={subBranch?.attributes?.title}
                type="sublocation"
                iconLeft={<BusinessSvg />}
              >
                <div className="mb-3">
                  {/* TODO replace by PhoneButton */}
                  {subBranch.attributes?.phone && (
                    <div className="mb-2 flex items-center">
                      <span className="mr-4 mb-[1px] inline-flex">
                        <PhoneSvg />
                      </span>
                      <a href={`tel:${subBranch.attributes?.phone}`} className="hover:underline">
                        {subBranch.attributes?.phone}
                      </a>
                    </div>
                  )}
                  {/* TODO replace by MailButton */}
                  {subBranch.attributes?.email && (
                    <div className="mb-2 flex items-center">
                      <span className="mr-4 mb-[1px] inline-flex">
                        <MailSvg />
                      </span>
                      <a href={`mailto:${subBranch.attributes?.email}`} className="hover:underline">
                        {subBranch.attributes?.email}
                      </a>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2 py-2">
                  {subBranch.attributes?.openingHours?.days.map((day) => (
                    <div className="flex max-w-[340px] justify-between">
                      <div>{day?.label}</div>
                      <div>{day?.time}</div>
                    </div>
                  ))}
                </div>
                {/* {createContent(subBranch. || { id: '' }, false, true)} */}
              </Accordion>
            ))}
          </div>
          <LocalityDetailsWhere branch={branch} />
        </div>
      </div>
      <LocalityDetailsContactUs branch={branch} />
    </div>
  )
}

export default LocalityDetails

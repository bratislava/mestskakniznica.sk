import NewsListingCard from '../../components/Molecules/NewsListingCard';
import Section from '../../components/AppLayout/Section';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { PageFragment } from '@bratislava/strapi-sdk-city-library';
import PageBreadcrumbs from '../../components/Molecules/PageBreadcrumbs';
import Sections from '../../components/Molecules/Sections';
import { useTranslation } from 'next-i18next';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Link, SectionContainer } from '@bratislava/ui-city-library';
import { IEvent } from '../../utils/types';
import Head from 'next/head';
import { convertPageToEventDisplay } from '../../utils/utils';

export interface PageProps {
  page: PageFragment;
  events: IEvent[];
  allNewsLink: string;
}

const EventPage = ({ page, events, allNewsLink }: PageProps) => {
  const { t } = useTranslation(['common', 'homepage']);
  const event = convertPageToEventDisplay(page);

  return (
    <>
      <SectionContainer>
        <PageBreadcrumbs page={page} />
      </SectionContainer>
      <SectionContainer>
        <div className="pt-16 pb-16">
          {page?.sections && (
            <Sections sections={page.sections} events={[event]} />
          )}
        </div>
        <Section>
          <div className="inline-flex pt-10 w-full">
            <h2 className="text-lg">{t('otherEvents')}</h2>
            <Link
              href={allNewsLink}
              hasIcon={true}
              title={t('eventsAll')}
              size="large"
              className="ml-auto"
            >
              {t('eventsAll')}
            </Link>
          </div>
          <section>
            <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 py-10 gap-1 sm:gap-6 lg:gap-10 items-stretch md:grid-cols-3 md:grid-cols-4">
              {events.map((event) => (
                <NewsListingCard event={event} key={event.slug} />
              ))}
            </div>
          </section>
        </Section>
      </SectionContainer>
    </>
  );
};

export default EventPage;

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { PageFragment } from '@bratislava/strapi-sdk-city-library';
import PageBreadcrumbs from '../../components/Molecules/PageBreadcrumbs';
import Sections from '../../components/Molecules/Sections';
import { IEvent } from '../../utils/types';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { SectionContainer } from '@bratislava/ui-city-library';

export interface PageProps {
  page: PageFragment;
  events: IEvent[];
  eventsListingUrl: string;
}

const LocalityPage = ({ page, events, eventsListingUrl }: PageProps) => {
  return (
    <>
      <SectionContainer>
        <PageBreadcrumbs page={page} />
      </SectionContainer>
      <SectionContainer>
        <div className="border-b border-gray-900">
          {page?.sections && (
            <Sections
              sections={page.sections}
              events={events}
              eventsListingUrl={eventsListingUrl}
            />
          )}
        </div>
      </SectionContainer>
    </>
  );
};

export default LocalityPage;

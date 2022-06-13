import * as React from 'react';
import PageBreadcrumbs from '../../components/Molecules/PageBreadcrumbs';
import Sections from '../../components/Molecules/Sections';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { PageFragment } from '@bratislava/strapi-sdk-city-library';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { PageTitle, SectionContainer } from '@bratislava/ui-city-library';

export interface FullContentPageProps {
  page: PageFragment;
}

const FullContentPage = ({ page }: FullContentPageProps) => {
  return (
    <>
      <SectionContainer>
        <PageBreadcrumbs page={page} />
      </SectionContainer>
      <SectionContainer>
        <PageTitle
          title={page?.title ?? ''}
          description={page?.description ?? ''}
        />

        {/* Sections */}
        {page?.sections && <Sections sections={page.sections ?? []} />}
      </SectionContainer>
    </>
  );
};

export default FullContentPage;

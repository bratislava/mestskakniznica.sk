import * as React from 'react';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  PageTitle,
  SectionContainer,
  Video,
} from '@bratislava/ui-city-library';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  BlogPostWithParentPageFragment,
  ComponentSeoSeo,
} from '@bratislava/strapi-sdk-city-library';
import Sections from '../Molecules/Sections';
import { getNumericLocalDate } from '../../utils/local-date';
import PageBreadcrumbs from '../Molecules/PageBreadcrumbs';
import { useTranslation } from 'next-i18next';
import DefaultPageLayout from '../layouts/DefaultPageLayout';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { useUIContext } from '@bratislava/common-frontend-ui-context';
import { formatDateToLocal } from '../../utils/utils';
import { usePageWrapperContext } from '../layouts/PageWrapper';

export interface BlogPostPageProps {
  blogPost: BlogPostWithParentPageFragment;
  Seo?: ComponentSeoSeo;
}

const BlogPostPage = ({ blogPost }: BlogPostPageProps) => {
  const { t } = useTranslation('common');
  const { locale } = usePageWrapperContext();
  const mediaType = blogPost.coverMedia?.mime?.split('/')[0] ?? '';
  const { Image: UIImage } = useUIContext();

  return (
    <>
      <SectionContainer>
        {blogPost.parentPage && (
          <PageBreadcrumbs page={blogPost.parentPage} blogPost={blogPost} />
        )}

        <PageTitle title={blogPost?.title ?? ''} hasDivider={false} />
        <div className="mt-2 lg:mt-4 text-sm text-gray-universal-70">{`${t(
          'added'
        )} ${formatDateToLocal(
          blogPost.date_added ? blogPost.date_added : blogPost.created_at,
          locale
        )}`}</div>

        <div className="flex mt-6 lg:mt-10 -mx-7.5 md:mx-0">
          {blogPost.coverMedia && mediaType === 'image' && (
            <img
              src={blogPost.coverMedia.url ?? ''}
              alt={blogPost.title || ''}
              className="w-full md:h-[300px] lg:h-[400px] object-cover object-center"
            />
          )}
          {blogPost.coverMedia && mediaType === 'video' && (
            <div className="w-full flex justify-center">
              <Video mediaUrl={blogPost.coverMedia.url} />
            </div>
          )}
        </div>

        {/* Sections */}
        <div className="flex">
          <div className="w-full lg:mx-auto lg:w-8/12 mt-10">
            {blogPost.sections && <Sections sections={blogPost.sections} />}
          </div>
        </div>
      </SectionContainer>
    </>
  );
};

export default BlogPostPage;

import cx from 'classnames';
import { useUIContext } from '@bratislava/common-frontend-ui-context';
import { ReactComponent as ChevronRight } from '../../assets/images/chevron-right.svg';

export interface ArticleCardProps {
  className?: string;
  title?: string;
  pageLink?: { title?: string; url?: string };
  media?: string;
  mediaType?: string;
  publishedDate?: string;
}

export const ArticleCard = ({
  className,
  title,
  pageLink,
  media,
  mediaType,
  publishedDate,
}: ArticleCardProps) => {
  const { Link: UILink } = useUIContext();

  return (
    <UILink href={pageLink?.url ?? '#'}>
      <div className={cx(className, 'flex flex-col')}>
        <div className="flex w-full">
          {media && mediaType === 'image' && (
            <img src={media} alt={title} className="w-full h-48 object-cover" />
          )}
          {media && mediaType === 'video' && (
            <video
              width="100%"
              height="100%"
              style={{ objectFit: 'cover' }}
              className="w-full h-48 object-cover"
            >
              <source src={media} />
              Your browser does not support HTML video.
            </video>
          )}{' '}
        </div>

        {publishedDate && (
          <label className="cursor-pointer text-xs text-gray-universal-70 mt-2">
            {publishedDate}
          </label>
        )}

        <h5 className="text-gray-universal-100 mt-2">{title}</h5>

        {pageLink?.url && (
          <UILink
            className="flex items-center space-x-[9px] mt-6"
            href={pageLink?.url ?? '#'}
          >
            <span className="text-xs text-gray-universal-100">
              {pageLink?.title}
            </span>
            <ChevronRight />
          </UILink>
        )}
      </div>
    </UILink>
  );
};

export default ArticleCard;

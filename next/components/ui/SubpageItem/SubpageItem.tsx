import cx from 'classnames';
import { useUIContext } from '@bratislava/common-frontend-ui-context';
import { ReactComponent as ArrowRight } from '../../assets/images/arrow-right-strong.svg';

export interface SubpageItemProps {
  className?: string;
  title?: string;
  description?: string;
  url?: string;
}

export const SubpageItem = ({
  className,
  title,
  description,
  url,
}: SubpageItemProps) => {
  const { Link: UILink, Markdown: UIMarkdown } = useUIContext();

  return (
    <UILink className={cx(className)} href={url ?? '#'}>
      <h3 className="text-md border-gray-universal-100">{title}</h3>
      {description && (
        <UIMarkdown
          className="text-sm text-gray-universal-70 mt-4"
          content={description}
        />
      )}
      <div className="flex p-4 mt-6 border-[1px] border-gray-universal-100 justify-between items-center">
        <span className="text-sm">{title}</span>

        {url && <ArrowRight />}
      </div>
    </UILink>
  );
};

export default SubpageItem;

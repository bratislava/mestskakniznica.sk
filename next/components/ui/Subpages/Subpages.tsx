import cx from 'classnames';
import { SubpageItem, SubpageItemProps } from '../SubpageItem/SubpageItem';

export interface SubpagesProps {
  title?: string;
  subpages?: SubpageItemProps[];
}

export function Subpages({ title, subpages }: SubpagesProps) {
  return (
    <div className={cx('space-y-6')}>
      <h3 className="text-md2 text-gray-universal-100"> {title}</h3>
      <div className="grid grid-cols-1 gap-8 mt-6">
        {subpages?.map((subpage, index) => (
          <SubpageItem
            key={index}
            title={subpage.title}
            description={subpage.description}
            url={subpage.url}
          />
        ))}
      </div>
    </div>
  );
}

export default Subpages;

import cx from 'classnames'

import { SubpageItem, SubpageItemProps } from '../SubpageItem/SubpageItem'

export interface SubpagesProps {
  title?: string
  subpages?: SubpageItemProps[]
}

export const Subpages = ({ title, subpages }: SubpagesProps) => {
  return (
    <div className={cx('space-y-6')}>
      <h3 className="text-md2 text-gray-universal-100"> {title}</h3>
      <div className="mt-6 grid grid-cols-1 gap-8">
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
  )
}

export default Subpages

import cx from 'classnames'

import SubpageItem, { SubpageItemProps } from '@/components/ui/SubpageItem/SubpageItem'

export interface SubpagesProps {
  title?: string
  subpages?: SubpageItemProps[]
}

export const Subpages = ({ title, subpages }: SubpagesProps) => {
  return (
    <div className={cx('space-y-6')}>
      <h3 className="text-h3"> {title}</h3>
      <div className="mt-6 grid grid-cols-1 gap-8">
        {subpages?.map((subpage) => (
          <SubpageItem
            key={subpage.id}
            title={subpage.title}
            description={subpage.description}
            url={subpage.url}
            id={subpage.id}
          />
        ))}
      </div>
    </div>
  )
}

export default Subpages

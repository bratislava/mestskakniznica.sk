import MLink from '@modules/common/MLink'
import ShowMoreLink from '@modules/common/ShowMoreLink'
import cx from 'classnames'
import React from 'react'

export interface CallToActionProps {
  className?: string
  title: string
  href: string
  showMoreText?: string
}

export const CallToAction = ({ className, title, href, showMoreText }: CallToActionProps) => {
  return (
    <div className="group/showMore relative border border-border-dark">
      <div className={cx('relative flex flex-col space-y-4 p-4', className)}>
        <div className="h-full overflow-hidden text-[20px]">
          <MLink href={href} variant="basic" stretched>
            {title}
          </MLink>
        </div>
        {showMoreText && (
          <ShowMoreLink href={href} tabIndex={-1} parentGroup>
            {showMoreText}
          </ShowMoreLink>
        )}
      </div>
    </div>
  )
}

import { ChevronRightIcon } from '@assets/icons'
import cx from 'classnames'
import React, { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

import MLink from '@/modules/common/MLink'

type ShowMoreLinkProps = Omit<ComponentProps<typeof MLink>, 'variant'> & {
  /**
   * Set to `true` if parent provides `group/showMore`, in that case the text is not underlined, but the arrow moves.
   */
  parentGroup?: boolean
}

/**
 * Figma: https://www.figma.com/file/CY6Mh2f0SXJhBMY74HdS03/MKB?node-id=1491%3A17763&t=ulPYWpBsLl67Ec77-0
 */
const ShowMoreLink = ({ children, className, parentGroup = false, ...rest }: ShowMoreLinkProps) => {
  return (
    <MLink
      className={twMerge(
        cx(
          'inline-flex items-center text-xs font-medium uppercase tracking-[0.08em] hover:underline md:text-sm',
          { 'group/showMore': !parentGroup }
        ),
        className
      )}
      {...rest}
    >
      <span>{children}</span>{' '}
      {/* The arrow takes its place before hover to not cause layout shifts. */}
      <div className="ml-0.5 mr-1 mt-[-3px] group-hover/showMore:ml-1.5 group-hover/showMore:mr-0">
        {/* TODO: Proper icon resizing. */}
        <ChevronRightIcon className="m-[-3px] scale-[0.75] md:m-[-2px] md:scale-[0.833333333]" />
      </div>
    </MLink>
  )
}

export default ShowMoreLink

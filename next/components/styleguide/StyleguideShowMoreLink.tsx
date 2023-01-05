import { Wrapper } from '@components/styleguide/Wrapper'
import MLink from '@modules/common/MLink'
import ShowMoreLink from '@modules/common/ShowMoreLink'
import React from 'react'

const StyleguideShowMoreLink = () => {
  return (
    <Wrapper title="ShowMoreLink" direction="column" noBorder>
      <ShowMoreLink href="#">Show more</ShowMoreLink>
      <div className="group/showMore relative flex w-[200px] flex-col gap-4 border border-border-dark p-4">
        <MLink href="#" stretched variant="basic">
          Show more with parent group
        </MLink>
        <ShowMoreLink href="#" parentGroup tabIndex={0}>
          Show more
        </ShowMoreLink>
      </div>
    </Wrapper>
  )
}

export default StyleguideShowMoreLink

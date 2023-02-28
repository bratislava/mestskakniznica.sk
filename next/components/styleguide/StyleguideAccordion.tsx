import CalendarSvg from '@assets/images/calendar.svg'
import { Stack } from '@components/styleguide/Stack'
import { Wrapper } from '@components/styleguide/Wrapper'
import Accordion from '@modules/common/Accordion'
import React from 'react'

const StyleguideAccordion = () => {
  return (
    <Wrapper title="Accordion" direction="column">
      <Stack>
        <Accordion type="boxed" title="Boxed, no icon">
          Content
        </Accordion>
        <Accordion type="boxed" title="Boxed, icon" iconLeft={<CalendarSvg />}>
          Content
        </Accordion>
      </Stack>
      <Stack>
        <Accordion type="divider-big" title="Divider big, no icon">
          Content
        </Accordion>
        <Accordion type="divider-big" title="Divider big, icon" iconLeft={<CalendarSvg />}>
          Content
        </Accordion>
      </Stack>
      <Stack>
        <Accordion type="divider-small" title="Divider small, no icon">
          Content
        </Accordion>
        <Accordion type="divider-small" title="Divider small, icon" iconLeft={<CalendarSvg />}>
          Content
        </Accordion>
      </Stack>
      <Stack>
        <Accordion type="divider-small" title="Divider small, no icon">
          Content
        </Accordion>
        <Accordion type="divider-small" title="Divider small, icon" iconLeft={<CalendarSvg />}>
          Content
        </Accordion>
      </Stack>
      <Stack>
        <Accordion type="subbranch" title="Subbranch, icon" iconLeft={<CalendarSvg />}>
          Content
        </Accordion>
      </Stack>
    </Wrapper>
  )
}

export default StyleguideAccordion

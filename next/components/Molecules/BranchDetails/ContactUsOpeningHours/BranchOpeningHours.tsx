import React from 'react'

import { OpeningHoursDaysFragment } from '@/services/graphql'

const BranchOpeningHours = ({ days }: OpeningHoursDaysFragment) => {
  return (
    <div className="flex flex-col gap-2 text-foreground-body">
      {days.map((day, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={index} className="flex max-w-[340px] justify-between">
          <div>{day?.label}</div>
          <div>{day?.time}</div>
        </div>
      ))}
    </div>
  )
}

export default BranchOpeningHours

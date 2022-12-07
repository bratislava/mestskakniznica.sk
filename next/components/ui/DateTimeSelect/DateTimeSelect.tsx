import CalendarIcon from '@assets/images/calendar.svg'
import ClockIcon from '@assets/images/clock.svg'
import cx from 'classnames'

import { Input, InputProps } from '../Input/Input'

export interface DateTimeSelectProps extends InputProps {
  type: 'date' | 'time'
}

export const DateTimeSelect = ({ type, inputClassName, ...props }: DateTimeSelectProps) => {
  const Icon = type === 'date' ? <CalendarIcon /> : <ClockIcon />

  return (
    <Input
      type={type}
      // iconLeft={Icon}
      // iconClassName="pointer-events-none"
      // inputClassName={cx('pl-12.5', inputClassName)}
      inputClassName={cx('h-[42px]', inputClassName)}
      {...props}
    />
  )
}

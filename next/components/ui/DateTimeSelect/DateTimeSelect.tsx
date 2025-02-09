import { CalendarIcon, ClockIcon } from '@/assets/icons'
import { Input, InputProps } from '@/components/ui/Input/Input'
import cn from '@/utils/cn'

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
      // inputClassName={cn('pl-12.5', inputClassName)}
      inputClassName={cn('h-[42px]', inputClassName)}
      {...props}
    />
  )
}

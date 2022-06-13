import cx from 'classnames';
import { Input, InputProps } from '../Input/Input';
import { ReactComponent as CalendarIcon } from '../../assets/images/calendar.svg';
import { ReactComponent as ClockIcon } from '../../assets/images/clock.svg';

export interface DateTimeSelectProps extends InputProps {
  type: 'date' | 'time';
}

export function DateTimeSelect({
  type,
  inputClassName,
  ...props
}: DateTimeSelectProps) {
  const Icon = type === 'date' ? <CalendarIcon /> : <ClockIcon />;

  return (
    <Input
      type={type}
      // iconLeft={Icon}
      // iconClassName="pointer-events-none"
      // inputClassName={cx('pl-12.5', inputClassName)}
      inputClassName={cx('h-[42px]', inputClassName)}
      {...props}
    />
  );
}

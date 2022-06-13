import { HTMLAttributes } from 'react';
import cx from 'classnames';

interface SectionContainerProps {
  hasBackground?: boolean;
  noPadding?: boolean;
}

export const SectionContainer = ({
  children,
  className,
  hasBackground = false,
  noPadding = false,
  ...rest
}: HTMLAttributes<HTMLDivElement> & SectionContainerProps) => (
  <div className={cx({ 'px-4 lg:px-8': !noPadding }, className)} {...rest}>
    <div className="max-w-[1180px] mx-auto">{children}</div>
  </div>
);

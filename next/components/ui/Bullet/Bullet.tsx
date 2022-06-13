import cx from 'classnames';
import { ReactComponent as DotIcon } from '../../assets/images/dot.svg';

export interface BulletProps {
  icon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

export const Bullet = ({ className, children, icon }: BulletProps) => (
  <div className={cx('flex items-center text-gray-universal-70', className)}>
    <span className="flex justify-center w-9">{icon ? icon : <DotIcon />}</span>
    <span className="text-base">{children}</span>
  </div>
);

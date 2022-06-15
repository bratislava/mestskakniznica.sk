import DotIcon from '@assets/images/dot.svg'
import cx from 'classnames'

export interface BulletProps {
  icon?: React.ReactNode
  className?: string
  children: React.ReactNode
}

export function Bullet({ className, children, icon }: BulletProps) {
  return <div className={cx('flex items-center text-gray-universal-70', className)}>
    <span className="flex justify-center w-9">{icon || <DotIcon />}</span>
    <span className="text-base">{children}</span>
  </div>
}

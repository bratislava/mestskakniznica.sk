import DotIcon from '@assets/images/dot.svg'
import cx from 'classnames'

export interface BulletProps {
  icon?: React.ReactNode
  className?: string
  children: React.ReactNode
}

export const Bullet = ({ className, children, icon }: BulletProps) => {
  return (
    <div className={cx('flex items-center text-foreground-body', className)}>
      <span className="flex w-9 justify-center">{icon || <DotIcon/>}</span>
      <span className="text-base">{children}</span>
    </div>
  )
}

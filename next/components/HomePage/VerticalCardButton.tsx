import ChevronRight from '@assets/images/chevron-right.svg'
import Button, { ButtonProps } from '@modules/common/Button'
import cx from 'classnames'

type VerticalCardButtonProps = ButtonProps & {
  size?: 'default' | 'medium' | 'large' | 'custom'
}

export const VerticalCardButton = ({
  className,
  children,
  size = 'default',
  ...rest
}: VerticalCardButtonProps) => (
  <Button
    className={cx(
      'transform transition-transform hover:scale-110',
      {
        'h-12 w-12': size === 'default',
        'h-14 w-14': size === 'medium',
        'h-16 w-16': size === 'large',
      },
      className
    )}
    shape="circle"
    variant="plain-white"
    {...rest}
  >
    {children ?? <ChevronRight />}
  </Button>
)

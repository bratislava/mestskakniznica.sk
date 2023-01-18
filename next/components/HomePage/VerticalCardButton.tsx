import ChevronRight from '@assets/images/chevron-right.svg'
import Button, { ButtonProps } from '@modules/common/Button'
import cx from 'classnames'

const VerticalCardButton = ({ className, children, onPress, ...rest }: ButtonProps) => (
  <Button
    className={cx('h-14 w-14 transform transition-transform hover:scale-110', className)}
    shape="circle"
    variant="carousel"
    onPress={onPress}
    {...rest}
  >
    {children ?? <ChevronRight />}
  </Button>
)
export default VerticalCardButton

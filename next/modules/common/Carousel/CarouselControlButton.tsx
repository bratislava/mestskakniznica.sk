import { twMerge } from 'tailwind-merge'

import Button, { ButtonProps } from '@/modules/common/Button'

const CarouselControlButton = ({ className, children, ...rest }: ButtonProps) => (
  <Button
    className={twMerge('h-14 w-14 transform transition-transform hover:scale-110', className)}
    shape="circle"
    variant="carousel"
    excludeFromTabOrder
    {...rest}
  >
    {children}
  </Button>
)
export default CarouselControlButton

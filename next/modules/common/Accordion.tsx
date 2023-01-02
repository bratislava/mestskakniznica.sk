import ChevronDown from '@assets/images/chevron-down.svg'
import { AnimateHeight } from '@components/Atoms/AnimateHeight'
import { Disclosure } from '@headlessui/react'
import cx from 'classnames'
import { ReactNode } from 'react'

export type AccordionProps = {
  type: 'boxed' | 'divider-small' | 'divider-big' | 'sublocation'
  title: string | null | undefined | ReactNode
  additionalInfo?: ReactNode
  children?: ReactNode
  iconLeft?: ReactNode
}

// eslint-disable-next-line no-secrets/no-secrets
/**
 * Inspired by: https://github.com/bratislava/marianum/blob/762d10222bd33352b77a44d902620181b07107c1/next/components/molecules/Accordion/AccordionItem.tsx
 * Figma: https://www.figma.com/file/CY6Mh2f0SXJhBMY74HdS03/MKB?node-id=1491%3A17724&t=I75qJANEgoYCKFED-0
 */
const Accordion = ({ type, title, additionalInfo, children, iconLeft }: AccordionProps) => {
  const borderStyles = cx('flex w-full flex-col bg-white', {
    'border-border border': type === 'boxed',
    'border-border border-b':
      // eslint-disable-next-line sonarjs/no-duplicate-string
      type === 'divider-small' || type === 'divider-big' || type === 'sublocation',
  })

  const headingStyles = cx('grow', type === 'divider-small' ? 'text-h6' : 'text-h5')

  const buttonStyles = cx('hover:text-underline flex items-center gap-4 text-left text-h5 ', {
    'py-[18.5px] px-4 md:px-6 md:py-5': type === 'boxed',
    'py-[18.5px] md:py-6': type === 'divider-big',
    'py-[14.5px] md:py-[18.5px]': type === 'divider-small',
    'py-4': type === 'sublocation',
  })

  const leftIconStyles = cx('mr-0 shrink-0 md:mr-2', {
    'bg-yellow grid h-10 w-10 place-content-center bg-promo-yellow md:h-14 md:w-14':
      type === 'sublocation',
  })

  // const iconWrapperStyles = cx('flex h-8 w-8 shrink-0 items-center justify-center')

  const contentStyles = cx('w-full ', {
    'px-6 py-5': type === 'boxed',
    'py-[18.5px] md:py-6': type === 'divider-big',
    'py-[14.5px] md:py-[18.5px]': type === 'divider-small',
    'py-4': type === 'sublocation',
  })

  return (
    <Disclosure>
      {({ open }) => {
        return (
          <div className={borderStyles}>
            <Disclosure.Button className={buttonStyles}>
              {iconLeft && <div className={leftIconStyles}>{iconLeft}</div>}
              <h3 className={headingStyles}>{title}</h3>
              {additionalInfo && <div className="pr-6">{additionalInfo}</div>}
              <div className="shrink-0">
                <ChevronDown
                  className={cx('mr-1 transform transition-transform', {
                    'rotate-180': open,
                  })}
                />
              </div>
            </Disclosure.Button>
            <AnimateHeight isVisible={open}>
              <Disclosure.Panel static className={contentStyles}>
                {children}
              </Disclosure.Panel>
            </AnimateHeight>
          </div>
        )
      }}
    </Disclosure>
  )
}

export default Accordion
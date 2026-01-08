import { ReactNode, useState } from 'react'
import { Button, Disclosure, DisclosurePanel, Heading } from 'react-aria-components'

import { ChevronLeftIcon } from '@/assets/icons'
import { AnimateHeight } from '@/components/Atoms/AnimateHeight'
import cn from '@/utils/cn'

export type AccordionProps = {
  type: 'boxed' | 'divider-small' | 'divider-big' | 'subbranch' | 'breadcrumbs'
  title: string | ReactNode | null | undefined
  additionalInfo?: ReactNode
  children?: ReactNode
  iconLeft?: ReactNode
}

/**
 * Inspired by: https://github.com/bratislava/marianum/blob/762d10222bd33352b77a44d902620181b07107c1/next/components/molecules/Accordion/AccordionItem.tsx
 * Figma: https://www.figma.com/file/CY6Mh2f0SXJhBMY74HdS03/MKB?node-id=1491%3A17724&t=I75qJANEgoYCKFED-0
 */
const Accordion = ({ type, title, additionalInfo, children, iconLeft }: AccordionProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const borderStyles = cn('flex w-full flex-col bg-white', {
    'border-border border': type === 'boxed',
    'border-border border-b':
      // eslint-disable-next-line sonarjs/no-duplicate-string
      type === 'divider-small' || type === 'divider-big' || type === 'subbranch',
  })

  // min-w-0 used because of breadcrumbs:
  // https://css-tricks.com/flexbox-truncated-text/#aa-the-solution-is-min-width-0-on-the-flex-child
  const headingStyles = cn('min-w-0 grow', {
    'text-h6': type === 'divider-small',
    'text-h5': type === 'boxed' || type === 'divider-big' || type === 'subbranch',
    'text-sm': type === 'breadcrumbs',
  })

  const buttonStyles = cn(
    'hover:text-underline flex items-center gap-4 text-left text-h5 outline-none',
    {
      'px-4 py-[18.5px] md:px-6 md:py-5': type === 'boxed',
      'py-[18.5px] md:py-6': type === 'divider-big',
      'py-[14.5px] md:py-[18.5px]': type === 'divider-small',
      'py-4': type === 'subbranch',
      '-mx-4 p-4': type === 'breadcrumbs',
    },
  )

  const leftIconStyles = cn('mr-0 shrink-0 md:mr-2', {
    'bg-yellow grid h-10 w-10 place-content-center bg-promo-yellow md:h-14 md:w-14':
      type === 'subbranch',
  })

  // const iconWrapperStyles = cn('flex h-8 w-8 shrink-0 items-center justify-center')

  const contentStyles = cn('w-full', {
    'px-6 py-5': type === 'boxed',
    'py-[18.5px] md:py-6': type === 'divider-big',
    'py-[14.5px] md:py-[18.5px]': type === 'divider-small',
    'py-4': type === 'subbranch',
  })

  const WrapperComponent = type === 'breadcrumbs' ? 'nav' : 'div'

  return (
    <WrapperComponent className={borderStyles}>
      <Disclosure
        isExpanded={isExpanded}
        onExpandedChange={setIsExpanded}
        className="flex w-full flex-col"
      >
        <Heading className="m-0 flex flex-col">
          <Button
            slot="trigger"
            className={({ isFocusVisible }) =>
              cn(buttonStyles, { 'base-focus-ring': isFocusVisible })
            }
            aria-label={type === 'breadcrumbs' ? 'Breadcrumbs' : undefined}
          >
            {iconLeft && (
              <span className={leftIconStyles} aria-hidden>
                {iconLeft}
              </span>
            )}
            <span className={headingStyles}>{title}</span>
            {additionalInfo && <span className="pr-6">{additionalInfo}</span>}
            <span className="shrink-0" aria-hidden>
              <ChevronLeftIcon
                className={cn('mr-1 transform transition-transform', {
                  'rotate-90': isExpanded,
                  '-rotate-90': !isExpanded,
                })}
              />
            </span>
          </Button>
        </Heading>
        <AnimateHeight isVisible={isExpanded}>
          <DisclosurePanel className={contentStyles}>{children}</DisclosurePanel>
        </AnimateHeight>
      </Disclosure>
    </WrapperComponent>
  )
}

export default Accordion

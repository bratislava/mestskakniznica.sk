import { type ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * Inspired by: https://ui.shadcn.com/docs/installation/manual
 */

const twMerge = extendTailwindMerge({
  extend: {
    // Add custom theme values, keep in sync with globals.css
    theme: {
      // Custom breakpoints
      breakpoint: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      // Custom colors
      color: [
        'transparent',
        'current',
        'white',
        'black',
        'dark',
        'foreground-heading',
        'foreground-dark',
        'foreground-body',
        'foreground-placeholder',
        'foreground-disabled',
        'border-dark',
        'border-light',
        'border-disabled',
        'button-white',
        'button-dark',
        'button-gray',
        'button-hover',
        'button-disabled',
        'promo-yellow',
        'promo-peach',
        'error',
        'success',
        'outline',
      ],
    },
    classGroups: {
      // Keep in sync with utility classes in globals.css
      'font-size': [
        'text-size-h1',
        'text-size-h1-r',
        'text-size-h2',
        'text-size-h2-r',
        'text-size-h3',
        'text-size-h3-r',
        'text-size-h4',
        'text-size-h4-r',
        'text-size-h5',
        'text-size-h5-r',
        'text-size-h6',
        'text-size-h6-r',
        'text-size-p-large',
        'text-size-p-large-r',
        'text-size-p-default',
        'text-size-p-default-r',
        'text-size-p-small',
        'text-size-p-small-r',
        'text-size-button',
        'text-size-button-r',
      ],
    },
  },
})

function cn(...args: ClassValue[]) {
  return twMerge(clsx(args))
}

export default cn

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
        'text-h1',
        'text-h2',
        'text-h3',
        'text-h4',
        'text-h5',
        'text-h6',
        'text-btn',
        'text-xs',
        'text-sm',
        'text-base',
        'text-lg',
      ],
    },
  },
})

function cn(...args: ClassValue[]) {
  return twMerge(clsx(args))
}

export default cn

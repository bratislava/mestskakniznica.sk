import { type ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

import tailwindConfig from '@/tailwind.config'

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': Object.keys(tailwindConfig.theme?.fontSize).map((key) => `text-${key}`),
    },
  },
})

/**
 * Based on OLO: https://github.com/bratislava/olo.sk/blob/master/next/src/utils/cn.ts
 * Inspired by: https://ui.shadcn.com/docs/installation/manual
 */

const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(...args))
}

export default cn

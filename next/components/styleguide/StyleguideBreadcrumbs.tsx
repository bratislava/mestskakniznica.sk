import React from 'react'

import { Stack } from '@/components/styleguide/Stack'
import { Wrapper } from '@/components/styleguide/Wrapper'
import DesktopBreadcrumbs from '@/modules/breadcrumbs/DesktopBreadcrumbs'
import MobileBreadcrumbs from '@/modules/breadcrumbs/MobileBreadcrumbs'

const StyleguideBreadcrumbs = () => {
  const crumbs = [
    { title: 'Zažite', path: '/zazite' },
    { title: 'Aktuality', path: '/zazite/aktuality' },
    {
      title: 'Detské e-knihy v Mestskej knižnici',
      path: '/zazite/aktuality/detske-knihy-v-mestskej-kniznici',
    },
  ]
  const crumbsLong = [
    { title: 'Zažite', path: '/zazite' },
    { title: 'Aktuality', path: '/zazite/aktuality' },
    {
      title:
        'Oddelenie pre nevidiacich a slabozrakých bude otvorené v skrátených otváracích hodinách',
      path: '/zazite/aktuality/skratene-otvaracie-hodiny-oddelenia-pre-nevidiacich-26-9-2022y',
    },
  ]

  return (
    <Wrapper title="Breadcrumbs" direction="column">
      <Stack>
        <DesktopBreadcrumbs crumbs={crumbs} />
      </Stack>
      <Stack>
        <div className="w-[400px]">
          <MobileBreadcrumbs crumbs={crumbs} />
          <MobileBreadcrumbs crumbs={crumbsLong} />
        </div>
      </Stack>
    </Wrapper>
  )
}

export default StyleguideBreadcrumbs

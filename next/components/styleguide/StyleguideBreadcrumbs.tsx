import { Stack } from '@components/styleguide/Stack'
import { Wrapper } from '@components/styleguide/Wrapper'
import DesktopBreadcrumbs from '@modules/breadcrumbs/DesktopBreadcrumbs'
import MobileBreadcrumbs from '@modules/breadcrumbs/MobileBreadcrumbs'
import React from 'react'

const StyleguideBreadcrumbs = () => {
  const crumbs = [
    { title: 'Zažite', url: '/zazite' },
    { title: 'Aktuality', url: '/zazite/aktuality' },
    {
      title: 'Detské e-knihy v Mestskej knižnici',
      url: '/zazite/aktuality/detske-knihy-v-mestskej-kniznici',
    },
  ]
  const crumbsLong = [
    { title: 'Zažite', url: '/zazite' },
    { title: 'Aktuality', url: '/zazite/aktuality' },
    {
      title:
        'Oddelenie pre nevidiacich a slabozrakých bude otvorené v skrátených otváracích hodinách',
      url: '/zazite/aktuality/skratene-otvaracie-hodiny-oddelenia-pre-nevidiacich-26-9-2022y',
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

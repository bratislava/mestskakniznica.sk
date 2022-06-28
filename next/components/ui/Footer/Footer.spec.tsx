import { render } from '@testing-library/react'

import { Footer } from './Footer'

describe('Footer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Footer
        copyrightText="© 2021 Mestská knižnica v Bratislave"
        gdpr={{
          title: 'Privacy policy',
          href: '#',
        }}
        VOP={{
          title: 'VOP',
          href: '#',
        }}
        facebookUrl="https://sk-sk.facebook.com/mestskakniznica/"
        instagramUrl="https://www.instagram.com/mestska_kniznica_bratislava/?hl=sk"
        youtubeUrl="https://www.youtube.com/channel/UCX4B3tYI32-YcdsaD-Yt8Dw"
        footerColumns={[]}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})

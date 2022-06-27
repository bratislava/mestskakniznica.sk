import { render } from '@testing-library/react'

import { Sidebar } from './Sidebar'

describe('Sidebar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Sidebar activeCategory={0} categories={[]} href="/" title='' />)
    expect(baseElement).toBeTruthy()
  })
})

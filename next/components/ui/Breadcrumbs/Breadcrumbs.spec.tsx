import { render } from '@testing-library/react'

import { Breadcrumbs } from './Breadcrumbs'

describe('Breadcrumbs', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Breadcrumbs items={[]} />)
    expect(baseElement).toBeTruthy()
  })
})

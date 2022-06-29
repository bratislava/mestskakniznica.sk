import { render } from '@testing-library/react'

import { RowSubcategory } from './RowSubcategory'

describe('RowSubcategory', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RowSubcategory title='Title' />)
    expect(baseElement).toBeTruthy()
  })
})

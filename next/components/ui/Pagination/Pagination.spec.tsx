import { render } from '@testing-library/react'

import { Pagination } from './Pagination'

describe('Pagination', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Pagination
      max={0}
      value={0}
      onChangeNumber={(num: number) => null}
    />)
    expect(baseElement).toBeTruthy()
  })
})

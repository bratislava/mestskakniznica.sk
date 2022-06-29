import { render } from '@testing-library/react'

import BookNewsDetail from './BookNewsDetail'

describe('BookNewsDetail', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BookNewsDetail title="" />)
    expect(baseElement).toBeTruthy()
  })
})

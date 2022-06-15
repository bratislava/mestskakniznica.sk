import { render } from '@testing-library/react'

import FileIcon from './FileIcon'

describe('FileIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FileIcon />)
    expect(baseElement).toBeTruthy()
  })
})

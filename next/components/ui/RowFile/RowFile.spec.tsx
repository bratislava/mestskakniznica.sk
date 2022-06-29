import { render } from '@testing-library/react'

import { RowFile } from './RowFile'

describe('RowFile', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RowFile dateAdded='' metadata='' title='' type='' />)
    expect(baseElement).toBeTruthy()
  })
})

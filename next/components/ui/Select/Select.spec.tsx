import { render } from '@testing-library/react'

import {Select} from './Select'

describe('Select', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Select options={[]} value="value" />)
    expect(baseElement).toBeTruthy()
  })
})

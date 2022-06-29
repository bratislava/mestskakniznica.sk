import { render } from '@testing-library/react'

import {DateTimeSelect} from './DateTimeSelect'

describe('DateTimeSelect', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DateTimeSelect type='date' />)
    expect(baseElement).toBeTruthy()
  })
})

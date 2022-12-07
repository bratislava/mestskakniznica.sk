import { render } from '@testing-library/react'

import NumberSwitcher from './NumberSwitcher'

describe('NumberSwitcher', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NumberSwitcher required={false} />)
    expect(baseElement).toBeTruthy()
  })
})

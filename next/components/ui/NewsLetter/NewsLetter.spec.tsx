import { render } from '@testing-library/react'

import { NewsLetter } from './NewsLetter'

describe('NewsLetter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NewsLetter
      title=""
      buttonContent=""
      checkboxContent=""
      errorMessage=""
      inputPlaceholder=""
      respondMessage=""
      resStatus
      onSubmit= {(e?: React.BaseSyntheticEvent) => new Promise(() => null)}
    />)
    expect(baseElement).toBeTruthy()
  })
})

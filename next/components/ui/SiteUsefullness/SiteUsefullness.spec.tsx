import { render } from '@testing-library/react'

import {SiteUsefullness} from './SiteUsefullness'

describe('SiteUsefullness', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SiteUsefullness
      onButtonClick={e => null}
      thankYouMessage="Thanks"
      title='title'
    />)
    expect(baseElement).toBeTruthy()
  })
})

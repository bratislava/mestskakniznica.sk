import { render } from '@testing-library/react'

import Accordion from './Accordion'

describe('Accordion', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Accordion
        key="index"
        label="Title"
        id="Title"
        defaultState
        stateListener={(id: string, state: boolean) => null}
        content={<div />}
        size="big"
        type="divider"
      />
    )
    expect(baseElement).toBeTruthy()
  })
})

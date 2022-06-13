import { render } from '@testing-library/react';

import { CallToAction } from './CallToAction';

describe('CallToAction Element', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <CallToAction
        href="/"
        title="Odkaz na inu podstranku"
        className="h-[180px] w-[280px]"
        bottomText="Viac"
        hasIcon={true}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});

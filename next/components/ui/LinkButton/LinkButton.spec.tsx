import { render } from '@testing-library/react';

import { LinkButton } from './LinkButton';

describe('LinkButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LinkButton />);
    expect(baseElement).toBeTruthy();
  });
});

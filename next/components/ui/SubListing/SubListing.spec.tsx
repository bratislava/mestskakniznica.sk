import { render } from '@testing-library/react';

import SubListing from './SubListing';

describe('SubListing', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SubListing />);
    expect(baseElement).toBeTruthy();
  });
});

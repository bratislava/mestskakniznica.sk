import { render } from '@testing-library/react';

import ExternalLinks from './ExternalLinks';

describe('ExternalLinks', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ExternalLinks />);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from '@testing-library/react';

import { Chip } from './Chip';

describe('Chip', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Chip />);
    expect(baseElement).toBeTruthy();
  });
});

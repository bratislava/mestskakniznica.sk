import { render } from '@testing-library/react';

import Documents from './Documents';

describe('Documents', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Documents />);
    expect(baseElement).toBeTruthy();
  });
});

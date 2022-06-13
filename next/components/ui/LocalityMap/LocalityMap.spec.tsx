import { render } from '@testing-library/react';

import LocalityMap from './LocalityMap';

describe('LocalityMap', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LocalityMap />);
    expect(baseElement).toBeTruthy();
  });
});

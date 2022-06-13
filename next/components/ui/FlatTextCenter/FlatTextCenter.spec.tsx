import { render } from '@testing-library/react';

import FlatTextCenter from './FlatTextCenter';

describe('FlatTextCenter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FlatTextCenter />);
    expect(baseElement).toBeTruthy();
  });
});

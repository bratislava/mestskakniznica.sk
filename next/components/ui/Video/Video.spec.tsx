import { render } from '@testing-library/react';

import { Video } from './Video';

describe('Videos', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Video />);
    expect(baseElement).toBeTruthy();
  });
});

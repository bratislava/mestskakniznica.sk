import { render } from '@testing-library/react';

import { Bullet } from './Bullet';

describe('Bullet', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Bullet />);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from '@testing-library/react';

import SubpageItem from './SubpageItem';

describe('SubpageItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SubpageItem />);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from '@testing-library/react';

import BookNewsDetail from './BookNewsDetail';

describe('BookNewsDetail', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BookNewsDetail />);
    expect(baseElement).toBeTruthy();
  });
});

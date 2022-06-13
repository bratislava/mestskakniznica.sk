import { render } from '@testing-library/react';

import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Sidebar />);
    expect(baseElement).toBeTruthy();
  });
});

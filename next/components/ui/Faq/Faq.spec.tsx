import { render } from '@testing-library/react';

import Faq from './Faq';

describe('Faq', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Faq />);
    expect(baseElement).toBeTruthy();
  });
});

import { NumberSwitcher } from '@bratislava/ui-bratislava';
import { render } from '@testing-library/react';
import React from 'react';

describe('NumberSwitcher', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NumberSwitcher value={1} />);
    expect(baseElement).toBeTruthy();
  });
});

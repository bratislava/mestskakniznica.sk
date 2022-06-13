import { render } from '@testing-library/react';
import { RadioGroup } from './RadioGroup';
import React from 'react';

describe('RadioGroup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RadioGroup options={[]} />);
    expect(baseElement).toBeTruthy();
  });
});

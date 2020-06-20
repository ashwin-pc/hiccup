import React from 'react';
import { render } from '@testing-library/react';
import { config } from '../__test__/config'
import App from '../App';

describe('Test hiccup', () => {
  test('should render page correctly', () => {
    const { container } = render(<App config={config} />)
    expect(container).toMatchSnapshot()
    
  })
  
})

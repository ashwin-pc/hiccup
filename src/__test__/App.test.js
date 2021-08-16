import React from 'react';
import { render } from '@testing-library/react';
import { config } from '../__test__/config'
import App, { ROOT_ID } from '../App';
import { MODAL_ROOT_ID } from '../components/Modal/ModalPortal';

// TODO: Not a a very effective test, will need to replace this soon. leaving it in place until the other tests are setup
describe('Test hiccup', () => {
  test('should render page correctly', () => {

    const rootEle = document.body.appendChild(createElement(ROOT_ID))
    document.body.appendChild(createElement(MODAL_ROOT_ID))

    const { container } = render(<App config={config} />, {
      container: rootEle
    })
    expect(container).toMatchSnapshot()
  })

  function createElement(id) {
    const ele = document.createElement('div')
    ele.id = id
    return ele
  }
})


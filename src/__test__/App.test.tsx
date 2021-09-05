import React from 'react'
import { render, screen } from '@testing-library/react'
import { config } from './config'
import App, { ROOT_ID } from '../App'
import { MODAL_ROOT_ID } from 'components/common/Modal/ModalPortal'

// TODO: Not a a very effective test, will need to replace this soon. leaving it in place until the other tests are setup
describe('Test hiccup', () => {
  test('should render page correctly', async () => {
    const rootEle = document.body.appendChild(createElement(ROOT_ID))
    document.body.appendChild(createElement(MODAL_ROOT_ID))

    const { container } = render(<App config={config} />, {
      container: rootEle,
    })

    await screen.findByText('Featured Link')
    expect(container).toMatchSnapshot()
  })

  function createElement(id: string) {
    const ele = document.createElement('div')
    ele.id = id
    return ele
  }
})

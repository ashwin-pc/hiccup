import React from 'react'
import ReactDOM from 'react-dom'

const MODAL_ROOT_ID = 'modal-root'
class ModalPortal extends React.Component {
  render() {
    const modalRoot = document.getElementById(MODAL_ROOT_ID) as HTMLElement

    return ReactDOM.createPortal(this.props.children, modalRoot)
  }
}

export { ModalPortal, MODAL_ROOT_ID, ModalPortal as default }

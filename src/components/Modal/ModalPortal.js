import React from 'react'
import ReactDOM from 'react-dom'

const modalRoot = document.getElementById('modal-root');

class ModalPortal extends React.Component {
    render() {
        return ReactDOM.createPortal(
            this.props.children,
            modalRoot,
        );
    }
}

export {
    ModalPortal,
    ModalPortal as default
}
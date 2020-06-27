import React from 'react'
import { ModalPortal } from './ModalPortal'
import { Modal } from './Modal'

const ConnectedModal = props => (
    <ModalPortal>
        <Modal {...props} />
    </ModalPortal>
)

export {
    ConnectedModal as Modal,
    ConnectedModal,
    ConnectedModal as default
}
import React from 'react'
import { ModalPortal } from './ModalPortal'
import { Modal } from './Modal'
import styles from './index.module.css'

const ConnectedModal = props => (
    <ModalPortal>
        <Modal {...props} />
    </ModalPortal>
)

export {
    ConnectedModal as Modal,
    ConnectedModal,
    styles,
    ConnectedModal as default
}
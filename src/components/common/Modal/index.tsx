import { FunctionComponent } from 'react'
import { ModalPortal } from './ModalPortal'
import { Modal, ModalProps } from './Modal'
import styles from './index.module.css'

const ConnectedModal: FunctionComponent<ModalProps> = (props) => (
  <ModalPortal>
    <Modal {...props} />
  </ModalPortal>
)

export {
  ConnectedModal as Modal,
  ConnectedModal,
  styles,
  ConnectedModal as default,
}

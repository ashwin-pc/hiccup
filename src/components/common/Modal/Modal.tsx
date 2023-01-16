import React, {
  useState,
  useCallback,
  useEffect,
  FunctionComponent,
  MouseEventHandler,
} from 'react'
import { Icon } from '../Icon'
import styles from './index.module.css'

export interface ModalProps {
  show?: boolean
  className?: string
  onClose?: Function
}

const Modal: FunctionComponent<ModalProps> = ({
  show = false,
  children,
  className,
  onClose,
}) => {
  const [open, setOpen] = useState(show)
  const handleClose = useCallback(() => {
    setOpen(false)
    onClose && onClose()
  }, [onClose])

  useEffect(() => {
    setOpen(show)
  }, [show])

  return open ? (
    <div className={styles.container}>
      <ModalBackdrop onClick={handleClose} />
      <ModalPopup className={className} onClose={handleClose}>
        {children}
      </ModalPopup>
    </div>
  ) : null
}

interface IModalBackdrop {
  onClick: MouseEventHandler
}

const ModalBackdrop: FunctionComponent<IModalBackdrop> = ({ onClick }) => (
  <div className={styles.backdrop} onClick={onClick} />
)

interface IModalPopup {
  onClose: MouseEventHandler
  className?: string
}

const ModalPopup: FunctionComponent<IModalPopup> = ({
  className,
  children,
  onClose,
}) => (
  <div className={[styles.modal, className || styles.default].join(' ')}>
    {children}
    <button
      className={styles.close}
      onClick={onClose}
      data-testid="close-modal"
    >
      <Icon icon='times' size={15} />
    </button>
  </div>
)

export { Modal, Modal as default }

import React, { useState, useCallback, useEffect } from 'react'
import { ReactComponent as CloseIcon } from './times-solid.svg'
import styles from './index.module.css'

const Modal = ({ show = false, children, className, onClose }) => {

    const [open, setOpen] = useState(show)
    const handleClose = useCallback(() => {
        setOpen(false)
        onClose && onClose()
    }, [onClose])

    useEffect(() => {
        setOpen(show)
    }, [show])
    
    return (
        open
        ? <div className={styles.container}>
            <ModalBackdrop onClick={handleClose} />
            <ModalPopup className={className} onClose={handleClose}>
                {children}
            </ModalPopup>
        </div>
        : null
    )
}

const ModalBackdrop = ({ onClick }) => (
    <div className={styles.backdrop} onClick={onClick}/>
)

const ModalPopup = ({ className, children, onClose }) => (
    <div className={[styles.modal, className || styles.default].join(' ')}>
        {children}
        <CloseIcon className={styles.close} onClick={onClose} />
    </div>
)

export {
    Modal,
    Modal as default
}
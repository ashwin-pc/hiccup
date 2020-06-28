import React, { useState, useMemo, useCallback } from 'react'
import { Modal } from '../Modal'
import { Input } from '../Input'
import styles from './index.module.css'

const EditLinkModal = ({ show = true, fields, onCancel, onSave }) => {
    const [values, setValues] = useState(fields || {})
    const handleSave = useCallback(() => (onSave && onSave(values)), [onSave, values])
    const inputs = useMemo(() => {
        return Object.entries(values).map(([name, value], index) => (
            <Input key={index} label={name} name={name} value={value} onChange={e => setValues({...values, ...{ [name] : e.target.value }})} />
        ))
    }, [values])

    return (
        <Modal show={show} onClose={onCancel} className={styles.modal}>
            <h1 className={styles.title}>Edit Link</h1>
            { inputs }
            <button onClick={handleSave} className={styles.button}>Save</button>
        </Modal>
    )
}

export {
    EditLinkModal,
    EditLinkModal as default
}
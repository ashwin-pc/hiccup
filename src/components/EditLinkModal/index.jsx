import React, { useState, useMemo, useCallback } from 'react'
import { Modal, styles as modalStyles } from '../Modal'
import { Input } from '../Input'

const EditLinkModal = ({ show = true, fields, onCancel, onSave }) => {
    const [values, setValues] = useState(fields || {})
    const handleSave = useCallback(() => (onSave && onSave(values)), [onSave, values])
    const inputs = useMemo(() => {
        return Object.entries(values).map(([name, value], index) => (
            <Input key={index} label={name} name={name} value={value} onChange={e => setValues({ ...values, ...{ [name]: e.target.value } })} autoFocus={index === 0} />
        ))
    }, [values])

    return (
        <Modal show={show} onClose={onCancel}>
            <h1 className={modalStyles.title}>Edit Link</h1>
            {inputs}
            <button onClick={handleSave} className={modalStyles.button}>Save</button>
        </Modal>
    )
}

export {
    EditLinkModal,
    EditLinkModal as default
}
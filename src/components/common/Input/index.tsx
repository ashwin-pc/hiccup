import React, { ChangeEventHandler } from 'react'
import styles from './index.module.css'

interface Props {
    name?: string
    label?: string
    value: string
    onChange: ChangeEventHandler
}

export const Input = ({ name='input', label, value, onChange, ...props }: Props) => {
    return (
        <div className={styles.inputContainer}>
            { label && <label htmlFor="name" className={styles.label}>{label}</label> }
            <input type="text" name={name} value={value} onChange={onChange} className={styles.input} {...props} />
        </div>
    )
}

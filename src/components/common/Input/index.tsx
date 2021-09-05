import React, { ChangeEventHandler, FC } from 'react'
import styles from './index.module.css'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name?: string
  label?: string
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

export const Input: FC<Props> = ({
  name = 'input',
  label,
  value,
  onChange,
  ...props
}) => {
  return (
    <div className={styles.inputContainer}>
      {label && (
        <label htmlFor="name" className={styles.label}>
          {label}
        </label>
      )}
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className={styles.input}
        {...props}
      />
    </div>
  )
}

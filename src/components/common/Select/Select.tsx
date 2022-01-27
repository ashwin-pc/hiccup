import React, { InputHTMLAttributes } from 'react'
import styles from './index.module.css'

export interface SelectOption {
  label: string
  value: any
}
interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  values: SelectOption[] | undefined
  label: string
}
const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ values = [], label, name, ...props }, ref) => {
    return (
      <div className={styles.inputContainer}>
        {label && (
          <label htmlFor={name} className={styles.label}>
            {label}
          </label>
        )}
        <select name={name} className={styles.select} ref={ref} {...props}>
          {values.map(({ label: optionLabel, value: optionValue }, index) => (
            <option value={optionValue} key={index}>
              {optionLabel}
            </option>
          ))}
        </select>
      </div>
    )
  }
)

export default Select

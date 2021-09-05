import React, { useState, useMemo, useCallback, FC } from 'react'
import { Modal, styles as modalStyles } from 'components/common/Modal'
import { Input } from 'components/common/Input'
import {
  FeaturedEntity,
  LinksEntity,
  CategoriesEntity,
} from 'modules/config/Config'

export type Fields =
  | FeaturedEntity
  | LinksEntity
  | Omit<CategoriesEntity, 'links'>

export const EditLinkModal: FC<{
  fields: Fields
  onCancel: Function
  onSave: Function
  title?: string
}> = ({ fields, onCancel, onSave, title = 'Edit Link' }) => {
  const [values, setValues] = useState(fields)
  const handleSave = useCallback(() => onSave(values), [onSave, values])
  const inputs = useMemo(() => {
    return Object.entries(values).map(([name, value], index) => (
      <Input
        key={index}
        label={name}
        name={name}
        value={value as string}
        onChange={(e) =>
          setValues({ ...values, ...{ [name]: e.target.value } })
        }
        autoFocus={index === 0}
      />
    ))
  }, [values])

  return (
    <Modal show={true} onClose={onCancel}>
      <h1 className={modalStyles.title}>{title}</h1>
      {inputs}
      <button onClick={handleSave} className={modalStyles.button}>
        Save
      </button>
    </Modal>
  )
}

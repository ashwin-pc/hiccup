import React, { useState, useMemo, useCallback, useEffect, FC } from 'react'
import { Modal, styles as modalStyles } from 'components/common/Modal'
import { Input } from 'components/common/Input'
import { on, off, trigger } from 'modules/ui-events'
import {
  FeaturedEntity,
  LinksEntity,
  CategoriesEntity,
} from 'modules/config/Config'

const EDIT_EVENT_TYPE = 'edit'

type Fields = FeaturedEntity | LinksEntity | Omit<CategoriesEntity, 'links'>

const EditLinkModal: FC<{
  show: boolean
  fields: Fields
  onCancel: Function
  onSave: Function
  title?: string
}> = ({ show = true, fields, onCancel, onSave, title = 'Edit Link' }) => {
  const [values, setValues] = useState(fields)
  const handleSave = useCallback(
    () => onSave && onSave(values),
    [onSave, values]
  )
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
    <Modal show={show} onClose={onCancel}>
      <h1 className={modalStyles.title}>{title}</h1>
      {inputs}
      <button onClick={handleSave} className={modalStyles.button}>
        Save
      </button>
    </Modal>
  )
}

interface ActionDataType<T> {
  title: string
  fields: T
  onSave(fields: T): void
}

const ConnectedEditLinkModal = () => {
  const [actionState, setActionState] = useState<ActionDataType<Fields>>()
  const handleEditTrigger = useCallback(
    ({ detail }: CustomEvent<ActionDataType<Fields>>) => {
      setActionState(detail)
    },
    []
  )

  const handleSave = useCallback(
    (newFields: Fields) => {
      actionState?.onSave(newFields)
      setActionState(undefined)
    },
    [actionState]
  )

  useEffect(() => {
    on(EDIT_EVENT_TYPE, handleEditTrigger)
    return () => {
      off(EDIT_EVENT_TYPE, handleEditTrigger)
    }
  }, [handleEditTrigger])

  if (!actionState) return null

  const { fields, title } = actionState

  return (
    <EditLinkModal
      show={true}
      fields={fields}
      onCancel={() => setActionState(undefined)}
      onSave={handleSave}
      title={title}
    />
  )
}

function triggerEdit<T>(data: ActionDataType<T>) {
  trigger(EDIT_EVENT_TYPE, data)
}

export {
  ConnectedEditLinkModal,
  triggerEdit,
  EditLinkModal,
  EditLinkModal as default,
}

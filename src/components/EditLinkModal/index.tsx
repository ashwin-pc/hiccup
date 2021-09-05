import { useState, useCallback, useEffect } from 'react'
import { on, off, trigger } from 'modules/ui-events'
import { EditLinkModal, Fields } from './EditLinkModal'

const EDIT_EVENT_TYPE = 'edit-link'

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

import { useState, useCallback, useEffect } from 'react'
import { on, off, trigger } from 'modules/ui-events'
import { EditLinkModal, EditModalField } from './EditLinkModal'

const EDIT_EVENT_TYPE = 'edit-link'

interface ActionDataType {
  title: string
  fields: EditModalField[]
  onSave(fields: EditModalField[]): void
}

const ConnectedEditLinkModal = () => {
  const [actionState, setActionState] = useState<ActionDataType>()
  const handleEditTrigger = useCallback(
    ({ detail }: CustomEvent<ActionDataType>) => {
      setActionState(detail)
    },
    []
  )

  const handleSave = useCallback(
    (newFields: EditModalField[]) => {
      const saved = actionState?.onSave(newFields) ?? true
      saved && setActionState(undefined)
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

function triggerEdit(data: ActionDataType) {
  trigger(EDIT_EVENT_TYPE, data)
}

export {
  ConnectedEditLinkModal,
  triggerEdit,
  EditLinkModal,
  EditLinkModal as default,
}

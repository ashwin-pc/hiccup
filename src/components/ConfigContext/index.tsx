import React, { createContext, useState, useContext, FC } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { ConfigEntity, LocalConfigStore } from 'modules/config/types'
import { StoreActions, useStore } from 'modules/config/useStore'
import { useDragging } from 'components/common/Drop'

interface IConfigContext {
  config: ConfigEntity
  editing: boolean
  dragging: boolean
  setEditing: React.Dispatch<React.SetStateAction<boolean>>
  storeActions: StoreActions
  store: LocalConfigStore
}

const ConfigContext = createContext<IConfigContext | undefined>(undefined)

const ConfigProvider: FC = ({ children }) => {
  const { config, dispatch: storeActions, store } = useStore()
  const [editing, setEditing] = useState(false)
  const dragging = useDragging(document)

  // Keyboard shortcuts
  useHotkeys('ctrl+e,cmd+e', () => setEditing((val) => !val))
  useHotkeys('Escape', () => setEditing(false))

  const contextValue = {
    config,
    editing: config.metadata?.readonly ? false : editing,
    dragging,
    setEditing,
    storeActions,
    store,
  }

  return (
    <ConfigContext.Provider value={contextValue}>
      {children}
    </ConfigContext.Provider>
  )
}

const useConfigContext = () => {
  const context = useContext(ConfigContext)

  if (context === undefined) throw new Error('useConfigContext is undefined')

  return context
}

export {
  ConfigProvider,
  ConfigContext,
  useConfigContext,
  useConfigContext as default,
}

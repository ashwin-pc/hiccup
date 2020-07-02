import React from 'react'
import { useConfigContext } from '../ConfigContext'
import { ConfigEditor } from './ConfigEditor'

const ConnectedConfigEditor = () => {
    const { config, updateConfig, resetConfig, clearConfig, setEditing } = useConfigContext()
    return <ConfigEditor config={config} updateConfig={updateConfig} resetConfig={resetConfig} clearConfig={clearConfig} setEditing={setEditing} />
}

export {
    ConnectedConfigEditor,
    ConnectedConfigEditor as ConfigEditor,
    ConnectedConfigEditor as default
}

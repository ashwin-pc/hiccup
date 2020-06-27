import React, { useContext } from 'react'
import { ConfigContext } from '../ConfigContext'
import { ConfigEditor } from './ConfigEditor'

const ConnectedConfigEditor = () => {
    const { config, updateConfig, resetConfig, clearConfig, setEditing } = useContext(ConfigContext)
    return <ConfigEditor config={config} updateConfig={updateConfig} resetConfig={resetConfig} clearConfig={clearConfig} setEditing={setEditing} />
}

export {
    ConnectedConfigEditor,
    ConnectedConfigEditor as ConfigEditor,
    ConnectedConfigEditor as default
}

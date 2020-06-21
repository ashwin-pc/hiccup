import React, { createContext, useCallback, useEffect, useState } from 'react'
import process from 'process'

const CONFIG_KEY = 'config'

const ConfigContext = createContext()

const ConfigProvider = ({ config: overridingConfig, children }) => {
    const [config, setConfig] = useState({})
    const url = (process.env.PUBLIC_URL || '') + '/config.json'

    const getConfig = useCallback(async () => {
        // Give highest priority to the overriding config
        if (overridingConfig) {
            setConfig(overridingConfig)

            return 
        }

        // Check localstorage for config
        const localConfig = localStorage.getItem(CONFIG_KEY)
        if (localConfig) {
            setConfig(JSON.parse(localConfig))

            return
        }
        
        // Else fetch the default file
        const result = await fetch(url).then(response => response.json())

        setConfig(result)
    }, [overridingConfig, url])

    const updateConfig = useCallback(newConfig => {
        setConfig(newConfig)
    }, [])

    const resetConfig = useCallback(() => {
        getConfig()
    }, [getConfig])

    const clearConfig = useCallback(() => {
        localStorage.removeItem(CONFIG_KEY)
        getConfig()
    }, [getConfig])

    useEffect(() => {
        getConfig()
    }, [getConfig])

    useEffect(() => {
        localStorage.setItem(CONFIG_KEY, JSON.stringify(config))
    }, [config])

    return (
        <ConfigContext.Provider value={{ config, updateConfig, resetConfig, clearConfig }}>
            {children}
        </ConfigContext.Provider>
    )
}

export {
    ConfigProvider,
    ConfigContext,
    ConfigContext as default,
}
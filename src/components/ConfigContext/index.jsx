import React, { createContext, useCallback, useEffect, useState } from 'react'
import process from 'process'

const ConfigContext = createContext()

const ConfigProvider = ({ config: overridingConfig, children }) => {
    const [config, setConfig] = useState({})
    const url = (process.env.PUBLIC_URL || '') + '/config.json'

    const getConfig = useCallback(async () => {
        if (overridingConfig) {
            setConfig(overridingConfig)

            return 
        }
        
        const result = await fetch(url).then(response => response.json())

        setConfig(result)
    }, [overridingConfig, url])

    useEffect(() => {
        getConfig()
    }, [getConfig])

    return (
        <ConfigContext.Provider value={config}>
            {children}
        </ConfigContext.Provider>
    )
}

export {
    ConfigProvider,
    ConfigContext,
    ConfigContext as default,
}
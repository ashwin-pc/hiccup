import React, { createContext, useCallback, useEffect, useState } from 'react'
import process from 'process'

const ConfigContext = createContext()

const ConfigProvider = ({ children }) => {
    const [config, setConfig] = useState({})
    const url = (process.env.PUBLIC_URL || '') + '/config.json'

    const getConfig = useCallback(async () => {
        const result = await fetch(url).then(response => response.json())

        setConfig(result)
    }, [url])

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
import React, { useState, useCallback, useEffect } from 'react'
import { ReactComponent as ConfigIcon } from './cog-solid.svg'
import { ReactComponent as SaveIcon } from './save-solid.svg'
import { ReactComponent as ResetIcon } from './undo-solid.svg'
import { ReactComponent as ClearIcon } from './trash-solid.svg'
import { Modal } from '../Modal'
import styles from './index.module.css'

const ConfigEditor = ({ config: defaultConfig, updateConfig, resetConfig, clearConfig }) => {
    const [config, setConfig] = useState(toString(defaultConfig))
    const [show, setShow] = useState(false)

    const handleChange = useCallback(event => setConfig(event.target.value), [])

    const handleSave = useCallback(({ key }) => {
        if(validConfig(config)) {
            updateConfig(JSON.parse(config))
            setShow(false)
        }
    }, [config, updateConfig])

    useEffect(() => defaultConfig && setConfig(toString(defaultConfig)), [defaultConfig])

    return (
        <>
            <Modal show={show} onClose={() => setShow(false)} className={styles.modal}>
                <h1 className={styles.title}>Local Config Editor</h1>
                <textarea className={styles.editor} onChange={handleChange} rows={20} value={config} />
                <div className={styles['modal-button-container']}>
                    <ClearIcon className={styles['modal-icon']} onClick={clearConfig} />
                    <ResetIcon className={styles['modal-icon']} onClick={resetConfig} />
                    <SaveIcon className={styles['modal-icon']} onClick={handleSave}/>
                </div>
            </Modal>
            <ConfigIcon className={styles['config-icon']} onClick={() => setShow(true)}/>
        </>
    )
}


const toString = json => JSON.stringify(json, null, '  ')

// TODO
function validConfig(config) {
    return true
}

export {
    ConfigEditor,
    ConfigEditor as default
}

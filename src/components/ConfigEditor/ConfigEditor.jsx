import React, { useState, useCallback, useEffect } from 'react'
import { Icon } from '../Icon'
import { validateConfig } from '../../modules/validateConfig'
import { Modal } from '../Modal'
import styles from './index.module.css'

const ConfigEditor = ({ config: defaultConfig, updateConfig, resetConfig, clearConfig }) => {
    const [config, setConfig] = useState(toString(defaultConfig))
    const [show, setShow] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)

    const handleChange = useCallback(event => setConfig(event.target.value), [])

    const handleSave = useCallback(({ key }) => {
        const [valid, error, path] = validateConfig(config)
        if(valid) {
            updateConfig(JSON.parse(config))
            setShow(false)
            setErrorMsg(null)
        } else {
            console.log(error)
            setErrorMsg(`${path || 'Generic'} : ${error}`)
        }
    }, [config, updateConfig])

    useEffect(() => {
        if(defaultConfig) {
            setConfig(toString(defaultConfig))
            setErrorMsg(null)
        }
    }, [defaultConfig])

    return (
        <>
            <Modal show={show} onClose={() => setShow(false)} className={styles.modal}>
                <h1 className={styles.title}>Local Config Editor</h1>
                {errorMsg && <p className={styles.error}>{errorMsg}</p>}
                <textarea className={styles.editor} onChange={handleChange} rows={20} value={config} />
                <div className={styles['modal-button-container']}>
                    <Icon icon="trash" className={styles['modal-icon']} onClick={clearConfig} />
                    <Icon icon="undo" className={styles['modal-icon']} onClick={resetConfig} />
                    <Icon icon="save" className={styles['modal-icon']} onClick={handleSave}/>
                </div>
            </Modal>
            <Icon icon="cog" className={styles['config-icon']} onClick={() => setShow(true)}/>
        </>
    )
}


const toString = json => JSON.stringify(json, null, '  ')

export {
    ConfigEditor,
    ConfigEditor as default
}

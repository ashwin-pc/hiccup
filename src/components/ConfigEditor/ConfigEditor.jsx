import React, { useState, useCallback, useEffect } from 'react'
import { Icon } from 'components/common/Icon'
import { validateConfig } from 'modules/config/validate'
import { Modal } from 'components/common/Modal'
import styles from './index.module.css'
import { useHotkeys } from 'react-hotkeys-hook'

const ConfigEditor = ({ config: defaultConfig, updateConfig, resetConfig, clearConfig, setEditing }) => {
    const [config, setConfig] = useState(toString(defaultConfig))
    const [show, setShow] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)

    const handleChange = useCallback(event => setConfig(event.target.value), [])

    const handleSave = useCallback(({ key }) => {
        const [valid, error, path] = validateConfig(config)
        if (valid) {
            updateConfig(JSON.parse(config))
            setShow(false)
            setErrorMsg(null)
        } else {
            console.log(error)
            setErrorMsg(`${path || 'Generic'} : ${error}`)
        }
    }, [config, updateConfig])

    useEffect(() => {
        if (defaultConfig) {
            setConfig(toString(defaultConfig))
            setErrorMsg(null)
        }
    }, [defaultConfig])

    useHotkeys('ctrl+k,cmd+k', () => setShow(val => !val))

    return (
        <>
            <Modal show={show} onClose={() => setShow(false)} className={styles.modal}>
                <h1 className={styles.title}>Local Config Editor</h1>
                {errorMsg && <p className={styles.error}>{errorMsg}</p>}
                <textarea className={styles.editor} onChange={handleChange} rows={20} value={config} />
                <div className={styles['modal-button-container']}>
                    <Icon icon="trash" className={styles['icon']} onClick={clearConfig} />
                    <Icon icon="undo" className={styles['icon']} onClick={resetConfig} />
                    <Icon icon="save" className={styles['icon']} onClick={handleSave} />
                </div>
            </Modal>
            <div className={styles['config-actions-container']}>
                <Icon icon="edit" className={styles['icon']} onClick={() => setEditing(value => !value)} />
                <Icon icon="cog" className={styles['icon']} onClick={() => setShow(true)} />
            </div>
        </>
    )
}


const toString = json => JSON.stringify(json, null, '  ')

export {
    ConfigEditor,
    ConfigEditor as default
}

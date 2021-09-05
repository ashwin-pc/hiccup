import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { useConfigContext } from '../ConfigContext'
import { Icon } from 'components/common/Icon'
import { Modal } from 'components/common/Modal'
import styles from './index.module.css'
import { useHotkeys } from 'react-hotkeys-hook'
import { validate } from 'modules/config'
import { sync } from 'modules/config/load'
import hash from 'modules/hash'

const ConfigEditor = () => {
  const { config, dispatch, setEditing } = useConfigContext()
  const [configText, setConfigText] = useState<string>(toString(config))
  const [fileURL, setFileURL] = useState<string>()

  const [show, setShow] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string>()

  const handleChange = useCallback(
    (event) => setConfigText(event.target.value),
    []
  )

  const handleSave = useCallback(() => {
    try {
      const newConfig = JSON.parse(configText)
      const [valid, error, path] = validate(newConfig)

      if (!valid) {
        setErrorMsg(`${path || 'Generic'} : ${error}`)
        return
      }

      dispatch.setConfig(newConfig)
      setShow(false)
      setErrorMsg(undefined)
    } catch (e) {
      setErrorMsg('Not a valid JSON')
    }
  }, [configText, dispatch])

  const handleSync = useCallback(async () => {
    try {
      const remoteConfig = await sync()
      dispatch.setConfig(remoteConfig)
      setShow(false)
      setErrorMsg(undefined)
    } catch (error) {
      setErrorMsg(`Sync failed: \n${error}`)
    }
  }, [dispatch])

  useEffect(() => {
    try {
      const [valid, error, path] = validate(JSON.parse(configText))

      if (!valid) {
        setErrorMsg(`${path || 'Generic'} : ${error}`)
      }
    } catch (e) {
      setErrorMsg('Not a valid JSON')
    }
    return () => {
      setErrorMsg(undefined)
    }
  }, [configText])

  // update the config text and download link when config changes
  useEffect(() => {
    const blob = new Blob([toString(config)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)

    setConfigText(toString(config))
    setFileURL(url)
  }, [config])

  useHotkeys('ctrl+k,cmd+k', () => setShow((val) => !val))

  const fileName = useMemo(
    () => `config-${hash(toString(config))}.json`,
    [config]
  )

  return (
    <>
      <Modal
        show={show}
        onClose={() => setShow(false)}
        className={styles.modal}
      >
        <h1 className={styles.title}>Local Config Editor</h1>
        {errorMsg && <p className={styles.error}>{errorMsg}</p>}
        <textarea
          className={styles.editor}
          onChange={handleChange}
          rows={20}
          value={configText}
          autoFocus
        />
        <div className={styles['modal-button-container']}>
          <Icon
            icon="sync"
            size={15}
            as="button"
            className={styles['icon']}
            onClick={handleSync}
          />
          <Icon
            icon="download"
            size={13}
            as="a"
            href={fileURL}
            download={fileName}
            className={styles['icon']}
          />
          <Icon
            icon="save"
            size={15}
            as="button"
            className={styles['icon']}
            onClick={handleSave}
          />
        </div>
      </Modal>
      <div className={styles['config-actions-container']}>
        <Icon
          icon="edit"
          as="button"
          className={styles['icon']}
          onClick={() => setEditing((value) => !value)}
        />
        <Icon
          icon="cog"
          as="button"
          className={styles['icon']}
          onClick={() => setShow(true)}
        />
      </div>
    </>
  )
}

const toString = (json: any) => JSON.stringify(json, null, '  ')

export { ConfigEditor, ConfigEditor as default }

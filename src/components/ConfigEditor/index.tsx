import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { useConfigContext } from '../ConfigContext'
import { Icon } from 'components/common/Icon'
import { Modal } from 'components/common/Modal'
import styles from './index.module.css'
import { useHotkeys } from 'react-hotkeys-hook'
import { validate } from 'modules/config'
import { sync } from 'modules/config/load'
import hash from 'modules/hash'
import { UploadButton } from './UploadButton'
import { ConfigEntity } from 'modules/config/Config'

const ConfigEditor = () => {
  const { config, dispatch, setEditing } = useConfigContext()
  const [configText, setConfigText] = useState<string>(toString(config))
  const [fileURL, setFileURL] = useState<string>()

  const [show, setShow] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string>()

  const saveAndCloseModal = useCallback(
    (configToSave: ConfigEntity) => {
      dispatch.setConfig(configToSave)
      setErrorMsg(undefined)
      setShow(false)
    },
    [dispatch]
  )

  const handleChange = useCallback(
    (event) => setConfigText(event.target.value),
    []
  )

  const handleFile = useCallback(
    (file: File) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const uploadedConfig = e.target?.result

        if (typeof uploadedConfig !== 'string') {
          return setErrorMsg(
            'Uploaded file format incorrect. Upload a correct JSON file'
          )
        }

        const [valid, error, path] = validateConfigText(uploadedConfig)

        if (!valid) {
          // If the issue was not in parsing the JSON, show the text in the editor
          if (path !== 'json') {
            setConfigText(uploadedConfig)
          }

          setErrorMsg(`Upload Error:\nError: ${error}\nPath: ${path}`)
          return
        }

        saveAndCloseModal(JSON.parse(uploadedConfig))
      }
      reader.readAsText(file)
    },
    [saveAndCloseModal]
  )

  const handleSave = useCallback(() => {
    const [valid, error, path] = validateConfigText(configText)

    if (!valid) {
      setErrorMsg(`${path || 'Generic'} : ${error}`)
      return
    }

    saveAndCloseModal(JSON.parse(configText))
  }, [configText, saveAndCloseModal])

  const handleSync = useCallback(async () => {
    try {
      const remoteConfig = await sync()
      saveAndCloseModal(remoteConfig)
    } catch (error) {
      setErrorMsg(`Sync failed: \n${error}`)
    }
  }, [saveAndCloseModal])

  useEffect(() => {
    const [valid, error, path] = validateConfigText(configText)
    if (!valid) setErrorMsg(`${path || 'Generic'} : ${error}`)

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
          <UploadButton handleFile={handleFile} />
          <div className={styles.spacer}></div>
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

const validateConfigText = (configString: string) => {
  try {
    const configToValidate = JSON.parse(configString)

    return validate(configToValidate)
  } catch (e) {
    return [false, 'Not a valid JSON', 'parse']
  }
}

export { ConfigEditor, ConfigEditor as default }

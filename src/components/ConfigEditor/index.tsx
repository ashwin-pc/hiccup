import React, { useState, useCallback, useMemo } from 'react'
import { useConfigContext } from '../ConfigContext'
import { Icon } from 'components/common/Icon'
import { Modal } from 'components/common/Modal'
import styles from './index.module.css'
import { useHotkeys } from 'react-hotkeys-hook'
import { fetchConfig } from 'modules/config/load'
import { ConfigEntity } from 'modules/config/types'
import { MainScreen } from './MainScreen'
import { AddScreen } from './AddScreen'

type SCREENS = 'main' | 'add' | 'edit'
export type ScreenHandler = React.Dispatch<React.SetStateAction<SCREENS>>

const ConfigEditor = () => {
  const { config, dispatch, setEditing } = useConfigContext()
  const [show, setShow] = useState(false)
  const [screen, setScreen] = useState<SCREENS>('add')

  const currentScreen = useMemo(() => {
    switch (screen) {
      case 'main':
        return <MainScreen setScreen={setScreen} />

      case 'add':
        return <AddScreen />

      default:
        break
    }
  }, [screen])

  const saveAndCloseModal = useCallback(
    (configToSave: ConfigEntity) => {
      dispatch.setConfig(configToSave)
      setShow(false)
    },
    [dispatch]
  )

  const handleSync = useCallback(async () => {
    try {
      const remoteConfig = await fetchConfig()
      saveAndCloseModal(remoteConfig)
    } catch (error) {
      console.error(`Sync failed: \n${error}`)
    }
  }, [saveAndCloseModal])

  useHotkeys('ctrl+k,cmd+k', () => setShow((val) => !val))

  return (
    <>
      <Modal
        show={show}
        onClose={() => setShow(false)}
        className={styles.modal}
      >
        {currentScreen}
      </Modal>
      <div className={styles['config-actions-container']}>
        {config.metadata?.readonly ? (
          <Icon
            icon="sync"
            as="button"
            aria-label="sync"
            className={styles['icon']}
            onClick={() => handleSync()}
          />
        ) : (
          <>
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
          </>
        )}
      </div>
    </>
  )
}

export { ConfigEditor, ConfigEditor as default }

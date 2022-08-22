import React, { useState, useCallback, useMemo } from 'react'
import { useConfigContext } from '../ConfigContext'
import { Icon } from 'components/common/Icon'
import { Modal } from 'components/common/Modal'
import styles from './index.module.css'
import { useHotkeys } from 'react-hotkeys-hook'
import { networkCall } from 'modules/config/load'
import { MainScreen } from './MainScreen'
import { StoreScreen } from './StoreScreen'
import toast from 'react-hot-toast'

type SCREENS = 'main' | 'store' | 'edit'
export type ScreenHandler = React.Dispatch<React.SetStateAction<SCREENS>>

const ConfigEditor = () => {
  const { config, setEditing, storeActions } = useConfigContext()
  const [show, setShow] = useState(false)
  const [screen, setScreen] = useState<SCREENS>('store')

  const currentScreen = useMemo(() => {
    switch (screen) {
      case 'main':
        return <MainScreen setScreen={setScreen} />

      case 'store':
        return <StoreScreen />

      default:
        break
    }
  }, [screen])

  const handleSync = useCallback(async () => {
    try {
      if (!config.url)
        return toast.error('Cannot sync config without the url param')

      const remoteConfig = await networkCall(config.url)

      if (remoteConfig) {
        storeActions.saveConfig(remoteConfig)
        toast.success('Sync success')
      }
    } catch (error) {
      console.error(`Sync failed: \n${error}`)
    }
  }, [config.url, storeActions])

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
        <>
          {config.url && (
            <Icon
              icon="sync"
              as="button"
              aria-label="sync"
              className={styles['icon']}
              onClick={() => handleSync()}
            />
          )}
          {!config.metadata?.readonly && (
            <Icon
              icon="edit"
              as="button"
              className={styles['icon']}
              onClick={() => setEditing((value) => !value)}
            />
          )}
          <Icon
            icon="cog"
            as="button"
            className={styles['icon']}
            onClick={() => setShow(true)}
          />
        </>
      </div>
    </>
  )
}

export { ConfigEditor, ConfigEditor as default }

import React, { useState, useCallback, useMemo } from 'react'
import { useConfigContext } from '../ConfigContext'
import { Icon } from 'components/common/Icon'
import { Modal } from 'components/common/Modal'
import { useHotkeys } from 'react-hotkeys-hook'
import { MainScreen } from './MainScreen'
import { StoreScreen } from './StoreScreen'
import toast from 'react-hot-toast'
import styles from './index.module.css'

type SCREENS = 'main' | 'store' | 'edit'
export type ScreenHandler = React.Dispatch<React.SetStateAction<SCREENS>>

const ConfigEditor = () => {
  const {
    config,
    refetchConfig,
    storeActions,
    updateAvailableConfigs,
    availableConfigs,
    configService,
  } = useConfigContext()
  const [show, setShow] = useState(false)
  const [screen, setScreen] = useState<SCREENS>('main')

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
      await refetchConfig()
      toast.success('Sync success')
    } catch (error) {
      console.error(`Sync failed: \n${error}`)
    }
  }, [refetchConfig])

  const handleSave = useCallback(async () => {
    if (!config) return
    try {
      const savedConfig = await configService.saveConfig(config)
      updateAvailableConfigs({
        ...availableConfigs,
        [savedConfig.id]: savedConfig,
      })
    } catch (error) {
      console.error('Failed to save config', error)
      toast.error('Failed to save config')
    }
  }, [config, configService, updateAvailableConfigs, availableConfigs])

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
          {config?.edited && (
            <Icon
              icon="save"
              as="button"
              aria-label="save"
              data-testid="global-save"
              className={styles['icon']}
              onClick={() => handleSave()}
            />
          )}
          {config?.remote && (
            <Icon
              icon="sync"
              as="button"
              aria-label="sync"
              data-testid="global-sync"
              className={styles['icon']}
              onClick={() => handleSync()}
            />
          )}
          {!config?.readonly && (
            <Icon
              icon="edit"
              as="button"
              data-testid="global-edit"
              className={styles['icon']}
              onClick={() => storeActions.toggleEditing()}
            />
          )}
          <Icon
            icon="cog"
            as="button"
            data-testid="global-settings"
            className={styles['icon']}
            onClick={() => setShow(true)}
          />
        </>
      </div>
    </>
  )
}

export { ConfigEditor, ConfigEditor as default }

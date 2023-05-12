import { IconButton } from 'components/common/Icon'
import styles from './index.module.css'
import useConfigContext from 'components/ConfigContext'
import { ConfigEntity, EMPTY_CONFIG } from 'modules/config'
import { networkCall, load as loadConfig } from 'modules/config/load'
import { delay } from 'modules/utils'
import { FC, useState } from 'react'
import toast from 'react-hot-toast'
import { ListAction } from './ListAction'
import { DownloadAction } from './DownloadAction'

export const ConfigList: FC<{ previewId: string; setPreviewId: any }> = ({
  previewId,
  setPreviewId,
}) => {
  const [seeListActions, setSeeListActions] = useState<string>()
  const { config: currentConfig, storeActions, store } = useConfigContext()
  const availableConfigs: ConfigEntity[] = Object.values(store.configs || {})

  return (
    <div className={styles.list}>
      {availableConfigs.map((config) => {
        const previewing = config.id === previewId
        const active = config.id === currentConfig.id

        return (
          <>
            <div
              key={config.id}
              className={`${styles.listItem} ${previewing && 'previewing'}`}
              data-id={config.id}
              tabIndex={previewing ? -1 : 0}
              onClick={() => setPreviewId(config.id)}
              onKeyUp={({ key }) => key === 'Enter' && setPreviewId(config.id)}
              role="button"
              data-testid={`cached-config-${config.id}`}
            >
              <span>{config.title}</span>

              {active ? (
                <div
                  className={styles.listActiveIndicator}
                  data-testid="active-indicator"
                ></div>
              ) : (
                <IconButton
                  icon="check"
                  buttonClassname={styles.listButton}
                  onSubmit={async () => {
                    storeActions.setActiveId(config.id)

                    // Use the caching strategy to load latest value
                    await delay()
                    if (config.url) {
                      const loadedConfig = await loadConfig(config.url)
                      storeActions.saveConfig(loadedConfig)
                    }
                  }}
                />
              )}

              <IconButton
                icon="ellipsis"
                buttonClassname={styles.listButton}
                onSubmit={() =>
                  seeListActions === config.id
                    ? setSeeListActions(undefined)
                    : setSeeListActions(config.id)
                }
                data-testid="ellipsis-button"
              />
            </div>
            {seeListActions === config.id && (
              <div className={styles.listActionContainer}>
                <DownloadAction id={config.id} />
                {config.url && (
                  <ListAction
                    icon="sync"
                    text="Sync"
                    onClick={async () => {
                      const remoteConfig = await networkCall(config.url)
                      if (!remoteConfig) return

                      storeActions.saveConfig(remoteConfig, false)
                      toast.success(`Synced URL: ${config.url}`)
                    }}
                    data-testid="sync-button"
                  />
                )}
                {!(
                  config.id === EMPTY_CONFIG.id || config.id === 'default'
                ) && (
                  <ListAction
                    icon="trash"
                    text="Delete"
                    onClick={() => {
                      try {
                        storeActions.deleteConfig(config.id)
                        toast.success(`Deleted config ${config.title}`)
                      } catch (error) {
                        toast.error(
                          `Error deleting config. Error ${
                            (error as Error).message
                          }`
                        )
                      }
                    }}
                    data-testid="delete-button"
                  />
                )}
              </div>
            )}
          </>
        )
      })}
    </div>
  )
}

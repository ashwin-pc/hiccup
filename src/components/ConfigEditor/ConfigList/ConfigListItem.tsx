import { useConfigContext } from 'components/ConfigContext'
import { Icon, IconButton, IconTypes } from 'components/common/Icon'
import { getInitialsFromCamelCase, Config } from 'modules/config'
import toast from 'react-hot-toast'
import { Action, ListAction } from './ListAction'
import { useAction } from './useAction'
import styles from './index.module.css'

const RemoteMap: {
  [key: string]: IconTypes
} = {
  url: 'earth',
  localStorage: 'table',
}

export const ConfigListItem = ({
  config,
  showActions,
  toggleShow,
}: {
  config: Config
  showActions: boolean
  toggleShow: () => void
}) => {
  const {
    configService,
    updateAvailableConfigs,
    availableConfigs,
    config: activeConfig,
    setActiveConfig,
  } = useConfigContext()

  const actions: Action[] = useAction(config)
  const isActive = config.id === activeConfig?.id

  return (
    <div
      id={config.id}
      className={`${styles['list-item']}`}
      onClick={() => {
        setActiveConfig(config.id)
      }}
      tabIndex={0}
      data-testid={`config-${config.id}`}
    >
      <span
        className={`${styles['list-item-remote']} ${
          isActive ? styles['active'] : ''
        }`}
        aria-label="remote"
        title={config.remote.type}
        {...(isActive && { 'data-testid': 'active-indicator' })}
      >
        {RemoteMap[config.remote.type] ? (
          <Icon icon={RemoteMap[config.remote.type]} size={15} />
        ) : (
          getInitialsFromCamelCase(config.remote.type)
        )}
      </span>
      <span className={`${styles['list-item-title']}`}>
        {config.title}
        {` `}
        {config.readonly && (
          <Icon icon="glasses" size={12} color="var(--theme-color-disabled)" />
        )}
      </span>
      {/* Let the user know that the load failed */}
      {(!config.data || config.error) && (
        <div
          className={`${styles['list-item-alert']}`}
          title={config.error || 'Failed to load config'}
        >
          <Icon
            icon="triangle-exclamation"
            size={13}
            color="var(--theme-warning-1)"
          />
        </div>
      )}
      {/* Let the user know that the load failed */}
      {config.edited && (
        <IconButton
          icon="save"
          size={13}
          color="var(--theme-success-1)"
          onSubmit={async () => {
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
          }}
          className={`${styles['list-item-action-cta']}`}
        />
      )}
      <IconButton
        icon="ellipsis"
        onSubmit={() => toggleShow()}
        buttonClassname={`${styles['list-item-action-toggle']}`}
      />
      <div className={`${styles['list-item-actions']}`}>
        {showActions &&
          actions.map((action, index) => (
            <ListAction key={index} {...action} />
          ))}
      </div>
    </div>
  )
}

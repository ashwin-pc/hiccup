import React from 'react'
import { useConfigContext } from 'components/ConfigContext'
import styles from './index.module.css'
import { ConfigListItem } from './ConfigListItem'
import { UploadButton } from './UploadButton'

export const ConfigList = () => {
  const { availableConfigs, addConfig } = useConfigContext(
    ({ availableConfigs, addConfig }) => ({
      availableConfigs,
      addConfig,
    })
  )
  const [activeItemId, setActiveItemId] = React.useState<string | null>(null)

  const handleToggleShow = (id: string) => {
    // Toggle the active item: if it's already active, close it, otherwise, open the clicked one.
    setActiveItemId((currentId) => (currentId === id ? null : id))
  }

  return (
    <div className={`${styles['list-container']}`}>
      <div className={`${styles.list}`}>
        {Object.values(availableConfigs).map((config) => (
          <ConfigListItem
            key={config.id}
            config={config}
            showActions={config.id === activeItemId}
            toggleShow={() => handleToggleShow(config.id)}
          />
        ))}
      </div>
      <UploadButton addConfig={addConfig} className={styles.upload} />
    </div>
  )
}

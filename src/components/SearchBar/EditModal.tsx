import { Icon } from 'components/common/Icon'
import { Input } from 'components/common/Input'
import Modal, { styles as modalStyles } from 'components/common/Modal'
import useConfigContext from 'components/ConfigContext'
import { setSearchProviders } from 'modules/config/configHelpers'
import { useState, useCallback } from 'react'
import { HydratedProvider, SEARCH_PROVIDERS } from './constants'
import { getHydratedProviders } from './utils'
import styles from './index.module.css'

export const EditModal = ({
  show,
  onClose,
}: {
  show: boolean
  onClose: Function
}) => {
  const { config, updateConfig } = useConfigContext((state) => ({
    config: state.config?.data,
    updateConfig: state.updateConfig,
  }))
  const [type, setType] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [url, setUrl] = useState<string>('')
  const providers = getHydratedProviders(config?.metadata?.search ?? [])

  const addProvider = useCallback(
    (provider: HydratedProvider) => {
      if (!config) return
      const { config: newConfig, invalid } = setSearchProviders(config, [
        ...(config.metadata?.search ?? []),
        provider,
      ])

      if (invalid) return

      updateConfig(newConfig)
    },
    [config, updateConfig]
  )

  const addCustomProvider = useCallback(() => {
    if (type === '' || name === '' || url === '') return
    const newProvider = { type, name, url }
    addProvider(newProvider)
  }, [addProvider, name, type, url])

  const removeProvider = useCallback(
    (removeType: string) => {
      if (!config) return
      const newProviders = [...(config.metadata?.search ?? [])]
      const removeIndex = newProviders.findIndex(
        ({ type: providerType }) => providerType === removeType
      )

      if (removeIndex < 0) return

      newProviders.splice(removeIndex, 1)
      const { config: newConfig, invalid } = setSearchProviders(
        config,
        newProviders
      )

      if (invalid) return

      updateConfig(newConfig)
    },
    [config, updateConfig]
  )

  const selectedTypes = providers.map(({ type }) => type)
  const availableProviders = SEARCH_PROVIDERS.filter(
    ({ type: availableType }) => !selectedTypes.includes(availableType)
  )

  return (
    <Modal show={show} onClose={onClose}>
      <h2 data-testid="edit-link-title" className={modalStyles.title}>
        Edit Search Providers
      </h2>

      {/* Selected providers */}
      <div className={styles['modal-section']}>
        <h3 className={styles['modal-section-title']}>Selected Providers</h3>
        <div>
          {providers.map(({ type, name }) => (
            <span key={name} className={styles['modal-provider']}>
              {name}
              <Icon
                icon="times"
                as="button"
                size={10}
                className={styles['delete-provider']}
                onClick={() => removeProvider(type)}
              />
            </span>
          ))}
        </div>
      </div>

      {/* Available providers */}
      <div className={styles['modal-section']}>
        <h3 className={styles['modal-section-title']}>Available Providers</h3>
        <div>
          {availableProviders.map((provider) => (
            <span key={provider.name} className={styles['modal-provider']}>
              {provider.name}
              <Icon
                icon="plus"
                as="button"
                size={10}
                className={styles['add-provider']}
                onClick={() => addProvider(provider)}
              />
            </span>
          ))}
        </div>
      </div>

      {/* Custom Provider */}
      <h3 className={styles['modal-section-title']}>Custom Provider</h3>
      <Input
        label="type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        placeholder="Unique id e.g.yahoo"
      />
      <Input
        label="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Display name"
      />
      <Input
        label="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="e.g. https://yahoo.com?s="
      />

      <div className={styles['modal-actions']}>
        <button
          onClick={() => addCustomProvider()}
          className={modalStyles.button}
        >
          Add Provider
        </button>
        <button onClick={() => onClose()} className={modalStyles.button}>
          Close
        </button>
      </div>
    </Modal>
  )
}

import useConfigContext from 'components/ConfigContext'
import { triggerEdit } from 'components/EditLinkModal'
import { Action } from './ListAction'
import { Config } from 'modules/config'

export const useAction = (config: Config) => {
  const {
    configService,
    updateAvailableConfigs,
    updateConfig,
    availableConfigs,
    deleteConfig,
  } = useConfigContext()

  const actions: Action[] = [
    {
      icon: 'download',
      text: 'Download',
      onClick: () => {
        const element = document.createElement('a')
        const file = new Blob([JSON.stringify(config.data, null, 2)], {
          type: 'application/json',
        })
        element.href = URL.createObjectURL(file)
        element.download = `${config.title}.json`
        document.body.appendChild(element) // Required for this to work in FireFox
        element.click()
      },
    },
  ]

  if (config.data) {
    actions.push({
      icon: 'plus',
      onClick: async () => {
        const clonedConfig = configService.clone(config)
        updateAvailableConfigs({
          ...availableConfigs,
          [clonedConfig.id]: clonedConfig,
        })
      },
      text: 'Clone',
    })
  }

  if (!config.readonly) {
    actions.push({
      icon: 'trash',
      onClick: () => {
        deleteConfig(config)
      },
      text: 'Delete',
      color: 'var(--theme-warning-1)',
    })

    actions.push({
      icon: 'edit',
      onClick: () => {
        triggerEdit({
          fields: [
            {
              label: 'Title',
              value: config.title,
              type: 'input',
            },
          ],
          onSave: (fields) => {
            const newTitle = fields[0].value
            updateConfig({}, { id: config.id, edited: true, title: newTitle })
          },
          title: `Edit Config title`,
        })
      },
      text: 'Edit',
    })
  }

  return actions
}

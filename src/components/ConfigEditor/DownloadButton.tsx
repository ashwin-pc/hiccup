import Icon from 'components/common/Icon'
import useConfigContext from 'components/ConfigContext'
import styles from './StoreScreen.module.css'
import { FC, useRef } from 'react'
import toast from 'react-hot-toast'
import { triggerEdit } from 'components/EditLinkModal'
import produce from 'immer'
import { EditModalField } from 'components/EditLinkModal/EditLinkModal'
import { ConfigEntity, validate } from 'modules/config'
import { transformFieldsToEntity } from 'components/EditLinkModal/transforms'

type EditingConfigEntity = Pick<ConfigEntity, 'id' | 'title' | 'url'>

interface EditingField {
  id: keyof EditingConfigEntity
  label: string
  type: 'input'
}

const EDITING_FIELDS: EditingField[] = [
  {
    id: 'id',
    label: 'id',
    type: 'input',
  },
  {
    id: 'title',
    label: 'title',
    type: 'input',
  },
  {
    id: 'url',
    label: 'url',
    type: 'input',
  },
]

export const DownloadButton: FC<{
  id?: string
  disabled?: boolean
  size?: number
}> = ({ id, disabled, size = 14 }) => {
  const linkRef = useRef<HTMLAnchorElement>(null)
  const { store } = useConfigContext()
  const configId = id ?? store.active
  const config = store.configs[configId]

  const onSave = async (
    fields: EditModalField[]
  ): Promise<false | undefined> => {
    try {
      // Write new props to config
      const newConfig = produce(config, (draft) => {
        const editidField = transformFieldsToEntity(
          fields
        ) as EditingConfigEntity

        draft.id = editidField.id
        draft.title = editidField.title
        draft.url = editidField.url

        if (!editidField.url) delete draft.url
        if (!draft.metadata) {
          draft.metadata = {}
        }

        delete draft.metadata?.editing
      })

      const [valid, message, path] = validate(newConfig)

      if (!valid)
        throw new Error(
          `Error Downlaoding. Invaild Config. \n${path}\n${message}`
        )

      const blob = new Blob([JSON.stringify(newConfig, null, 2)], {
        type: 'application/json',
      })
      const url = URL.createObjectURL(blob)

      linkRef.current!.href = url
      linkRef.current!.download = `config-${newConfig.id}.json`

      // await delay(100)
      linkRef.current!.click()
    } catch (error) {
      toast.error((error as Error).message)
      return false
    }
  }

  const handleChange = async (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    if (disabled) return

    try {
      const configId = id ?? store.active
      const config = store.configs[configId]

      triggerEdit({
        fields: EDITING_FIELDS.map((field) => ({
          ...field,
          value: config[field.id],
        })),
        title: 'New config attributes',
        onSave,
      })
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  return (
    <>
      <button
        disabled={disabled}
        onClick={handleChange}
        className={`${disabled && 'disabled'} ${styles.downloadButton}`}
        onKeyUp={(e) => e.key === 'Enter' && handleChange(e)}
        data-testid="download-button"
      >
        <Icon size={size} icon="download" />
        Download Preview
        {/** eslint-disable-next-line jsx-a11y/anchor-has-content */}
      </button>
      <a style={{ display: 'none' }} ref={linkRef} href="./">
        Test
      </a>
    </>
  )
}

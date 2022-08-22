import useConfigContext from 'components/ConfigContext'
import styles from './StoreScreen.module.css'
import { FC } from 'react'
import toast from 'react-hot-toast'

const printJSON = (json: object) => {
  try {
    return JSON.stringify(json, null, 2)
  } catch (error) {
    toast.error((error as Error).message)
    return ''
  }
}

const TextItem: FC<{ label: string; text: string; id: string }> = ({
  label,
  text,
  id,
}) => (
  <div className={styles.lineItem} id={id}>
    <label>{label}</label>
    <p>{text}</p>
  </div>
)

const JsonItem: FC<{ label: string; json: object; id: string }> = ({
  id,
  json,
  label,
}) => (
  <div className={styles.lineItem} id={id}>
    <label>{label}</label>
    <pre>
      <code>{printJSON(json)}</code>
    </pre>
  </div>
)

export const FileViewer: FC<{ configId: string }> = ({ configId }) => {
  const { store } = useConfigContext()
  const previewConfig = store.configs[configId]

  if (!previewConfig) return <div className={styles.fileViewer}></div>

  const { version, id, title, url, featured, categories, metadata } =
    previewConfig

  return (
    <div className={styles.fileViewer}>
      <TextItem
        id="version"
        label="Version"
        text={version ?? 'old-please-delete'}
      />
      <TextItem id="id" label="Id" text={id} />
      <TextItem id="title" label="Title" text={title} />
      <TextItem id="url" label="URL" text={url ?? 'No URL'} />
      <JsonItem id="featured" label="Featured" json={featured} />
      <JsonItem id="categories" label="Categories" json={categories} />
      <JsonItem id="metadata" label="Metadata" json={metadata ?? {}} />
    </div>
  )
}

import { Config } from 'modules/config'
import styles from './ConfigDetails.module.css'
import { useConfigContext } from 'components/ConfigContext'

export const ConfigDetails = () => {
  const { config } = useConfigContext()
  const propsToPick: (keyof Config)[] = ['id', 'title', 'readonly', 'error']

  if (!config) return null
  return (
    <div className={styles.container}>
      <h3>Config Details</h3>
      {propsToPick
        .filter((prop) => config[prop] !== undefined)
        .map((prop) => (
          <div key={prop} className={styles.row}>
            <div className={styles.label}>{prop}</div>
            <div className={styles.value}>{config[prop]?.toString()}</div>
          </div>
        ))}
    </div>
  )
}

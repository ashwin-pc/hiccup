import { FC, useMemo, useState, useEffect } from 'react'
import style from './index.module.css'
import useConfigContext from 'components/ConfigContext'
import { AppState } from 'modules/config'

interface Status {
  text: string
  type?: 'error' | 'warning' | 'info'
  details?: string
}

export const StatusCard: FC = () => {
  const { config, store, dragging: draggingOverDocument } = useConfigContext()
  const [displayStatus, setDisplayStatus] = useState<Status>()

  const status: Status | undefined = useMemo(() => {
    if (config?.error) {
      return {
        text: `Error in current config: ${config.error}`,
        type: 'error',
        details: JSON.stringify(config, null, 2),
      }
    }

    if (store?.state === AppState.LOADING) {
      return {
        text: `Loading.`,
        type: 'info',
        details: 'Loading the config data. Please wait.',
      }
    }

    if (draggingOverDocument) {
      return {
        text: `Drop the config file into any input to load it.`,
        type: 'info',
      }
    }
    return
  }, [config, draggingOverDocument, store?.state])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null

    if (store?.state === AppState.UNINITIALIZED) {
      timeoutId = setTimeout(() => {
        setDisplayStatus({
          text: `Starting the app.`,
          type: 'warning',
          details:
            'You should not be seeing this message. If you do, please report it to the developers.',
        })
      }, 1000) // Delay of 1 second
    } else {
      setDisplayStatus(status)
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [status, store?.state]) // Dependency on store.state to reset delay if state changes

  if (!displayStatus) {
    return null
  }

  return (
    <div
      className={`${style.container} ${style[displayStatus.type ?? 'info']}`}
    >
      <p>{displayStatus.text}</p>
      {/* Log the config object in a pretty form */}
      {displayStatus.details && <pre>{displayStatus.details}</pre>}
    </div>
  )
}

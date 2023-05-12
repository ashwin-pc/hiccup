import React, { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { Modal, styles as modalStyles } from 'components/common/Modal'
import styles from './index.module.css'

export const HOTKEYS = {
  'Ctrl/⌘ + /': 'Toggle Shortcuts',
  'Ctrl/⌘ + E': 'Toggle Edit mode',
  'Ctrl/⌘ + K': 'Toggle Config editor',
}

export function Hotkeys() {
  const [isVisible, setIsVisible] = useState(false)
  useHotkeys('ctrl+/,cmd+/', () => setIsVisible((visible) => !visible))

  return (
    <Modal show={isVisible} onClose={() => setIsVisible(false)}>
      <h1 data-testid="hotkey-modal-title" className={modalStyles.title}>
        Hotkeys
      </h1>
      <div className={styles.hotkeyContainer}>
        {Object.entries(HOTKEYS).map(([key, description], index) => (
          <div key={index} className={styles.hotkey}>
            <span className={styles.key}>{key}</span>
            <p className={styles.description}>{description}</p>
          </div>
        ))}
      </div>
    </Modal>
  )
}

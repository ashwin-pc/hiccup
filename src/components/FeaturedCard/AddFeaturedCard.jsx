import React, { useCallback, useState } from 'react'
import { Icon } from '../Icon'
import { EditLinkModal } from '../EditLinkModal'
import styles from './index.module.css'

const DEFAULT_BG = '/assets/card.png'

const DEFAULT_LINK = {
    name: '',
    link: '',
    background: DEFAULT_BG,
    tags: ''
}

const AddFeaturedCard = ({ onSave }) => {
    const [showEditModal, setShowEditModal] = useState(false)

    const handleSave = useCallback(editedLink => {
        setShowEditModal(false)
        onSave && onSave(editedLink)
    }, [onSave])

    return (
        <div className={[styles.container, styles['add-card']].join(' ')}>
            <Icon icon="add" className={styles['add-icon']} onClick={() => setShowEditModal(true)} />
            <EditLinkModal show={showEditModal} fields={DEFAULT_LINK} onCancel={() =>  setShowEditModal(false)} onSave={handleSave} />
        </div>
    )
}

export {
    AddFeaturedCard,
    AddFeaturedCard as default,
    DEFAULT_BG,
    DEFAULT_LINK,
}
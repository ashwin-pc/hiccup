import React, { useCallback, useState } from 'react'
import { Icon } from '../Icon'
import { EditLinkModal } from '../EditLinkModal'
import styles from './index.module.css'

const DEFAULT_CATEGORY = {
    title: '',
}

const AddCategory = ({ onSave }) => {
    const [showEditModal, setShowEditModal] = useState(false)

    const handleSave = useCallback(newCategory => {
        setShowEditModal(false)
        newCategory.links = []
        onSave && onSave(newCategory)
    }, [onSave])

    return (
        <div className={styles['add-container']}>
            <Icon icon="folder-plus" size={30} className={styles['add-icon']} onClick={() => setShowEditModal(true)} />
            <EditLinkModal show={showEditModal} fields={DEFAULT_CATEGORY} onCancel={() =>  setShowEditModal(false)} onSave={handleSave} />
        </div>
    )
}

export {
    AddCategory,
    AddCategory as default,
    DEFAULT_CATEGORY,
}
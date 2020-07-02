import React, { useState, useMemo, useCallback } from 'react'
import { Card } from '../Card'
import { Icon } from '../Icon'
import { EditLinkModal } from '../EditLinkModal'
import { DEFAULT_LINK } from './AddCategoryCard'
import styles from './index.module.css'

const CategoryCard = ({ link, edit }) => {
    const { name, link: linkUrl } = link

    return (
        <Card href={!edit && linkUrl} className={styles.container} link={link}>
            <span className={styles.name}>{name}</span>
            <span className={styles.link}>{linkUrl}</span>
            {edit && <EditContainer {...edit} link={link} />}
        </Card>
    )
}

const EditContainer = ({ onEdit, onDelete, link }) => {
    const [showEditModal, setShowEditModal] = useState(false)
    const linkFields = useMemo(() => ({
        ...DEFAULT_LINK,
        ...link
    }), [link])
    const handleSave = useCallback(editedLink => {
        setShowEditModal(false)
        onEdit && onEdit(editedLink)
    }, [onEdit])

    return (
        <>
            <div className={styles['edit-container']}>
                <Icon icon="edit" className={styles['edit-icon']} onClick={() => setShowEditModal(true)} />
                <Icon icon="trash" className={styles['delete-icon']} onClick={onDelete} />
            </div>
            <EditLinkModal show={showEditModal} fields={linkFields} onCancel={() =>  setShowEditModal(false)} onSave={handleSave} />
        </>
    )
}

export {
    CategoryCard,
    CategoryCard as default
}
import React, { useState, useMemo, useCallback } from 'react'
import process from 'process'
import { Card } from '../Card'
import { Icon } from '../Icon'
import { EditLinkModal } from '../EditLinkModal'
import { DEFAULT_BG, DEFAULT_LINK } from './AddFeaturedCard'
import styles from './index.module.css'

const FeaturedCard = ({ link, edit }) => {
    const { name, link: linkUrl, background = DEFAULT_BG } = link || {}
    const backgroundUrl = isAbsoluteURL(background) ? background : (process.env.PUBLIC_URL || '.') + background

    return (
        <Card href={!edit && linkUrl} className={styles.container} background={backgroundUrl} link={link} >
            {edit && <EditContainer {...edit} link={link} />}
            {name}
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

function isAbsoluteURL(url) {
    const pat = /^https?:\/\//i
    return pat.test(url)
}

export {
    FeaturedCard,
    FeaturedCard as default
}
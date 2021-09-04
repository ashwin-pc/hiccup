import React, { useState, useMemo, useCallback } from 'react'
import { Card } from 'components/Card'
import { Icon } from 'components/common/Icon'
import { EditLinkModal } from 'components/EditLinkModal'
import { DEFAULT_LINK } from './AddCategoryCard'
import styles from './index.module.css'
import { LinksEntity } from 'modules/config/Config'

interface EditProps {
  onEdit: (link: LinksEntity) => void
  onDelete: () => void
}

interface CategoryCardProps {
  link: LinksEntity
  edit: false | EditProps
}

const CategoryCard = ({ link, edit }: CategoryCardProps) => {
  const { name, link: linkUrl } = link

  return (
    <Card href={!edit && linkUrl} className={styles.container} link={link}>
      <span className={styles.name}>{name}</span>
      <span className={styles.link}>{linkUrl}</span>
      {edit && <EditContainer {...edit} link={link} />}
    </Card>
  )
}

interface EditContainerProps extends EditProps {
  link: LinksEntity
}

const EditContainer = ({ onEdit, onDelete, link }: EditContainerProps) => {
  const [showEditModal, setShowEditModal] = useState(false)
  const linkFields = useMemo(
    () => ({
      ...DEFAULT_LINK,
      ...link,
    }),
    [link]
  )
  const handleSave = useCallback(
    (editedLink: LinksEntity) => {
      setShowEditModal(false)
      onEdit && onEdit(editedLink)
    },
    [onEdit]
  )

  return (
    <>
      <div className={styles['edit-container']}>
        <Icon
          icon="edit"
          size={15}
          className={styles['edit-icon']}
          onClick={() => setShowEditModal(true)}
        />
        <Icon
          icon="trash"
          size={15}
          className={styles['delete-icon']}
          onClick={onDelete}
        />
      </div>
      <EditLinkModal
        show={showEditModal}
        fields={linkFields}
        onCancel={() => setShowEditModal(false)}
        onSave={handleSave}
      />
    </>
  )
}

export { CategoryCard, CategoryCard as default }

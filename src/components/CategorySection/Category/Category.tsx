import React, { useState, useCallback, useMemo } from 'react'
import { Icon } from 'components/common/Icon'
import { EditLinkModal } from 'components/EditLinkModal'
import { CategoryCard, AddCategoryCard } from './CategoryCard'
import styles from './index.module.css'
import { CategoriesEntity } from 'modules/config/Config'

interface CategoryProps extends CategoriesEntity {
  index: number
  edit:
    | false
    | {
        onEdit: (title: string) => void
        onDelete: () => void
      }
}

const Category = ({
  title,
  links,
  index: categoryIndex,
  edit,
}: CategoryProps) => (
  <div className={styles.category}>
    <h1 className={styles.title}>
      {title}
      {edit && <EditContainer {...edit} title={title} />}
    </h1>
    <ul>
      {links.map((link, index) => (
        <CategoryCard
          key={index}
          link={link}
          index={index}
          categoryIndex={categoryIndex}
        />
      ))}
      <AddCategoryCard categoryIndex={categoryIndex} />
    </ul>
  </div>
)

const EditContainer = ({
  onEdit,
  onDelete,
  title,
}: {
  onEdit: (title: string) => void
  onDelete: () => void
  title: string
}) => {
  const [showEditModal, setShowEditModal] = useState(false)
  const linkFields = useMemo(() => ({ title }), [title])
  const handleSave = useCallback(
    ({ title }) => {
      setShowEditModal(false)
      onEdit && onEdit(title)
    },
    [onEdit]
  )

  return (
    <>
      <div className={styles['edit-container']}>
        <Icon
          icon="edit"
          className={styles['edit-icon']}
          size={13}
          onClick={() => setShowEditModal(true)}
        />
        <Icon
          icon="trash"
          className={styles['delete-icon']}
          size={13}
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

export { Category, Category as default }

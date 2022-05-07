import { useMemo } from 'react'
import { Icon } from 'components/common/Icon'
import { triggerEdit } from 'components/EditLinkModal'
import { CategoryCard, AddCategoryCard } from './CategoryCard'
import styles from './index.module.css'
import { CategoriesEntity } from 'modules/config/types'
import { transformEntityToFields } from 'components/EditLinkModal/transforms'
import { EditModalField } from 'components/EditLinkModal/EditLinkModal'

interface EditProps {
  onEdit: (fields: EditModalField[]) => void
  onDelete: () => void
}

interface EditContainerProps extends EditProps {
  title: string
}

interface CategoryProps extends EditProps, CategoriesEntity {
  index: number
  editing: boolean
}

const Category = ({
  title,
  links,
  index: categoryIndex,
  editing,
  ...editingProps
}: CategoryProps) => (
  <div className={styles.category}>
    <h1 className={styles.title}>
      {title}
      {editing && <EditContainer {...editingProps} title={title} />}
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
      <AddCategoryCard title={title} categoryIndex={categoryIndex} />
    </ul>
  </div>
)

const EditContainer = ({ onEdit, onDelete, title }: EditContainerProps) => {
  const categoryEntity = useMemo(() => ({ title }), [title])

  return (
    <>
      <div className={styles['edit-container']}>
        <Icon
          icon="edit"
          className={styles['edit-icon']}
          size={13}
          as="button"
          onClick={() =>
            triggerEdit({
              fields: transformEntityToFields(categoryEntity),
              onSave: onEdit,
              title: 'Edit Category',
            })
          }
        />
        <Icon
          icon="trash"
          className={styles['delete-icon']}
          size={13}
          as="button"
          onClick={onDelete}
        />
      </div>
    </>
  )
}

export { Category, Category as default }

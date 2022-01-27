import { useMemo } from 'react'
import { Card } from 'components/Card'
import { Icon } from 'components/common/Icon'
import { triggerEdit } from 'components/EditLinkModal'
import styles from './index.module.css'
import { LinksEntity } from 'modules/config/Config'
import { DEFAULT_LINK } from 'modules/config'
import { transformEntityToFields } from 'components/EditLinkModal/transforms'
import { EditModalField } from 'components/EditLinkModal/EditLinkModal'

interface EditContainerProps {
  onEdit: (fields: EditModalField[]) => void
  onDelete: () => void
  link: LinksEntity
}

interface CategoryCardProps extends EditContainerProps {
  editing: boolean
}

const CategoryCard = ({ link, editing, ...editProps }: CategoryCardProps) => {
  const { name, link: linkUrl } = link

  return (
    <Card href={!editing && linkUrl} className={styles.container} link={link}>
      <span className={styles.name}>{name}</span>
      <span className={styles.link}>{linkUrl}</span>
      {editing && <EditContainer {...editProps} link={link} />}
    </Card>
  )
}

const EditContainer = ({ onEdit, onDelete, link }: EditContainerProps) => {
  const linkFields = useMemo(
    () => ({
      ...DEFAULT_LINK,
      ...link,
    }),
    [link]
  )

  return (
    <div className={styles['edit-container']}>
      <Icon
        icon="edit"
        size={15}
        as="button"
        className={styles['edit-icon']}
        onClick={() =>
          triggerEdit({
            fields: transformEntityToFields(linkFields),
            onSave: onEdit,
            title: `Edit link`,
          })
        }
      />
      <Icon
        icon="trash"
        size={15}
        as="button"
        className={styles['delete-icon']}
        onClick={onDelete}
      />
    </div>
  )
}

export { CategoryCard, CategoryCard as default }

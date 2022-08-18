import { useMemo, FC } from 'react'
import process from 'process'
import { Card } from 'components/Card'
import { Icon } from 'components/common/Icon'
import { triggerEdit } from 'components/EditLinkModal'
import { DEFAULT_BG, DEFAULT_FEATURED_LINK } from 'modules/config'
import styles from './index.module.css'
import { FeaturedEntity } from 'modules/config/types'
import { EditModalField } from 'components/EditLinkModal/EditLinkModal'
import { transformEntityToFields } from 'components/EditLinkModal/transforms'

interface EditContainerProps {
  onEdit: (modalData: EditModalField[]) => void
  onDelete: () => void
  link: FeaturedEntity
}
interface Props extends EditContainerProps {
  link: FeaturedEntity
  editing: boolean
}

const FeaturedCard: FC<Props> = ({ link, editing, ...editingProps }) => {
  const { name, link: linkUrl, background = DEFAULT_BG } = link || {}
  const backgroundUrl = isAbsoluteURL(background)
    ? background
    : (process.env.PUBLIC_URL || '.') + background

  return (
    <Card
      href={!editing && linkUrl}
      className={styles.container}
      background={backgroundUrl}
      link={link}
      data-testid="featured-card"
    >
      {editing && <EditContainer {...editingProps} link={link} />}
      {name}
    </Card>
  )
}

const EditContainer: FC<EditContainerProps> = ({ onEdit, onDelete, link }) => {
  const linkFields = useMemo(
    () => ({
      ...DEFAULT_FEATURED_LINK,
      ...link,
    }),
    [link]
  )

  return (
    <>
      <div className={styles['edit-container']}>
        <Icon
          icon="edit"
          className={styles['edit-icon']}
          as="button"
          onClick={() =>
            triggerEdit({
              fields: transformEntityToFields(linkFields),
              onSave: onEdit,
              title: 'Edit featured link',
            })
          }
        />
        <Icon
          icon="trash"
          className={styles['delete-icon']}
          as="button"
          onClick={onDelete}
        />
      </div>
    </>
  )
}

function isAbsoluteURL(url: string) {
  const pat = /^https?:\/\//i
  return pat.test(url)
}

export { FeaturedCard, FeaturedCard as default }

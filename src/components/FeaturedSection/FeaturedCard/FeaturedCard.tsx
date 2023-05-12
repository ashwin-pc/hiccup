import { useMemo, FC } from 'react'
import process from 'process'
import { Card } from 'components/Card'
import { Icon } from 'components/common/Icon'
import { triggerEdit } from 'components/EditLinkModal'
import { DEFAULT_FEATURED_LINK, getRandomBg } from 'modules/config'
import styles from './index.module.css'
import { FeaturedEntity } from 'modules/config/types'
import { EditModalField } from 'components/EditLinkModal/EditLinkModal'
import { transformEntityToFields } from 'components/EditLinkModal/transforms'
import { DropProps } from 'components/common/Drop'
import { classNames } from 'modules/utils'

interface EditContainerProps {
  onEdit: (modalData: EditModalField[]) => void
  onDelete: () => void
  link: FeaturedEntity
  editing: boolean
  dropEditLink: DropProps<HTMLDivElement>
  dropEditBg: DropProps<HTMLDivElement>
}
interface Props extends EditContainerProps {
  editing: boolean
  dropEditLink: DropProps<HTMLDivElement>
  dropEditBg: DropProps<HTMLDivElement>
}

const FeaturedCard: FC<Props> = ({ link, editing, ...editingProps }) => {
  const { name, link: linkUrl, background = getRandomBg('medium') } = link || {}

  const backgroundUrl = isAbsoluteURL(background)
    ? background
    : (process.env.PUBLIC_URL || '.') + background

  const cardProps = {
    background: backgroundUrl,
    link,
  }

  return (
    <Card
      href={!editing && linkUrl}
      className={classNames([styles.container])}
      data-testid="featured-card"
      {...cardProps}
    >
      <EditContainer {...editingProps} link={link} editing={editing} />
      {name}
    </Card>
  )
}

const EditContainer: FC<EditContainerProps> = ({
  onEdit,
  onDelete,
  link,
  editing,
  dropEditBg,
  dropEditLink,
}) => {
  const linkFields = useMemo(
    () => ({
      ...DEFAULT_FEATURED_LINK,
      ...link,
    }),
    [link]
  )

  const {
    dragging: highlightBg,
    dropRef: refBg,
    draggingOverDocument: draggingBg,
    ...dropEditBgProps
  } = dropEditBg
  const {
    dragging: highlightLink,
    dropRef: refLink,
    draggingOverDocument: draggingLink,
    ...dropEditLinkProps
  } = dropEditLink

  const dragging = draggingBg || draggingLink
  const hidden = !(editing || dragging)

  return (
    <div className={classNames([styles['edit-container'], [hidden, 'hide']])}>
      <div
        className={classNames([
          styles['edit-icon'],
          [dragging, 'dragging'],
          [highlightBg, 'highlight'],
        ])}
        ref={refBg}
        {...dropEditBgProps}
      >
        <Icon
          icon={dragging ? 'image' : 'edit'}
          as="button"
          onClick={() =>
            triggerEdit({
              fields: transformEntityToFields(linkFields),
              onSave: onEdit,
              title: 'Edit featured link',
            })
          }
        />
      </div>
      <div
        className={classNames([
          styles['delete-icon'],
          [dragging, 'dragging'],
          [highlightLink, 'highlight'],
        ])}
        ref={refLink}
        {...dropEditLinkProps}
      >
        <Icon
          icon={dragging ? 'earth' : 'trash'}
          as="button"
          onClick={onDelete}
        />
      </div>
    </div>
  )
}

function isAbsoluteURL(url: string) {
  const pat = /^https?:\/\//i
  return pat.test(url)
}

export { FeaturedCard, FeaturedCard as default }

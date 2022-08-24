import { useCallback } from 'react'
import { useConfigContext } from 'components/ConfigContext'
import { FeaturedCard } from './FeaturedCard'
import { AddFeaturedCard } from './AddFeaturedCard'
import { FeaturedEntity } from 'modules/config/types'
import { transformFieldsToEntity } from 'components/EditLinkModal/transforms'
import { EditModalField } from 'components/EditLinkModal/EditLinkModal'
import {
  addFeaturedCard,
  editFeaturedCard,
  removeFeaturedCard,
} from 'modules/config/configHelpers'
import { useDrop } from 'components/common/Drop'
import { DEFAULT_FEATURED_LINK } from 'modules/config'

interface Props {
  index: number
  link: FeaturedEntity
}

const ConnectedFeaturedCard = ({ index: cardIndex, link }: Props) => {
  const { editing, config, storeActions } = useConfigContext()

  const onDelete = useCallback(() => {
    const { config: newConfig, invalid } = removeFeaturedCard(config, {
      cardIndex,
    })

    if (invalid) return false
    storeActions.saveConfig(newConfig)
  }, [cardIndex, config, storeActions])

  const onEdit = useCallback(
    (modalData: EditModalField[]) => {
      const newLink = transformFieldsToEntity(modalData) as FeaturedEntity
      const { config: newConfig, invalid } = editFeaturedCard(config, {
        cardIndex,
        link: newLink,
      })

      if (invalid) return false
      storeActions.saveConfig(newConfig)
    },
    [cardIndex, config, storeActions]
  )

  const newLink = {
    ...DEFAULT_FEATURED_LINK,
    ...link,
  }

  const dropEditBg = useDrop<HTMLDivElement, FeaturedEntity>(
    newLink,
    onEdit,
    'background'
  )
  const dropEditLink = useDrop<HTMLDivElement, FeaturedEntity>(newLink, onEdit)

  return (
    <FeaturedCard
      link={link}
      editing={editing}
      onEdit={onEdit}
      onDelete={onDelete}
      dropEditBg={dropEditBg}
      dropEditLink={dropEditLink}
    />
  )
}

const ConnectedAddFeaturedCard = () => {
  const { editing, storeActions, config } = useConfigContext()

  const onSave = useCallback(
    (modalData: EditModalField[]) => {
      const newLink = transformFieldsToEntity(modalData) as FeaturedEntity
      const { config: newConfig, invalid } = addFeaturedCard(config, {
        card: newLink,
      })

      if (invalid) return false
      storeActions.saveConfig(newConfig)
    },
    [config, storeActions]
  )

  const { draggingOverDocument, ...dropProps } = useDrop<
    HTMLButtonElement,
    FeaturedEntity
  >(DEFAULT_FEATURED_LINK, onSave)

  const hidden = !(editing || draggingOverDocument)

  return <AddFeaturedCard onSave={onSave} hidden={hidden} {...dropProps} />
}

export {
  ConnectedFeaturedCard,
  ConnectedFeaturedCard as FeaturedCard,
  ConnectedFeaturedCard as default,
  ConnectedAddFeaturedCard,
  ConnectedAddFeaturedCard as AddFeaturedCard,
}

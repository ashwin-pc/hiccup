import { useCallback, useEffect, useRef } from 'react'
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
  return (
    <FeaturedCard
      link={link}
      editing={editing}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  )
}

const ConnectedAddFeaturedCard = () => {
  const { editing, storeActions, config } = useConfigContext()
  const { draggingOverDocument, ...dropProps } = useDrop<HTMLButtonElement>()

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

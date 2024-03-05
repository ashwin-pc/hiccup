import { useCallback } from 'react'
import { useConfigContext } from 'components/ConfigContext'
import { FeaturedCard } from './FeaturedCard'
import { AddFeaturedCard } from './AddFeaturedCard'
import { AppState, FeaturedEntity } from 'modules/config/types'
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
  const { editing, config, updateConfig } = useConfigContext(
    ({ config, store, updateConfig }) => ({
      editing: store.state === AppState.EDITING,
      config: config?.data,
      updateConfig,
    })
  )

  const onDelete = useCallback(() => {
    if (!config) return
    const { config: newConfig, invalid } = removeFeaturedCard(config, {
      cardIndex,
    })

    if (invalid) return false
    updateConfig(newConfig)
  }, [cardIndex, config, updateConfig])

  const onEdit = useCallback(
    (modalData: EditModalField[]) => {
      if (!config) return
      const newLink = transformFieldsToEntity(modalData) as FeaturedEntity
      const { config: newConfig, invalid } = editFeaturedCard(config, {
        cardIndex,
        link: newLink,
      })

      if (invalid) return false
      updateConfig(newConfig)
    },
    [cardIndex, config, updateConfig]
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
  const { editing, config, updateConfig } = useConfigContext(
    ({ config, store, updateConfig }) => ({
      editing: store.state === AppState.EDITING,
      config: config?.data,
      updateConfig,
    })
  )

  const onSave = useCallback(
    (modalData: EditModalField[]) => {
      if (!config) return
      const newLink = transformFieldsToEntity(modalData) as FeaturedEntity
      const { config: newConfig, invalid } = addFeaturedCard(config, {
        card: newLink,
      })

      if (invalid) return false
      updateConfig(newConfig)
    },
    [config, updateConfig]
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

import { useCallback } from 'react'
import { useConfigContext } from 'components/ConfigContext'
import { FeaturedCard } from './FeaturedCard'
import { AddFeaturedCard } from './AddFeaturedCard'
import { FeaturedEntity } from 'modules/config/Config'

interface Props {
  index: number
  link: FeaturedEntity
}

const ConnectedFeaturedCard = ({ index: cardIndex, link }: Props) => {
  const { editing, dispatch } = useConfigContext()

  const onDelete = useCallback(() => {
    dispatch.removeFeaturedCard(cardIndex)
  }, [cardIndex, dispatch])

  const onEdit = useCallback(
    (newLink: FeaturedEntity) => {
      dispatch.editFeaturedCard(cardIndex, newLink)
    },
    [cardIndex, dispatch]
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
  const { editing, dispatch } = useConfigContext()

  const onSave = useCallback(
    (newLink: FeaturedEntity) => {
      dispatch.addFeaturedCard(newLink)
    },
    [dispatch]
  )

  return editing ? <AddFeaturedCard onSave={onSave} /> : null
}

export {
  ConnectedFeaturedCard,
  ConnectedFeaturedCard as FeaturedCard,
  ConnectedFeaturedCard as default,
  ConnectedAddFeaturedCard,
  ConnectedAddFeaturedCard as AddFeaturedCard,
}

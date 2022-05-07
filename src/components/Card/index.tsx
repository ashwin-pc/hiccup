import { FC, useMemo } from 'react'
import { Card, Props as CardProps } from './Card'
import { useSearchContext } from '../SearchContext'
import { LinksEntity } from 'modules/config/types'

interface ConnectProps extends Omit<CardProps, 'highlight'> {
  link: LinksEntity
}

const ConnectedCard: FC<ConnectProps> = ({ link, ...props }) => {
  const { results } = useSearchContext()
  const highlight = useMemo(
    () => results.map((result) => result.link).includes(link),
    [link, results]
  )
  return <Card {...props} highlight={highlight} />
}

export { ConnectedCard, ConnectedCard as Card, ConnectedCard as default }

import React, { useMemo } from 'react'
import { Card } from './Card'
import { useSearchContext } from '../SearchContext'
import { ID } from '../../modules/configId'

const ConnectedCard = ({ link, ...props }) => {
    const { results } = useSearchContext()
    const highlight = useMemo(() => results.map(result => result.id).includes(link[ID]), [link, results])
    return <Card {...props} highlight={highlight} />
}

export {
    ConnectedCard,
    ConnectedCard as Card,
    ConnectedCard as default
}
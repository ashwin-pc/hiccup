import React from 'react'
import process from 'process'
import { Card } from '../Card'
import styles from './index.module.css'

const FeaturedCard = ({ name, link, tags = '', background = '/assets/card.png' }) => {
    const url = (process.env.PUBLIC_URL || '.') + background
    return (
        <Card link={link} className={styles.container} background={url} tag={[name,link,tags].join(' ')}>
            {name}
        </Card>
    )
}  

export {
    FeaturedCard,
    FeaturedCard as default
}
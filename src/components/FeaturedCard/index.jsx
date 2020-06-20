import React from 'react'
import process from 'process'
import { Card } from '../Card'
import styles from './index.module.css'

const FeaturedCard = ({ name, link, background = '/assets/logo.png' }) => {
    const url = (process.env.PUBLIC_URL || '') + background
    return (
        <Card link={link} className={styles.container} background={url} tag={name + link}>
            {name}
        </Card>
    )
}  

export {
    FeaturedCard,
    FeaturedCard as default
}
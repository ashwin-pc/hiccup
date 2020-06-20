import React, { useMemo } from 'react'
import { useSearchContext } from '../SearchContext'
import styles from './index.module.css'

const SearchBar = () => {
    const { searchTerm } = useSearchContext()
    const searchStyle = useMemo(() => ({
        display: searchTerm !== null ? 'block' : 'none'
    }), [searchTerm])
    
    return (
        <div className={styles.search} style={searchStyle}>
            { searchTerm === '' ? <Placeholder /> : (searchTerm) }
        </div>
    )
}

const Placeholder = () => <span className={styles.placeholder}>Start searching</span>

export {
    SearchBar,
    SearchBar as default
}
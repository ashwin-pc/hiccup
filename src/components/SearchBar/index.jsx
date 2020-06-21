import React, { useCallback, useRef, useEffect } from 'react'
import { useSearchContext } from '../SearchContext'
import styles from './index.module.css'

const SearchBar = () => {
    const { searching, searchTerm, setSearchTerm, onSubmit } = useSearchContext()
    const inputRef = useRef(null)

    const handleChange = useCallback(event => {
        setSearchTerm(event.target.value)
    }, [setSearchTerm])

    const handleSubmit = useCallback(event => {
        if (event.key === 'Enter') {
            onSubmit && onSubmit(event.target.value)
        }
    }, [onSubmit])

    useEffect(() => {
        if (searching) {
            inputRef.current && inputRef.current.focus()
        } else {
            setSearchTerm && setSearchTerm('')
        }
    }, [searching, setSearchTerm])

    
    return (
        searching
        ? <input 
            type="text"
            name="search"
            className={styles.search}
            value={searchTerm}
            onChange={handleChange}
            ref={inputRef}
            onKeyDown={handleSubmit}
            placeholder="Start searching"
            autoComplete="off"
        />
        : null
    )
}

export {
    SearchBar,
    SearchBar as default
}
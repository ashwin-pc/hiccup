import React, { useMemo, useCallback } from 'react'
import { useConfigContext } from '../ConfigContext'
import { Category } from './Category'
import { AddCategory } from './AddCategory'

const ConnectedCategory = (props) => {
    const { index } = props
    const hookProps = useCategory(index)
    return <Category {...hookProps} {...props} />
}

const useCategory = (categoryIndex) => {
    const { config, editing, updateConfig } = useConfigContext()

    const onDelete = useCallback(() => {
        const newConfig = { ...config }
        newConfig.categories = newConfig.categories.filter((_, index) => index !== categoryIndex)
        
        updateConfig(newConfig)
    }, [categoryIndex, config, updateConfig])

    const onEdit = useCallback(newTitle => {
        const newConfig = { ...config }
        newConfig.categories[categoryIndex].title = newTitle

        updateConfig(newConfig)
    }, [categoryIndex, config, updateConfig])

    const edit = useMemo(() => ({
        onEdit,
        onDelete,
    }), [onDelete, onEdit])

    return {
        edit: editing && edit,
    }
}

const ConnectedAddCategory = () => {
    const { config, editing, updateConfig } = useConfigContext()

    const onSave = useCallback(newCategory => {
        const newConfig = { ...config }
        newConfig.categories.push(newCategory)

        updateConfig(newConfig)
    }, [config, updateConfig])

    return editing ? <AddCategory onSave={onSave}/> : null
}


export {
    ConnectedCategory,
    ConnectedCategory as Category,
    ConnectedCategory as default,
    ConnectedAddCategory,
    ConnectedAddCategory as AddCategory,
}

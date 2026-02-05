import React, {createContext, useCallback, useContext, useMemo, useState} from 'react'

interface IUiProvider {
    children: React.ReactNode
}

interface IUiContext {
    isDrawerOpen: boolean;
    setDrawerOpen:  () => void;
    openDrawer: () => void;
    closeDrawer: () => void;
}

const UiContext = createContext<IUiContext | undefined>(undefined)

export const UiProvider = ({children}: IUiProvider) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(true)

    const setDrawerOpen = useCallback(() => setIsDrawerOpen((prev) => !prev), [])
    const openDrawer = useCallback(() => setIsDrawerOpen(true), [])
    const closeDrawer = useCallback(() => setIsDrawerOpen(false), [])

    const value = useMemo(() => ({
        isDrawerOpen,
        setDrawerOpen,
        openDrawer,
        closeDrawer
    }), [isDrawerOpen, setDrawerOpen])

    return (
        <UiContext.Provider value={value}>
            {children}
        </UiContext.Provider>
    )
}

export const useUI = () => {
    const context = useContext(UiContext)
    if (!context) throw new Error(`useUI must be used within a UiProvider`)
    return context
}
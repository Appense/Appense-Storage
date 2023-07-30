'use client'
import { Dispatch, SetStateAction } from 'react';
import { SessionProvider } from 'next-auth/react'
import { createContext, useContext, useState } from 'react';

interface ISidebarContext {
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

const SidebarContext = createContext({
    isOpen: true,
    setIsOpen: (isOpen: boolean) => {}
} as ISidebarContext )



type Props = {
    children?: React.ReactNode
}

export const Providers = ({ children }: Props) => {
    const [isOpen, setIsOpen] = useState(true)

    return (
        <SessionProvider>
            <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
            </SidebarContext.Provider>
        </SessionProvider>
    )
}
export const useSidebarContext = () => useContext(SidebarContext)
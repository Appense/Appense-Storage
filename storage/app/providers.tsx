'use client'

import { SessionProvider } from 'next-auth/react'
import { createContext, useContext, useState } from 'react';

const SidebarContext= createContext({isOpen: true, setIsOpen: (value: boolean) => {}})



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
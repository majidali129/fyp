'use client'

import { createContext, useContext, useMemo, useState } from "react";

interface ToggleContexttype {
    isSidebarOpen: boolean;
    handleSidebarToggle: () => void;
}

const toggleContext = createContext<ToggleContexttype | undefined> (undefined)

export const NavToggleContextProvider = ({children}: {children: React.ReactNode}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    function handleSidebarToggle() {
        setIsSidebarOpen((prev) => !prev)
    }

    const contextValue = useMemo(() => ({
        isSidebarOpen,
        handleSidebarToggle,
      }), [isSidebarOpen]);

    return (
        <toggleContext.Provider value={contextValue}>
            {children}
        </toggleContext.Provider>

    )}


export const useToggle = () => {
    const context = useContext(toggleContext)
     if (!context) {
         throw new Error("useToggle must be used within a ToggleContextProvider");
     }

     return context;
}
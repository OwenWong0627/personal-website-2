import React, { createContext, useContext, useState } from "react";

export const ActiveLinkContext = createContext({
    activeHref: "",
    setActiveHref: (href: string) => {},
    resetActiveHref: () => {}, // Add a reset function
});

export const useActiveLink = () => useContext(ActiveLinkContext);

interface ActiveLinkProviderProps {
    children: React.ReactNode;
}

export const ActiveLinkProvider: React.FC<ActiveLinkProviderProps> = ({
    children,
}) => {
    const [activeHref, setActiveHref] = useState("");

    const resetActiveHref = () => setActiveHref("");

    return (
        <ActiveLinkContext.Provider
            value={{ activeHref, setActiveHref, resetActiveHref }}
        >
            {children}
        </ActiveLinkContext.Provider>
    );
};

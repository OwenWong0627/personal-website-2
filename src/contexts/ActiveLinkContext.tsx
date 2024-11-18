import React, { createContext, useContext, useState } from "react";

const ActiveLinkContext = createContext({
    activeHref: "",
    setActiveHref: (href: string) => {},
});

export const useActiveLink = () => useContext(ActiveLinkContext);

interface ActiveLinkProviderProps {
    children: React.ReactNode;
}

export const ActiveLinkProvider: React.FC<ActiveLinkProviderProps> = ({
    children,
}) => {
    const [activeHref, setActiveHref] = useState("");

    return (
        <ActiveLinkContext.Provider value={{ activeHref, setActiveHref }}>
            {children}
        </ActiveLinkContext.Provider>
    );
};

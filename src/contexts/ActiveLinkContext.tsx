import React, { createContext, useContext, useState } from "react";

interface ActiveLinkContextType {
    activeHref: string;
    setActiveHref: (href: string) => void;
    resetActiveHref: () => void;
}

export const ActiveLinkContext = createContext<ActiveLinkContextType>({
    activeHref: "",
    setActiveHref: () => {},
    resetActiveHref: () => {},
});

export const useActiveLink = () => {
    const context = useContext(ActiveLinkContext);
    if (!context) {
        throw new Error(
            "useActiveLink must be used within an ActiveLinkProvider"
        );
    }
    return context;
};

interface ActiveLinkProviderProps {
    children: React.ReactNode;
}

export const ActiveLinkProvider: React.FC<ActiveLinkProviderProps> = ({
    children,
}) => {
    const [activeHref, setActiveHref] = useState<string>("");

    const resetActiveHref = () => setActiveHref("");

    return (
        <ActiveLinkContext.Provider
            value={{ activeHref, setActiveHref, resetActiveHref }}
        >
            {children}
        </ActiveLinkContext.Provider>
    );
};

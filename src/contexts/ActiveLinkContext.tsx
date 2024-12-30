import React, { createContext, useContext, useState, useEffect } from "react";

interface ActiveLinkContextType {
    activeHref: string;
    resetNavBar: () => void;
    isNavbarRetracted: boolean;
    handleLinkClick: (href: string) => void;
    isCameraLocked: boolean;
    setIsCameraLocked: (locked: boolean) => void;
}

export const ActiveLinkContext = createContext<ActiveLinkContextType>({
    activeHref: "",
    resetNavBar: () => {},
    isNavbarRetracted: false,
    handleLinkClick: () => {},
    isCameraLocked: false,
    setIsCameraLocked: () => {},
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
    const [isNavbarRetracted, setIsNavbarRetracted] = useState<boolean>(false);
    const [isCameraLocked, setIsCameraLocked] = useState<boolean>(false);

    const resetNavBar = () => {
        setActiveHref("");
        setIsNavbarRetracted(false);
        setIsCameraLocked(false);
    };

    const handleLinkClick = (href: string) => {
        setActiveHref(href);
        setIsNavbarRetracted(true);
        setIsCameraLocked(true);
    };

    return (
        <ActiveLinkContext.Provider
            value={{
                activeHref,
                resetNavBar,
                isNavbarRetracted,
                handleLinkClick,
                isCameraLocked,
                setIsCameraLocked,
            }}
        >
            {children}
        </ActiveLinkContext.Provider>
    );
};

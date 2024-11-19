import React, { useEffect, useState } from "react";
import { useActiveLink } from "../contexts/ActiveLinkContext";

const BackButton = () => {
    const { activeHref, resetActiveHref } = useActiveLink();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(!!activeHref); // Set visible if there's an active href
    }, [activeHref]);

    if (!isVisible) return null;

    return (
        <button
            onClick={resetActiveHref}
            className="absolute bottom-5 left-5 bg-gradient-to-r from-pastel-pink to-pastel-blue p-2 rounded-full cursor-pointer flex items-center justify-center z-10 focus:pointer-events-auto"
            style={{ width: 100, height: 100 }}
        >
            <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                width="74"
                height="74"
            >
                <path
                    d="M15 6l-6 6 6 6"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </button>
    );
};

export default BackButton;

import React, { useEffect, useState } from "react";
import { useActiveLink } from "../contexts/ActiveLinkContext";

const BackButton: React.FC = () => {
    const { activeHref, resetNavBar } = useActiveLink();
    const [isVisible, setIsVisible] = useState(false);
    const [opacity, setOpacity] = useState(0);
    const [isClickable, setIsClickable] = useState(false);

    useEffect(() => {
        let fadeTimeout: NodeJS.Timeout;
        let clickableTimeout: NodeJS.Timeout;

        if (activeHref) {
            setIsVisible(true);
            fadeTimeout = setTimeout(() => setOpacity(1), 50);
            clickableTimeout = setTimeout(() => setIsClickable(true), 1000);
        } else {
            setOpacity(0);
            setIsClickable(false);
            fadeTimeout = setTimeout(() => setIsVisible(false), 1000);
        }

        return () => {
            clearTimeout(fadeTimeout);
            clearTimeout(clickableTimeout);
        };
    }, [activeHref]);

    const handleClick = () => {
        if (isClickable) {
            resetNavBar();
            setIsClickable(false);
        }
    };

    if (!isVisible) return null;

    return (
        <button
            onClick={handleClick}
            className={`absolute bottom-5 left-5 bg-gradient-to-r from-pastel-pink to-pastel-blue p-2 rounded-full flex items-center justify-center z-10 focus:pointer-events-auto transition-opacity duration-1000 ${
                isClickable ? "cursor-pointer" : "cursor-default"
            }`}
            style={{ width: 100, height: 100, opacity }}
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

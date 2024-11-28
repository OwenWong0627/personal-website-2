import React, { useState } from "react";

interface WelcomeProps {
    onEnterVirtualRoom: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onEnterVirtualRoom }) => {
    const [isPressed, setIsPressed] = useState(false);

    const handleClick = () => {
        setIsPressed(true);
        setTimeout(onEnterVirtualRoom, 500);
    };

    return (
        <div
            className={`flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 transition-opacity duration-1000 ${
                isPressed ? "opacity-0" : "opacity-100"
            }`}
        >
            <h1 className="text-4xl font-bold text-white mb-12 overflow-hidden whitespace-nowrap border-r-4 border-white pr-5 animate-typing tracking-widest font-mono">
                Welcome to my digital realm!!!
            </h1>

            <button
                onClick={handleClick}
                className="relative w-48 h-48 bg-white rounded-full shadow-lg overflow-hidden transition-transform duration-300 hover:scale-110 focus:outline-none"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 opacity-75 transition-opacity duration-300 hover:opacity-100" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                        className="w-24 h-24 text-white animate-pulse"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>
            </button>
        </div>
    );
};

export default Welcome;

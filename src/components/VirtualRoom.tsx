import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import RenderModel from "@/components/RenderModel";
import VolumeControl from "@/components/VolumeControl";
import StarryBackground from "@/components/StarryBackground";
import SkyBackground from "@/components/SkyBackground";

import dynamic from "next/dynamic";
import BackgroundToggle from "@/components/BackgroundToggle";

const Box = dynamic(() => import("@/components/models/Box"), {
    ssr: false,
});

interface VirtualRoomProps {
    isEntered: boolean;
}

const VirtualRoom: React.FC<VirtualRoomProps> = ({ isEntered }) => {
    const [opacity, setOpacity] = useState(0);
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        if (isEntered) {
            setTimeout(() => setOpacity(100), 50);
        }
    }, [isEntered]);

    const handleBackgroundChange = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div
            className={`transition-opacity duration-500 ease-in-out opacity-${opacity}`}
        >
            <main className="flex min-h-screen flex-col">
                <div className="relative w-full h-full">
                    <div
                        className={`absolute inset-0 transition-opacity duration-light-dark ease-in-out ${
                            isDarkMode ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        <StarryBackground />
                    </div>
                    <div
                        className={`absolute inset-0 transition-opacity duration-light-dark ease-in-out ${
                            isDarkMode ? "opacity-0" : "opacity-100"
                        }`}
                    >
                        <SkyBackground />
                    </div>
                </div>
                <Navbar />
                <BackgroundToggle
                    isDarkMode={isDarkMode}
                    onToggle={handleBackgroundChange}
                />
                <VolumeControl isVirtualRoomEntered={isEntered} />
                <div className="w-screen h-screen">
                    <RenderModel>
                        <Box position={[-1.2, 0, 0]} />
                        <Box position={[1.2, 0, 0]} />
                    </RenderModel>
                </div>
            </main>
        </div>
    );
};

export default VirtualRoom;

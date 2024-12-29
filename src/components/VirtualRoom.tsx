import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import RenderModel from "@/components/RenderModel";
import VolumeControl from "@/components/VolumeControl";
import StarryBackground from "@/components/StarryBackground";
import SkyBackground from "@/components/SkyBackground";
import dynamic from "next/dynamic";
import BackgroundToggle from "@/components/BackgroundToggle";

const Room = dynamic(() => import("@/components/models/Room"), {
    ssr: false,
});

const Monitor = dynamic(() => import("@/components/models/Monitor"), {
    ssr: false,
});

interface VirtualRoomProps {
    isEntered: boolean;
}

const VirtualRoom: React.FC<VirtualRoomProps> = ({ isEntered }) => {
    const [opacity, setOpacity] = useState(0);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isCameraLocked, setIsCameraLocked] = useState(false);

    useEffect(() => {
        if (isEntered) {
            setTimeout(() => setOpacity(100), 50); // Delay the fade-in effect
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
                    <RenderModel
                        isCameraLocked={isCameraLocked}
                        setIsCameraLocked={setIsCameraLocked}
                    >
                        <Room />
                        <Monitor
                            isCameraLocked={false}
                            setIsCameraLocked={setIsCameraLocked}
                        />
                    </RenderModel>
                </div>
            </main>
        </div>
    );
};

export default VirtualRoom;

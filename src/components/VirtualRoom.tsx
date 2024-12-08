import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import RenderModel from "@/components/RenderModel";
import VolumeControl from "@/components/VolumeControl";
import StarryBackground from "@/components/StarryBackground";
import SkyBackground from "@/components/SkyBackground";

import dynamic from "next/dynamic";

const Box = dynamic(() => import("@/components/models/Box"), {
    ssr: false,
});

interface VirtualRoomProps {
    isEntered: boolean;
}

const VirtualRoom: React.FC<VirtualRoomProps> = ({ isEntered }) => {
    const [opacity, setOpacity] = useState(0);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        if (isEntered) {
            setTimeout(() => setOpacity(100), 50);
        }
    }, [isEntered]);

    return (
        <div
            className={`transition-opacity duration-500 ease-in-out opacity-${opacity}`}
        >
            <main className="flex min-h-screen flex-col">
                {isDarkMode ? <StarryBackground /> : <SkyBackground />}
                <Navbar />
                <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="fixed top-20 left-4 z-10 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg 
                    text-white border border-white/20 hover:bg-white/20 transition-colors duration-200"
                >
                    {isDarkMode ? "Sky Background" : "Starry Background"}
                </button>
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

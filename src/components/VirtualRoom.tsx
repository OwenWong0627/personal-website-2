import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import RenderModel from "@/components/RenderModel";
import VolumeControl from "@/components/VolumeControl";
import dynamic from "next/dynamic";

const Box = dynamic(() => import("@/components/models/Box"), {
    ssr: false,
});

interface VirtualRoomProps {
    isEntered: boolean;
}

const VirtualRoom: React.FC<VirtualRoomProps> = ({ isEntered }) => {
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        if (isEntered) {
            setTimeout(() => setOpacity(100), 50); // Small delay to ensure the transition happens
        }
    }, [isEntered]);

    return (
        <div
            className={`transition-opacity duration-500 ease-in-out opacity-${opacity}`}
        >
            <main className="flex min-h-screen flex-col">
                <Navbar />
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

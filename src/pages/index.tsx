// pages/index.tsx
import React, { useState } from "react";
import Welcome from "@/components/Welcome";
import VirtualRoom from "@/components/VirtualRoom";
import VolumeControl from "@/components/VolumeControl";

const Home: React.FC = () => {
    const [showVirtualRoom, setShowVirtualRoom] = useState<boolean>(false);

    const handleEnterVirtualRoom = (): void => {
        setShowVirtualRoom(true);
    };

    return (
        <div className="flex flex-col min-h-screen">
            {!showVirtualRoom ? (
                <Welcome onEnterVirtualRoom={handleEnterVirtualRoom} />
            ) : (
                <>
                    <VirtualRoom />
                    <VolumeControl isVirtualRoomEntered={showVirtualRoom} />
                </>
            )}
        </div>
    );
};

export default Home;

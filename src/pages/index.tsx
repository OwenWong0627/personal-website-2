import React, { useState } from "react";
import Welcome from "@/components/Welcome";
import VirtualRoom from "@/components/VirtualRoom";

const Home: React.FC = () => {
    const [showWelcome, setShowWelcome] = useState(true);
    const [showVirtualRoom, setShowVirtualRoom] = useState(false);

    const handleEnterVirtualRoom = () => {
        setShowWelcome(false);
        setTimeout(() => {
            setShowVirtualRoom(true);
        }, 500);
    };

    return (
        <div className="relative min-h-screen">
            {showWelcome && (
                <Welcome onEnterVirtualRoom={handleEnterVirtualRoom} />
            )}
            {!showWelcome && <VirtualRoom isEntered={showVirtualRoom} />}
        </div>
    );
};

export default Home;

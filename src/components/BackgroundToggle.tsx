import { Canvas } from "@react-three/fiber";
import dynamic from "next/dynamic";

const SunModel = dynamic(() => import("@/components/models/SunModel"), {
    ssr: false,
});

const MoonModel = dynamic(() => import("@/components/models/MoonModel"), {
    ssr: false,
});

interface BackgroundToggleProps {
    isDarkMode: boolean;
    onToggle: () => void;
}

const BackgroundToggle: React.FC<BackgroundToggleProps> = ({
    isDarkMode,
    onToggle,
}) => {
    return (
        <div
            className="fixed top-24 left-0 w-60 h-60 z-10 bg-transparent cursor-pointer"
            onClick={onToggle}
        >
            <div className="relative w-full h-full">
                <div
                    className={`absolute inset-0 transition-opacity duration-light-dark-fast ease-in-out ${
                        isDarkMode ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <Canvas
                        camera={{ position: [0, 0, 5] }}
                        style={{ background: "transparent" }}
                    >
                        <ambientLight intensity={1.5} />
                        <spotLight
                            position={[10, 10, 10]}
                            angle={0.15}
                            penumbra={1}
                            decay={0}
                            intensity={Math.PI / 2}
                        />
                        <pointLight
                            position={[-10, -10, -10]}
                            decay={0}
                            intensity={Math.PI / 2}
                        />
                        <pointLight position={[10, 10, 10]} />
                        <MoonModel />
                    </Canvas>
                </div>
                <div
                    className={`absolute inset-0 transition-opacity duration-light-dark-fast ease-in-out ${
                        isDarkMode ? "opacity-0" : "opacity-100"
                    }`}
                >
                    <Canvas
                        camera={{ position: [0, 0, 5] }}
                        style={{ background: "transparent" }}
                    >
                        <ambientLight intensity={1.5} />
                        <spotLight
                            position={[10, 10, 10]}
                            angle={0.15}
                            penumbra={1}
                            decay={0}
                            intensity={Math.PI / 2}
                        />
                        <pointLight
                            position={[-10, -10, -10]}
                            decay={0}
                            intensity={Math.PI / 2}
                        />
                        <pointLight position={[10, 10, 10]} />
                        <SunModel />
                    </Canvas>
                </div>
            </div>
        </div>
    );
};

export default BackgroundToggle;

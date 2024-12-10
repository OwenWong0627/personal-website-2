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
                    intensity={Math.PI / 3}
                />
                <pointLight
                    position={[-10, -10, -10]}
                    decay={0}
                    intensity={Math.PI / 3}
                />
                <pointLight position={[10, 10, 10]} />
                {isDarkMode ? <MoonModel /> : <SunModel />}
            </Canvas>
        </div>
    );
};

export default BackgroundToggle;

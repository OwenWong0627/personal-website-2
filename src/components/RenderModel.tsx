import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import clsx from "clsx";
import React, { Suspense } from "react";

import { ReactNode } from "react";

interface RenderModelProps {
    children: ReactNode;
    className?: string;
}

const RenderModel = ({ children, className }: RenderModelProps) => {
    return (
        <Canvas
            className={clsx("w-screen h-screen relative", className)}
            shadows={false}
            camera={{ position: [-10, 10, 15] }}
            gl={{
                alpha: true,
                powerPreference: "low-power",
            }}
        >
            <ambientLight intensity={Math.PI / 10} />
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
                intensity={Math.PI / 10}
            />
            <Suspense fallback={null}>{children}</Suspense>
            <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
            />
        </Canvas>
    );
};

export default RenderModel;

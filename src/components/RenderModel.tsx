import { OrbitControls, Stats } from "@react-three/drei";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { Canvas, useThree } from "@react-three/fiber";
import clsx from "clsx";
import React, { Suspense } from "react";

import { ReactNode } from "react";
import { useActiveLink } from "@/contexts/ActiveLinkContext";

interface RenderModelProps {
    children: ReactNode;
    className?: string;
    controlsRef: React.RefObject<OrbitControlsImpl>;
}

const CameraController: React.FC<{
    isCameraLocked: boolean;
    controlsRef: React.RefObject<OrbitControlsImpl>;
}> = ({ isCameraLocked, controlsRef }) => {
    const { camera } = useThree();

    return (
        <OrbitControls
            ref={controlsRef}
            args={[camera]}
            enablePan={!isCameraLocked}
            enableZoom={!isCameraLocked}
            enableRotate={!isCameraLocked}
            // Rotation bounds
            minPolarAngle={Math.PI / 8} // Limit upward rotation
            maxPolarAngle={Math.PI / 2} // Limit downward rotation
            minAzimuthAngle={-Math.PI / 1.8} // Limit left rotation
            maxAzimuthAngle={Math.PI / 16} // Limit right rotation
            // Zoom constraints
            // minDistance={5} // Minimum zoom distance
            // maxDistance={20} // Maximum zoom distance
            // Smooth dampening
            enableDamping={true}
            dampingFactor={0.05}
            rotateSpeed={0.5}
            zoomSpeed={0.5}
        />
    );
};

const RenderModel = ({
    children,
    className,
    controlsRef,
}: RenderModelProps) => {
    const { isCameraLocked } = useActiveLink();
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
            <directionalLight position={[5, 5, 5]} intensity={1.5} />
            <directionalLight position={[-5, 5, -5]} intensity={0.5} />
            <Suspense fallback={null}>{children}</Suspense>
            <CameraController
                isCameraLocked={isCameraLocked}
                controlsRef={controlsRef}
            />
            <Stats />
        </Canvas>
    );
};

export default RenderModel;

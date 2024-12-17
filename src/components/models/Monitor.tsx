import { Html, useGLTF } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const Monitor = () => {
    const monitorRef = useRef<THREE.Group>(null);
    const monitorModel = useGLTF("/models/monitor.glb");
    return (
        <group ref={monitorRef} position={[0, 0, 0]} scale={[1, 1, 1]}>
            <primitive object={monitorModel.scene}>
                <Html
                    position={[3.55, 4.5138, 0]}
                    transform
                    distanceFactor={0.22}
                    rotation-y={-(7 * Math.PI) / 12}
                >
                    <iframe
                        src="https://owen-macos.vercel.app/"
                        className="w-monitor-width	h-monitor-height"
                    />
                </Html>
            </primitive>
        </group>
    );
};

useGLTF.preload("/models/monitor.glb");

export default Monitor;

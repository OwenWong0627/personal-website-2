import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";

const MoonModel = () => {
    const moonRef = useRef<THREE.Group>(null);
    const { scene } = useGLTF("/models/moon.glb");

    useFrame((state) => {
        if (moonRef.current) {
            const moonScale =
                1 + 0.025 * Math.sin(state.clock.elapsedTime * Math.PI);
            moonRef.current.scale.set(moonScale, moonScale, moonScale);
        }
    });

    useEffect(() => {
        if (moonRef.current) {
            moonRef.current.rotateY(THREE.MathUtils.degToRad(180));
            // moonRef.current.rotateX(THREE.MathUtils.degToRad(0));
            // moonRef.current.rotateZ(THREE.MathUtils.degToRad(-5));
        }
    }, [moonRef]);
    return (
        <group ref={moonRef} position={[1, -2, 1]}>
            <primitive object={scene} />
        </group>
    );
};

export default MoonModel;

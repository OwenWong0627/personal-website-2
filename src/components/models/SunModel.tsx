import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";

const SunModel = () => {
    const sunRef = useRef<THREE.Group>(null);
    const { scene } = useGLTF("/models/sun.glb");

    useFrame((state) => {
        if (sunRef.current) {
            const sunScale =
                1 + 0.025 * Math.sin(state.clock.elapsedTime * Math.PI);
            sunRef.current.scale.set(sunScale, sunScale, sunScale);
        }
    });

    useEffect(() => {
        if (sunRef.current) {
            sunRef.current.rotateY(THREE.MathUtils.degToRad(-80));
            sunRef.current.rotateX(THREE.MathUtils.degToRad(0));
            sunRef.current.rotateZ(THREE.MathUtils.degToRad(-5));
        }
    }, [sunRef]);
    return (
        <group ref={sunRef} position={[0, 0, 0]} scale={[1, 1, 1]}>
            <primitive object={scene} />
        </group>
    );
};

export default SunModel;

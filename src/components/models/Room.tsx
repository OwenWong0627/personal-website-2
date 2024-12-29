import React from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
    nodes: {
        [key: string]: THREE.Mesh;
    };
    materials: {
        [key: string]: THREE.Material;
    };
};

const Room: React.FC<JSX.IntrinsicElements["group"]> = (props) => {
    const { scene } = useGLTF("/models/room.glb") as GLTFResult;
    return <primitive object={scene} {...props} />;
};

useGLTF.preload("/models/room.glb");

export default Room;

import React from "react";
import { useGLTF } from "@react-three/drei";

export default function Room(props: JSX.IntrinsicElements["group"]) {
    const { scene } = useGLTF("/models/room.glb");
    return <primitive object={scene} {...props} />;
}

useGLTF.preload("/models/room.glb");

import { Html, useGLTF } from "@react-three/drei";
import { useRef, useState, useCallback, useEffect } from "react";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useActiveLink } from "@/contexts/ActiveLinkContext";

interface MonitorProps {
    controlsRef: React.RefObject<OrbitControlsImpl>;
}

const Monitor: React.FC<MonitorProps> = ({ controlsRef }) => {
    const monitorRef = useRef<THREE.Group>(null);
    const { scene } = useGLTF("/models/monitor.glb");
    const { camera } = useThree();
    const [hovered, setHovered] = useState(false);
    const [cameraMoving, setCameraMoving] = useState(false);
    const outlineMeshes = useRef<THREE.Mesh[]>([]);
    const { activeHref, isCameraLocked, setIsCameraLocked, handleLinkClick } =
        useActiveLink();

    useEffect(() => {
        outlineMeshes.current.forEach((mesh) => mesh.removeFromParent());
        outlineMeshes.current = [];

        if (monitorRef.current && !isCameraLocked) {
            const meshes: THREE.Mesh[] = [];

            monitorRef.current.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    meshes.push(child);
                }
            });

            meshes.forEach((child) => {
                const outlineMaterial = new THREE.MeshBasicMaterial({
                    color: 0xffffff,
                    side: THREE.BackSide,
                });

                const outlineMesh = new THREE.Mesh(
                    child.geometry,
                    outlineMaterial
                );

                outlineMesh.scale.multiplyScalar(1.05);
                outlineMesh.visible = hovered;
                child.add(outlineMesh);
                outlineMeshes.current.push(outlineMesh);
            });
        }

        return () => {
            outlineMeshes.current.forEach((mesh) => mesh.removeFromParent());
            outlineMeshes.current = [];
        };
    }, [hovered, isCameraLocked]);

    const handleMonitorClick = useCallback(() => {
        if (
            monitorRef.current &&
            !isCameraLocked &&
            (activeHref === "/monitor" ||
                activeHref === "/about-me" ||
                activeHref === "/experience" ||
                activeHref === "/projects")
        ) {
            setHovered(false);
            setCameraMoving(true);
            const cameraPosition = new THREE.Vector3(2.5, 3.69, -0.53523);
            const targetPosition = new THREE.Vector3(3.51968, 3.69, -0.53523);
            const startPosition = new THREE.Vector3(0, 0, 0);
            const initialCameraPosition = camera.position.clone();
            console.log(
                "Moving camera to monitor",
                controlsRef.current?.target
            );

            gsap.to(camera.position, {
                duration: 1,
                x: cameraPosition.x,
                y: cameraPosition.y,
                z: cameraPosition.z,
                onUpdate: () => {
                    if (controlsRef && controlsRef.current) {
                        console.log(
                            "Moving camera to monitor",
                            controlsRef.current?.target
                        );
                        const progress =
                            camera.position.distanceTo(initialCameraPosition) /
                            cameraPosition.distanceTo(initialCameraPosition);
                        console.log("Progress", progress);
                        const currentTarget = new THREE.Vector3().lerpVectors(
                            startPosition,
                            targetPosition,
                            progress
                        );
                        console.log("Current target", currentTarget);
                        controlsRef.current.target.copy(currentTarget);
                    }
                },
                onComplete: () => {
                    if (setIsCameraLocked) {
                        setIsCameraLocked(true);
                        setCameraMoving(false);
                    }
                    if (controlsRef && controlsRef.current) {
                        controlsRef.current.target.copy(targetPosition);
                    }
                },
            });
        }
    }, [camera, isCameraLocked, setIsCameraLocked, controlsRef, activeHref]);

    const handleClick = () => {
        handleLinkClick("/monitor");
    };

    const handlePointerOver = useCallback(() => {
        if (!isCameraLocked && !cameraMoving) {
            setHovered(true);
        }
    }, [cameraMoving, isCameraLocked]);

    const handlePointerOut = useCallback(() => {
        setHovered(false);
    }, []);

    useEffect(() => {
        if (!isCameraLocked) {
            handleMonitorClick();
        }
    }, [activeHref, handleMonitorClick, isCameraLocked]);

    return (
        <group ref={monitorRef} position={[0, 0, 0]} scale={[1, 1, 1]}>
            <primitive object={scene} />
            <Html
                position={[3.53, 3.71, -0.53523]}
                transform
                distanceFactor={0.5}
                rotation-y={-Math.PI / 2}
                style={{
                    width: "100%",
                    height: "100%",
                    pointerEvents: isCameraLocked ? "auto" : "none",
                }}
            >
                <div className="w-full h-full relative">
                    {!isCameraLocked && (
                        <div
                            className="absolute top-0 left-0 w-full h-full"
                            style={{
                                pointerEvents: "auto",
                                backgroundColor: "transparent",
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleClick();
                            }}
                            onMouseEnter={handlePointerOver}
                            onMouseLeave={handlePointerOut}
                        />
                    )}
                    <iframe
                        src="https://owen-macos.vercel.app/"
                        className="w-monitor-width	h-monitor-height"
                        id="owen-macos-monitor"
                    />
                </div>
            </Html>
        </group>
    );
};

useGLTF.preload("/models/monitor.glb");

export default Monitor;

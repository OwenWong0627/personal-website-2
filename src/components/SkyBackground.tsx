import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";

const SkyBackground: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        let mesh: THREE.Mesh;
        const start_time = Date.now();

        const camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            1,
            3000
        );
        camera.position.z = 6000;

        const scene = new THREE.Scene();
        scene.background = null;

        const geometries: THREE.BufferGeometry[] = [];

        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(
            "https://mrdoob.com/lab/javascript/webgl/clouds/cloud10.png",
            animate
        );
        texture.magFilter = THREE.LinearFilter;
        texture.minFilter = THREE.LinearMipmapLinearFilter;

        const material = new THREE.ShaderMaterial({
            uniforms: {
                map: { value: texture },
                maxDistance: { value: 3000.0 },
                fadeStart: { value: 0.0 },
                baseOpacity: { value: 0.85 },
            },
            vertexShader: `
                varying vec2 vUv;
                varying float vDepth;

                void main() {
                    vUv = uv;
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    vDepth = -mvPosition.z;
                    gl_Position = projectionMatrix * mvPosition;
                }`,
            fragmentShader: `
                uniform sampler2D map;
                uniform float maxDistance;
                uniform float fadeStart;
                uniform float baseOpacity;
                
                varying vec2 vUv;
                varying float vDepth;

                void main() {
                    vec4 texColor = texture2D(map, vUv);
                    
                    float distanceOpacity = 1.0 - smoothstep(fadeStart, maxDistance, vDepth);
                    distanceOpacity = clamp(distanceOpacity, 0.0, 1.0);
                    
                    gl_FragColor = texColor;
                    gl_FragColor.a *= distanceOpacity * baseOpacity;
                }`,
            depthWrite: false,
            depthTest: false,
            transparent: true,
        });

        const planeGeometry = new THREE.PlaneGeometry(64, 64);

        for (let i = 0; i < 8000; i++) {
            const plane = planeGeometry.clone();
            plane.translate(
                Math.random() * 2000 - 1000,
                -Math.random() * Math.random() * 200 - 65,
                i
            );
            const scale = Math.random() * 0.8 + 1.2;
            plane.scale(scale, scale, 1.0);

            geometries.push(plane);
        }

        const geometry = BufferGeometryUtils.mergeGeometries(geometries);

        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        mesh = new THREE.Mesh(geometry, material);
        mesh.position.z = -8000;
        scene.add(mesh);

        const renderer = new THREE.WebGLRenderer({
            antialias: false,
            alpha: true,
            powerPreference: "low-power",
        });
        renderer.setClearColor(0x000000, 0);

        renderer.setSize(window.innerWidth, window.innerHeight);
        containerRef.current.appendChild(renderer.domElement);

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        window.addEventListener("resize", onWindowResize);

        function animate() {
            requestAnimationFrame(animate);

            const position = ((Date.now() - start_time) * 0.03) % 8000;
            camera.position.z = -position + 8000;

            renderer.render(scene, camera);
        }

        return () => {
            window.removeEventListener("resize", onWindowResize);
            renderer.dispose();
        };
    }, []);

    return (
        <>
            <div className="fixed inset-0 pointer-events-none z-[-2] bg-gradient-to-b from-[#326696] via-[#4584b4] to-[#4584b4]" />
            <div
                ref={containerRef}
                className="fixed inset-0 pointer-events-none z-[-1]"
            />
        </>
    );
};

export default SkyBackground;

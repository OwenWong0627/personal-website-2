import { Environment, OrbitControls } from "@react-three/drei";
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
      dpr={[1, 2]}
      // dpr is the device pixel ratio. Here we are setting it to 1 and 2 for retina displays to prevent blurriness in the model rendering on high resolution screens.
    >
      <ambientLight intensity={Math.PI / 2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <Suspense fallback={null}>{children}</Suspense>
      <OrbitControls />
      <Environment preset="dawn" />
    </Canvas>
  );
};

export default RenderModel;
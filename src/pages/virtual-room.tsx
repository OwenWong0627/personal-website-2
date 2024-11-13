// import Box from '@/components/models/Box';
import RenderModel from '@/components/RenderModel';
import dynamic from 'next/dynamic';
import React from 'react';

const Box = dynamic(() => import("@/components/models/Box"), {
  ssr: false,
});

export default function VirtualRoom() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between relative'>
      <div className='w-screen h-screen'>
        <RenderModel>
          <Box position={[-1.2, 0, 0]}/>
          <Box position={[1.2, 0, 0]}/>
        </RenderModel>
      </div>
    </main>
  );
}

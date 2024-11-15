// src/pages/index.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
      <Image
        src="/next.svg"  // Ensure this logo is relevant or replace with your own
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      />

      <h1 className="mt-8 text-4xl font-bold text-center text-gray-800 dark:text-white">
        Welcome to My Virtual Office
      </h1>

      <p className="mt-4 text-lg text-center text-gray-600 dark:text-gray-300">
        Discover the 3D experience of our virtual office.
      </p>

      {/* Link to the virtual room page */}
      <Link href="/virtual-room" className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300">
        Enter Virtual Room
      </Link>

      {/* Optional: Add more content or links here */}
    </div>
  );
}

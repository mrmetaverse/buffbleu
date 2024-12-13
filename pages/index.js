import Head from 'next/head';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import '../components/aframe-components';

// Create a client-side only version of the scene
const Scene = dynamic(() => import('../components/Scene'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <Head>
        <title>Merry Christmas Evan</title>
      </Head>
      
      {isClient && <Scene />}
    </>
  );
} 
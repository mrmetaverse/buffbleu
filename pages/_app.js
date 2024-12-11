import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const loadAframe = async () => {
      try {
        await import('aframe');
        await import('../components/aframe-components');
      } catch (error) {
        console.error('Error loading A-Frame components:', error);
      }
    };
    
    loadAframe();
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp; 
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const loadAframe = async () => {
      try {
        await import('aframe');
        // Wait a tick to ensure AFRAME is available globally
        setTimeout(async () => {
          await import('../components/aframe-components');
        }, 0);
      } catch (error) {
        console.error('Error loading A-Frame components:', error);
      }
    };
    
    loadAframe();
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp; 
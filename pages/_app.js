import { useEffect } from 'react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Load A-Frame only once and only on client side
    if (typeof window !== 'undefined' && !window.AFRAME) {
      const script = document.createElement('script');
      script.src = 'https://aframe.io/releases/1.4.0/aframe.min.js';
      script.async = true;
      script.onload = () => {
        // Initialize mobile controls after A-Frame loads
        import('../components/mobile-controls');
      };
      document.head.appendChild(script);
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp; 
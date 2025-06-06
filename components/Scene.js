import { useEffect, useState } from 'react';

export default function Scene() {
  const [isAframeReady, setIsAframeReady] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.AFRAME) {
      setIsAframeReady(true);
    } else {
      const checkAframe = setInterval(() => {
        if (window.AFRAME) {
          setIsAframeReady(true);
          clearInterval(checkAframe);
        }
      }, 100);
      return () => clearInterval(checkAframe);
    }
  }, []);

  if (!isAframeReady) return null;

  return (
    <a-scene fog="type: exponential; color: #241236; density: 0.05">
      {/* Night Sky */}
      <a-sky color="#000000" material="shader: flat; side: back" />
      
      {/* Star Field with colored twinkles */}
      <a-entity id="starfield">
        {[...Array(500)].map((_, i) => {
          const x = Math.random() * 120 - 60;
          const y = Math.random() * 60;
          const z = Math.random() * 120 - 60;
          const color = Math.random() < 0.15 ? '#ff0000' : 
                       Math.random() < 0.3 ? '#00ff00' : 
                       Math.random() < 0.9 ? '#FFFFFF' : '#CCCCCC';
          return (
            <a-sphere
              key={i}
              position={`${x} ${y} ${z}`}
              radius="0.05"
              color={color}
              material="shader: flat; opacity: 0.8"
              animation__position={`property: position; dir: alternate; dur: ${3000 + Math.random() * 2000}; easing: easeInOutSine; loop: true; to: ${x} ${y + 0.5} ${z}`}
              animation__opacity={`property: material.opacity; dir: alternate; dur: ${1000 + Math.random() * 1000}; easing: easeInOutSine; loop: true; from: 0.4; to: 1`}
            />
          );
        })}
      </a-entity>

      {/* Snow */}
      <a-entity id="snowfield">
        {[...Array(500)].map((_, i) => {
          const x = Math.random() * 80 - 40;
          const y = Math.random() * 40;
          const z = Math.random() * 80 - 40;
          const duration = 6000 + Math.random() * 4000;
          return (
            <a-sphere
              key={`snow-${i}`}
              position={`${x} ${y} ${z}`}
              radius="0.03"
              color="#FFFFFF"
              material="shader: flat; opacity: 0.8"
              animation={`property: position; dir: normal; dur: ${duration}; easing: linear; loop: true; 
                         from: ${x} ${y} ${z}; 
                         to: ${x + (Math.random() - 0.5) * 2} ${-2} ${z + (Math.random() - 0.5) * 2}`}
            />
          );
        })}
      </a-entity>

      {/* Snowballs on Ground */}
      <a-entity id="snowballs">
        {[...Array(50)].map((_, i) => {
          const x = Math.random() * 28 - 14;
          const z = Math.random() * 28 - 14 + -4;
          const scale = 0.3 + Math.random() * 0.7;
          const rotation = Math.random() * 360;
          return (
            <a-entity key={`snowball-${i}`} position={`${x} ${scale/2} ${z}`}>
              <a-sphere
                radius={scale}
                color="#FFFFFF"
                material="roughness: 1; metalness: 0"
                shadow="cast: true; receive: true"
                segments-height="10"
                segments-width="10">
                <a-sphere
                  radius={scale * 1.02}
                  material="color: #FFFFFF; opacity: 0.3; roughness: 1; transparent: true"
                  segments-height="8"
                  segments-width="8"
                ></a-sphere>
                {[...Array(5)].map((_, j) => {
                  const bx = (Math.random() - 0.5) * scale * 0.5;
                  const by = (Math.random() - 0.5) * scale * 0.5;
                  const bz = (Math.random() - 0.5) * scale * 0.5;
                  return (
                    <a-sphere
                      key={`bump-${j}`}
                      position={`${bx} ${by} ${bz}`}
                      radius={scale * 0.2}
                      color="#FFFFFF"
                      material="roughness: 1"
                    ></a-sphere>
                  );
                })}
              </a-sphere>
            </a-entity>
          );
        })}
      </a-entity>

      {/* Snow Piles */}
      <a-entity id="snow-piles">
        {[...Array(10)].map((_, i) => {
          const x = Math.random() * 25 - 12.5;
          const z = Math.random() * 25 - 12.5 + -4;
          const scale = 1 + Math.random() * 2;
          return (
            <a-entity key={`pile-${i}`} position={`${x} ${scale/3} ${z}`}>
              <a-sphere
                radius={scale}
                scale={`1 0.5 1`}
                color="#FFFFFF"
                material="roughness: 1; metalness: 0"
                shadow="cast: true; receive: true"
                segments-height="6"
                segments-width="8"
              >
                {[...Array(8)].map((_, j) => {
                  const bx = (Math.random() - 0.5) * scale;
                  const by = (Math.random() - 0.5) * scale * 0.2;
                  const bz = (Math.random() - 0.5) * scale;
                  return (
                    <a-sphere
                      key={`pile-bump-${j}`}
                      position={`${bx} ${by} ${bz}`}
                      radius={scale * 0.3}
                      scale="1 0.4 1"
                      color="#FFFFFF"
                      material="roughness: 1"
                    ></a-sphere>
                  );
                })}
              </a-sphere>
            </a-entity>
          );
        })}
      </a-entity>

      {/* Parking Lot Floor */}
      <a-plane 
        position="0 0 -4" 
        rotation="-90 0 0" 
        width="30" 
        height="30" 
        color="#FFFFFF"
        shadow="receive: true"
        material="src: #parkingTexture; repeat: 10 10; roughness: 1"
      />

      {/* Procedural Parking Lot Texture */}
      <a-assets>
        <canvas id="parkingTexture" width="512" height="512"></canvas>
      </a-assets>

      {/* Billboard */}
      <a-image
        id="billboard"
        src="/tooknoeffort.png"
        position="0 8 -20"
        width="24"
        height="16"
        shadow="cast: true">
        {/* Animated Spotlights */}
        <a-light
          type="spot"
          position="-12 -2 8"
          intensity="5"
          angle="45"
          penumbra="0.3"
          target="#billboard"
          animation="property: position; dir: alternate; dur: 4000; easing: easeInOutSine; loop: true; to: 12 -2 8"
          color="#FFF">
        </a-light>
        
        <a-light
          type="spot"
          position="12 -2 8"
          intensity="5"
          angle="45"
          penumbra="0.3"
          target="#billboard"
          animation="property: position; dir: alternate; dur: 4000; easing: easeInOutSine; loop: true; to: -12 -2 8"
          color="#FFF">
        </a-light>
      </a-image>

      {/* Ravens Purple Ambient Light */}
      <a-light 
        type="ambient" 
        intensity="0.3"
        color="#241236">
      </a-light>
      
      {/* Additional Ravens Purple Point Lights */}
      <a-light
        type="point"
        color="#241236"
        position="-5 3 0"
        intensity="0.5"
        animation="property: intensity; dir: alternate; dur: 3000; easing: easeInOutSine; loop: true; from: 0.3; to: 0.7">
      </a-light>
      
      <a-light
        type="point"
        color="#241236"
        position="5 3 0"
        intensity="0.5"
        animation="property: intensity; dir: alternate; dur: 2500; easing: easeInOutSine; loop: true; from: 0.3; to: 0.7">
      </a-light>

      {/* Camera with controls */}
      <a-entity 
        position="0 1.6 5"
        camera 
        look-controls="enabled: true; touchEnabled: true; mouseEnabled: true; magicWindowTrackingEnabled: false"
        wasd-controls
        mobile-controls>
      </a-entity>
    </a-scene>
  );
} 
// Only run this code on the client side
if (typeof window !== 'undefined') {
  // Wait for A-Frame to be ready
  window.addEventListener('load', () => {
    if (typeof AFRAME === 'undefined') {
      console.warn('A-Frame not loaded yet');
      return;
    }

    // Import THREE from A-Frame to use for vector calculations
    const THREE = AFRAME.THREE;

    AFRAME.registerComponent('parking-lot-texture', {
      init: function() {
        const canvas = document.getElementById('parkingTexture');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        // Set background to white
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, 512, 512);
        
        // Draw parking lines
        ctx.strokeStyle = '#333333';
        ctx.lineWidth = 4;
        
        // Draw straight lines
        for(let i = 0; i < 512; i += 64) {
          // Vertical lines
          ctx.beginPath();
          ctx.moveTo(i, 0);
          ctx.lineTo(i, 512);
          ctx.stroke();
          
          // Horizontal lines
          ctx.beginPath();
          ctx.moveTo(0, i);
          ctx.lineTo(512, i);
          ctx.stroke();
        }
        
        // Draw squiggles
        ctx.strokeStyle = '#222222';
        ctx.lineWidth = 2;
        for(let i = 0; i < 10; i++) {
          ctx.beginPath();
          ctx.moveTo(Math.random() * 512, Math.random() * 512);
          for(let j = 0; j < 5; j++) {
            ctx.quadraticCurveTo(
              Math.random() * 512, Math.random() * 512,
              Math.random() * 512, Math.random() * 512
            );
          }
          ctx.stroke();
        }
      }
    });
  });
} 
const initMobileControls = () => {
  if (typeof window !== 'undefined' && typeof AFRAME !== 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/nipplejs/0.10.1/nipplejs.min.js';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      AFRAME.registerComponent('mobile-controls', {
        init: function () {
          this.camera = this.el;
          this.speed = 0.15;
          
          // Create joystick container
          const joystickContainer = document.createElement('div');
          joystickContainer.id = 'moveJoystick';
          joystickContainer.style.cssText = `
            position: fixed;
            bottom: 40px;
            left: 40px;
            width: 120px;
            height: 120px;
            z-index: 9999;
            touch-action: none;
            pointer-events: auto;
          `;
          document.body.appendChild(joystickContainer);
          
          // Initialize joystick
          this.moveJoystick = nipplejs.create({
            zone: joystickContainer,
            mode: 'static',
            position: { left: '50%', top: '50%' },
            color: '#241236',
            size: 120,
            fadeTime: 0,
            multitouch: true
          });
          
          // Handle joystick movement
          this.moveJoystick.on('move', (evt, data) => {
            if (!data || !data.angle || !data.force) return;
            
            const rotation = this.camera.object3D.rotation.y;
            const position = this.camera.object3D.position;
            const force = Math.min(data.force / 50, 0.2);
            
            const angleRad = data.angle.radian;
            const moveX = Math.cos(angleRad) * force;
            const moveZ = -Math.sin(angleRad) * force;
            
            position.x += (moveX * Math.cos(rotation)) + (moveZ * Math.sin(rotation));
            position.z += (moveZ * Math.cos(rotation)) - (moveX * Math.sin(rotation));
          });

          // Prevent joystick from interfering with look controls
          joystickContainer.addEventListener('touchstart', (e) => {
            e.stopPropagation();
          });
          joystickContainer.addEventListener('touchmove', (e) => {
            e.stopPropagation();
          });
        }
      });
    };
  }
};

if (typeof window !== 'undefined') {
  if (typeof AFRAME !== 'undefined') {
    initMobileControls();
  } else {
    window.addEventListener('aframe-loaded', initMobileControls);
  }
} 
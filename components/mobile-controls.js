const initMobileControls = () => {
  if (typeof window !== 'undefined' && typeof AFRAME !== 'undefined') {
    AFRAME.registerComponent('mobile-controls', {
      init: function () {
        if (!AFRAME.utils.device.isMobile()) return; // Only run on mobile
        
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.moving = false;
        this.speed = 0.15;
        
        // Create D-pad UI
        const dpad = document.createElement('div');
        dpad.id = 'mobile-dpad';
        dpad.style.cssText = `
          position: fixed;
          bottom: 20px;
          left: 20px;
          width: 150px;
          height: 150px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          z-index: 9999;
          touch-action: none;
        `;
        
        document.body.appendChild(dpad);
        
        // Touch handlers for D-pad
        dpad.addEventListener('touchstart', this.onTouchStart.bind(this));
        dpad.addEventListener('touchmove', this.onTouchMove.bind(this));
        dpad.addEventListener('touchend', this.onTouchEnd.bind(this));
        
        // Pinch zoom handlers
        document.addEventListener('touchstart', this.onPinchStart.bind(this));
        document.addEventListener('touchmove', this.onPinchMove.bind(this));
      },
      
      onTouchStart: function (evt) {
        evt.preventDefault();
        const touch = evt.touches[0];
        this.touchStartX = touch.clientX;
        this.touchStartY = touch.clientY;
        this.moving = true;
      },
      
      onTouchMove: function (evt) {
        if (!this.moving) return;
        evt.preventDefault();
        
        const touch = evt.touches[0];
        const deltaX = touch.clientX - this.touchStartX;
        const deltaY = touch.clientY - this.touchStartY;
        
        // Calculate movement direction
        const rotation = this.el.object3D.rotation.y;
        const moveX = Math.sin(rotation) * deltaY * this.speed + Math.cos(rotation) * deltaX * this.speed;
        const moveZ = Math.cos(rotation) * deltaY * this.speed - Math.sin(rotation) * deltaX * this.speed;
        
        // Update position
        this.el.object3D.position.x += moveX * 0.01;
        this.el.object3D.position.z += moveZ * 0.01;
      },
      
      onTouchEnd: function () {
        this.moving = false;
      },
      
      onPinchStart: function (evt) {
        if (evt.touches.length !== 2) return;
        
        const touch1 = evt.touches[0];
        const touch2 = evt.touches[1];
        this.pinchDistance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );
      },
      
      onPinchMove: function (evt) {
        if (evt.touches.length !== 2) return;
        
        const touch1 = evt.touches[0];
        const touch2 = evt.touches[1];
        const newDistance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );
        
        if (this.pinchDistance) {
          const delta = newDistance - this.pinchDistance;
          this.el.object3D.position.z += delta * 0.01;
        }
        
        this.pinchDistance = newDistance;
      }
    });
  }
};

if (typeof window !== 'undefined') {
  if (typeof AFRAME !== 'undefined') {
    initMobileControls();
  } else {
    window.addEventListener('aframe-loaded', initMobileControls);
  }
} 
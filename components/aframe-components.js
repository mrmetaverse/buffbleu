// Only run this code on the client side
if (typeof window !== 'undefined') {
  // Import THREE from A-Frame to use for vector calculations
  const THREE = AFRAME.THREE;

  AFRAME.registerComponent('custom-controls', {
    init: function () {
      const camera = this.el;
      let moveForward = false;
      let moveBackward = false;
      let moveLeft = false;
      let moveRight = false;
      const speed = 0.15;

      // Create D-pad container
      const dpadContainer = document.createElement('div');
      dpadContainer.className = 'dpad-container';
      
      const dpad = document.createElement('div');
      dpad.className = 'dpad';
      
      // Create D-pad buttons with icons
      const buttons = {
        up: createButton('dpad-up', '↑'),
        right: createButton('dpad-right', '→'),
        down: createButton('dpad-down', '↓'),
        left: createButton('dpad-left', '←')
      };

      function createButton(className, icon) {
        const button = document.createElement('div');
        button.className = `dpad-button ${className}`;
        button.innerHTML = icon;
        dpad.appendChild(button);
        return button;
      }

      // Add touch event listeners with prevent default
      const addTouchListeners = (element, callback) => {
        element.addEventListener('touchstart', (e) => {
          e.preventDefault();
          callback(true);
        }, { passive: false });
        
        element.addEventListener('touchend', (e) => {
          e.preventDefault();
          callback(false);
        }, { passive: false });
      };

      addTouchListeners(buttons.up, (val) => moveForward = val);
      addTouchListeners(buttons.down, (val) => moveBackward = val);
      addTouchListeners(buttons.left, (val) => moveLeft = val);
      addTouchListeners(buttons.right, (val) => moveRight = val);

      dpadContainer.appendChild(dpad);
      document.body.appendChild(dpadContainer);

      // Movement animation
      this.tick = function() {
        const rotation = camera.object3D.rotation;
        const position = camera.object3D.position;
        
        // Calculate forward direction based on camera rotation
        const direction = new THREE.Vector3();
        camera.object3D.getWorldDirection(direction);
        
        if (moveForward) {
          position.x += direction.x * speed;
          position.z += direction.z * speed;
        }
        if (moveBackward) {
          position.x -= direction.x * speed;
          position.z -= direction.z * speed;
        }
        if (moveLeft) {
          position.x += Math.cos(rotation.y + Math.PI/2) * speed;
          position.z += Math.sin(rotation.y + Math.PI/2) * speed;
        }
        if (moveRight) {
          position.x += Math.cos(rotation.y - Math.PI/2) * speed;
          position.z += Math.sin(rotation.y - Math.PI/2) * speed;
        }
      };
    }
  });

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
} 
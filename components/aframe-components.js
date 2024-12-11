// Only run this code on the client side
if (typeof window !== 'undefined') {
  const nipplejs = require('nipplejs');

  AFRAME.registerComponent('mobile-controls', {
    init: function () {
      // Mobile joystick controls
      const joystickEl = document.createElement('div');
      joystickEl.classList.add('joystick');
      document.body.appendChild(joystickEl);

      const joystick = nipplejs.create({
        zone: joystickEl,
        mode: 'static',
        position: { left: '50px', bottom: '50px' },
        color: 'white',
      });

      const camera = this.el;
      joystick.on('move', (evt, data) => {
        const speed = 0.1;
        const x = Math.cos(data.angle.radian) * speed;
        const z = Math.sin(data.angle.radian) * speed;
        const pos = camera.getAttribute('position');
        camera.setAttribute('position', {
          x: pos.x + x,
          y: pos.y,
          z: pos.z + z,
        });
      });
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
      
      // Create D-pad buttons
      const buttons = {
        up: createButton('dpad-up'),
        right: createButton('dpad-right'),
        down: createButton('dpad-down'),
        left: createButton('dpad-left')
      };

      function createButton(className) {
        const button = document.createElement('div');
        button.className = `dpad-button ${className}`;
        dpad.appendChild(button);
        return button;
      }

      // Add touch event listeners
      buttons.up.addEventListener('touchstart', () => moveForward = true);
      buttons.up.addEventListener('touchend', () => moveForward = false);
      
      buttons.down.addEventListener('touchstart', () => moveBackward = true);
      buttons.down.addEventListener('touchend', () => moveBackward = false);
      
      buttons.left.addEventListener('touchstart', () => moveLeft = true);
      buttons.left.addEventListener('touchend', () => moveLeft = false);
      
      buttons.right.addEventListener('touchstart', () => moveRight = true);
      buttons.right.addEventListener('touchend', () => moveRight = false);

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
} 
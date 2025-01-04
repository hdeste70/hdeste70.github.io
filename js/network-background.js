const canvas = document.getElementById('network');
const ctx = canvas.getContext('2d');

let width, height;
const particles = [50];
const maxParticles = 100; // Número de puntos
const connectionDistance = 100; // Distancia máxima para conectar puntos

// Redimensionar canvas
function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Generar partículas
function createParticles() {
  particles.length = 0;
  for (let i = 0; i < maxParticles; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
    });
  }
}
createParticles();

// Dibujar partículas y conexiones
function drawParticles() {
  ctx.clearRect(0, 0, width, height);

  // Dibujar partículas
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = '#007BFF';
    ctx.fill();
  });

  // Dibujar conexiones
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < connectionDistance) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(0, 123, 255, ${1 - distance / connectionDistance})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

// Animar partículas
function animateParticles() {
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;
  });

  drawParticles();
  requestAnimationFrame(animateParticles);
}

animateParticles();

window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = 70;
  const particles = [];
  const colors = ['rgba(255,255,255,0.8)', 'rgba(255,255,255,0.5)', 'rgba(220,220,255,0.5)'];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }

  function update(p) {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x <= 0 || p.x >= width) p.vx *= -1;
    if (p.y <= 0 || p.y >= height) p.vy *= -1;
  }

  function draw(p) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      update(p);
      draw(p);
    });
    requestAnimationFrame(animate);
  }

  animate();
});

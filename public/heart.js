const canvas = document.getElementById('hearts-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const hearts = [];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

class Heart {
  constructor() {
    this.x = random(0, canvas.width);
    this.y = canvas.height + 50;
    this.size = random(10, 25);
    this.speed = random(1, 3);
    this.angle = random(0, Math.PI * 2);
    this.spin = random(0.01, 0.05);
    this.color = `rgba(255, ${Math.floor(random(50,200))}, ${Math.floor(random(150,255))}, 0.8)`;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(0, -this.size/2, -this.size, -this.size/2, -this.size, 0);
    ctx.bezierCurveTo(-this.size, this.size/2, 0, this.size, 0, this.size*1.5);
    ctx.bezierCurveTo(0, this.size, this.size, this.size/2, this.size, 0);
    ctx.bezierCurveTo(this.size, -this.size/2, 0, -this.size/2, 0, 0);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
    this.y -= this.speed;
    this.angle += this.spin;

    // reset heart when it goes off top
    if (this.y < -50) {
      this.y = canvas.height + 50;
      this.x = random(0, canvas.width);
    }
  }
}

function initHearts() {
  for (let i = 0; i < 25; i++) {
    hearts.push(new Heart());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach(h => h.draw());
  requestAnimationFrame(animate);
}

initHearts();
animate();

const heart = document.getElementById('heart');
const messageCard = document.getElementById('message-card');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const confettiCanvas = document.getElementById('confetti-canvas');
const ctx = confettiCanvas.getContext('2d');

let confettiPieces = [];
let confettiActive = false;
let animationFrameId;

// Ajustar tamaño del canvas
function resizeCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Confetti pieza
class Confetti {
  constructor() {
    this.x = Math.random() * confettiCanvas.width;
    this.y = Math.random() * -confettiCanvas.height;
    this.size = Math.random() * 7 + 7;
    this.speedY = Math.random() * 3 + 2;
    this.speedX = (Math.random() - 0.5) * 2;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = (Math.random() - 0.5) * 10;
    this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
  }
  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    this.rotation += this.rotationSpeed;

    if (this.y > confettiCanvas.height) {
      this.y = -this.size;
      this.x = Math.random() * confettiCanvas.width;
    }
    if (this.x > confettiCanvas.width) this.x = 0;
    if (this.x < 0) this.x = confettiCanvas.width;
  }
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
    ctx.restore();
  }
}

// Iniciar confetti
function startConfetti() {
  if (confettiActive) return;
  confettiActive = true;
  confettiPieces = [];
  for (let i = 0; i < 150; i++) {
    confettiPieces.push(new Confetti());
  }
  runConfetti();
  setTimeout(stopConfetti, 4000);
}

// Parar confetti
function stopConfetti() {
  confettiActive = false;
  cancelAnimationFrame(animationFrameId);
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
}

// Animación confetti
function runConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiPieces.forEach(piece => {
    piece.update();
    piece.draw();
  });
  if (confettiActive) {
    animationFrameId = requestAnimationFrame(runConfetti);
  }
}

// Mostrar/Ocultar carta con mensaje al hacer clic en corazón
heart.addEventListener('click', () => {
  messageCard.classList.toggle('hidden');
  if (!messageCard.classList.contains('hidden')) {
    startConfetti();
  } else {
    stopConfetti();
  }
});

// Función para mover el botón NO a una posición aleatoria dentro de la carta
function moveNoButton() {
  const cardRect = messageCard.getBoundingClientRect();
  const noRect = noBtn.getBoundingClientRect();

  const maxX = cardRect.width - noRect.width - 20;
  const maxY = cardRect.height - noRect.height - 20;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  noBtn.style.position = 'absolute';
  noBtn.style.left = randomX + 'px';
  noBtn.style.top = randomY + 'px';
}

// Mover botón NO en mouseover y en toque para móvil
noBtn.addEventListener('mouseenter', moveNoButton);
noBtn.addEventListener('touchstart', e => {
  e.preventDefault(); // prevenir toque accidental de doble clic
  moveNoButton();
});

// Acción botón SÍ
yesBtn.addEventListener('click', () => {
  alert('Entonces nos fuimos por ese fresco pues, afeitese eso que ahora la recojo');
});

// Al mostrar la carta, inicializamos el botón NO en posición estática (reset)
heart.addEventListener('click', () => {
  noBtn.style.position = 'static';
  noBtn.style.left = '';
  noBtn.style.top = '';
});

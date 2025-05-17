function showMessage() {
  document.getElementById("loveCard").classList.remove("hidden");
}

function moveNoButton(button) {
  const randomX = Math.random() * 300 - 150;
  const randomY = Math.random() * 200 - 100;
  button.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

function celebrate() {
  createConfetti();
  setTimeout(() => alert("¡Entonces prepárate para el fresco más romántico de tu vida, Karen! 💕🥤"), 1000);
}

function createConfetti() {
  const confettiContainer = document.getElementById("confetti");
  for (let i = 0; i < 80; i++) {
    const confetto = document.createElement("div");
    confetto.classList.add("confetto");
    confetto.style.position = "absolute";
    confetto.style.top = "-10px";
    confetto.style.left = `${Math.random() * 100}%`;
    confetto.style.width = "10px";
    confetto.style.height = "10px";
    confetto.style.backgroundColor = randomColor();
    confetto.style.borderRadius = "50%";
    confetto.style.opacity = Math.random();
    confetto.style.animation = `fall ${3 + Math.random() * 2}s linear ${Math.random()}s forwards`;
    confettiContainer.appendChild(confetto);
  }
}

function randomColor() {
  const colors = ["#ff69b4", "#ff4d6d", "#ffd1dc", "#ffc0cb", "#ff85a2"];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Confetti falling animation
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fall {
    to {
      transform: translateY(100vh) rotateZ(360deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

const socket = io();  // Инициализира връзка със сървъра

const radevaCountEl = document.getElementById('radeva-count');
const tsonevaCountEl = document.getElementById('tsoneva-count');

// Получаване на текущото състояние от сървъра
socket.on('state', (counts) => {
  radevaCountEl.textContent = counts.radeva;
  tsonevaCountEl.textContent = counts.tsoneva;
});

// Натискане на бутон за увеличаване
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const who = btn.getAttribute('data-who');
    socket.emit('increment', who);  // Изпраща събитие към сървъра
  });
});

// Нулиране
document.getElementById('reset').addEventListener('click', () => {
  if (confirm('Наистина ли искаш да нулираш броячите?')) {
    socket.emit('reset');
  }
});

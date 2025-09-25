const socket = io();


const radevaCountEl = document.getElementById('radeva-count');
const tsonevaCountEl = document.getElementById('tsoneva-count');


socket.on('state', (counts) => {
radevaCountEl.textContent = counts.radeva;
tsonevaCountEl.textContent = counts.tsoneva;
});


document.querySelectorAll('.btn').forEach(btn => {
btn.addEventListener('click', () => {
const who = btn.getAttribute('data-who');
socket.emit('increment', who);
});
});


document.getElementById('reset').addEventListener('click', () => {
if (confirm('Наистина ли искаш да нулираш броячите?')) {
socket.emit('reset');
}
});
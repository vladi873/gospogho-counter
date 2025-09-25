const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let counts = { radeva: 0, tsoneva: 0 };
const DATA_FILE = 'data.json';

// Четене на данни от файл (ако съществуват)
if (fs.existsSync(DATA_FILE)) {
  counts = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

function saveCounts() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(counts, null, 2));
}

app.use(express.static('public'));

io.on('connection', (socket) => {
  socket.emit('state', counts);  // Изпраща текущото състояние на новия клиент

  socket.on('increment', (who) => {
    if (who === 'radeva') counts.radeva += 1;
    if (who === 'tsoneva') counts.tsoneva += 1;
    saveCounts();
    io.emit('state', counts);  // Актуализира всички клиенти
  });

  socket.on('reset', () => {
    counts.radeva = 0;
    counts.tsoneva = 0;
    saveCounts();
    io.emit('state', counts);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

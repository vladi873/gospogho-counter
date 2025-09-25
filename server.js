<<<<<<< HEAD
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const fs = require('fs');


const app = express();
const server = http.createServer(app);
const io = new Server(server);


const PORT = process.env.PORT || 3000;


// Статични файлове
app.use(express.static('public'));


// Четене на данните от файла
let counts;
try {
counts = JSON.parse(fs.readFileSync('data.json', 'utf8'));
} catch (e) {
counts = { radeva: 0, tsoneva: 0 };
}


// Функция за запис
function saveCounts() {
fs.writeFileSync('data.json', JSON.stringify(counts, null, 2));
}


// Socket.IO логика
io.on('connection', (socket) => {
socket.emit('state', counts);


socket.on('increment', (who) => {
if (who === 'radeva') counts.radeva += 1;
if (who === 'tsoneva') counts.tsoneva += 1;
saveCounts();
io.emit('state', counts);
});


socket.on('reset', () => {
counts.radeva = 0;
counts.tsoneva = 0;
saveCounts();
io.emit('state', counts);
});
});


=======
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const fs = require('fs');


const app = express();
const server = http.createServer(app);
const io = new Server(server);


const PORT = process.env.PORT || 3000;


// Статични файлове
app.use(express.static('public'));


// Четене на данните от файла
let counts;
try {
counts = JSON.parse(fs.readFileSync('data.json', 'utf8'));
} catch (e) {
counts = { radeva: 0, tsoneva: 0 };
}


// Функция за запис
function saveCounts() {
fs.writeFileSync('data.json', JSON.stringify(counts, null, 2));
}


// Socket.IO логика
io.on('connection', (socket) => {
socket.emit('state', counts);


socket.on('increment', (who) => {
if (who === 'radeva') counts.radeva += 1;
if (who === 'tsoneva') counts.tsoneva += 1;
saveCounts();
io.emit('state', counts);
});


socket.on('reset', () => {
counts.radeva = 0;
counts.tsoneva = 0;
saveCounts();
io.emit('state', counts);
});
});


>>>>>>> 68205ef (Initial commit)
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
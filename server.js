'use strict';

const path = require('path');
const createServer = require('http').createServer;
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const ws = require('ws');
const pty = require('child_pty');
const options = require('./config.json');

const server = createServer();
const wss = new ws.Server({ server: server });
const app = express();

let connections = [];

app.use(cors());
app.use(compression());
app.use(express.static(path.resolve(__dirname, './dist')))

server.on('request', app);

wss.on('connection', socket => {
  connections.push({
    socket: socket,
    pty: pty.spawn('login', [], { 
      columns: 140, 
      rows: 30
    })
  });

  initSocketHandlers(connections.length - 1);
});

function initSocketHandlers(i) {
  let socket = connections[i].socket;
  let pty = connections[i].pty;

  socket.on('message', input => {
    input = JSON.parse(input);
    if (input.type === 'input') {
      if (pty.stdin.writable) { pty.stdin.write(input.data); }
    } else if (input.type === 'resize') {
      pty.stdout.resize({ columns: input.data.col, rows: input.data.row });
    }
  });

  socket.on('close', () => {
    pty.kill('SIGHUP');
    connections.splice(i, 1);
  });

  pty.stdout.on('data', data => {
    if (socket && socket.readyState === 1) {
      socket.send(data.toString());
    }
  });
}

server.listen(options.port, () => {
  console.log(`Server running on port ${options.port}`);
});

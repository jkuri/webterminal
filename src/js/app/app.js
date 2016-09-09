import { Socket } from './socket';
import { Bar } from './bar';
import { Term } from './term';
import { Misc } from './misc';

const socket = new Socket();
const bar = new Bar();
const term = new Term(socket);
const misc = new Misc();

term.init();

term.termEvents.on('ready', () => {
  socket.connect();
});

socket.events.on('connection', status => {
  bar.setConnectionStatus(status);
  term.initializeTerminal(socket);
});

socket.events.on('message', msg => {
  term.write(msg.data);
});

const body = document.querySelector('body');
const html = document.querySelector('html');
const terminalWindow = body.querySelector('.terminal-window');
const leftBar = body.querySelector('.terminal-window > .bar > .bar-left');
const close = leftBar.querySelector('.close');
const expand = leftBar.querySelector('.expand');
const color = body.querySelector('.terminal-window > .bar > .bar-right > .color');

expand.addEventListener('click', e => {
  e.preventDefault();
  misc.toggleSize();
}, false);

function toggleStyle() {
  if (color.classList.contains('black')) {
    terminalWindow.classList.add('black');
    term.setStyle(true);
    color.classList.remove('black');
  } else {
    terminalWindow.classList.remove('black');
    term.setStyle(false);
    color.classList.add('black');
  }
};

color.addEventListener('click', toggleStyle, false);

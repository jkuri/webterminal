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

expand.addEventListener('click', e => {
  console.log('yes');
  e.preventDefault();
  misc.toggleSize();
}, false);

const colorButtons = document.querySelectorAll('.colors > span');
[].forEach.call(colorButtons, btn => {
  btn.addEventListener('click', e => {
    let color = e.srcElement.classList.item(0);
    changeStyle(color);
  });
});

function changeStyle(color) {
  let c = misc.getStyle(color);
  terminalWindow.classList.remove('black', 'green', 'red', 'yellow');
  terminalWindow.classList.add(color);
  term.setStyle(c);
};

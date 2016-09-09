let buffer = '';
let socket = null;

export class Term {
  constructor() {
    this.term = null;
    this.termEvents = new EventEmitter2();
  }

  init() {
    hterm.defaultStorage = new lib.Storage.Local();
    this.term = new hterm.Terminal();
    this.term.decorate(document.querySelector('.terminal-window > .terminal-content'));

    this.term.prefs_.set('font-family', 'monaco');
    this.term.prefs_.set('font-size', 12);
    this.term.prefs_.set('background-color', '#fff');
    this.term.prefs_.set('foreground-color', '#000');
    this.term.prefs_.set('cursor-color', '#000');
    this.term.prefs_.set('backspace-sends-backspace', true);
    this.term.prefs_.set('cursor-blink', true);
    this.term.setCursorVisible(true);

    this.term.onTerminalReady = () => {
      this.termEvents.emit('ready', true);
    };
  }

  initializeTerminal(ws) {
    socket = ws;
    let io = this.term.io.push();
    this.term.keyboard.installKeyboard(document.querySelector('iframe').contentDocument);

    io.sendString = str => {
      socket.send('input', str);
    };

    io.onVTKeystroke = str => {
      socket.send('input', str);
    };

    io.onTerminalResize = (col, row) => {
      socket.send('resize', { col: col, row: row });
    };
  }

  write(data) {
    if (this.term) {
      this.term.io.print(data);
    }
  }

  setStyle(s) {
    this.term.prefs_.set('background-color', s.background);
    this.term.prefs_.set('foreground-color', s.foreground);
    this.term.prefs_.set('cursor-color', s.cursor);
  }
}

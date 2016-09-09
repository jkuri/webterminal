export class Misc {
  constructor() {
    this.expanded = false;
    this.el = document.querySelector('.terminal-window');
    this.styles = {
      'black': {
        background: '#000',
        foreground: '#fff',
        cursor: '#fff',
        body: '#000'
      },
      'white': {
        background: '#fff',
        foreground: '#000',
        cursor: '#000',
        body: '#fefefb'
      },
      'green': {
        background: '#3fc59d',
        foreground: '#000',
        cursor: '#000',
        body: '#3fc59d'
      },
      'red': {
        background: '#e2747e',
        foreground: '#000',
        cursor: '#000',
        body: '#e2747e'
      },
      'yellow': {
        background: '#f4bf4d',
        foreground: '#000',
        cursor: '#000',
        body: '#f4bf4d'
      }
    };
  }

  fullSize() {
    this.el.classList.add('expanded');
  }

  normalSize() {
    this.el.classList.remove('expanded');
  }
  
  toggleSize() {
    if (this.el.classList.contains('expanded')) {
      this.normalSize();
    } else {
      this.fullSize();
    }
  }

  getStyle(color) {
    return this.styles[color];
  }
}

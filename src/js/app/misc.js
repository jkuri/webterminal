export class Misc {
  constructor() {
    this.expanded = false;
    this.el = document.querySelector('.terminal-window');
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
}

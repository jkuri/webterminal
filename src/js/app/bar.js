export class Bar {
  constructor() {
    this.bar = document.querySelector('.terminal-window > .bar');
    this.barLeft = this.bar.querySelector('.bar-left');
    this.barCenter = this.bar.querySelector('.bar-center');
    this.barRight = this.bar.querySelector('.bar-right');
    this.connStatuses = ['Connecting', 'Connected', 'Closing', 'Closed'];
  }

  setTitle(title) {
    this.barCenter.innerHTML = title;
  }

  setConnectionStatus(i) {
    this.barRight.innerHTML = this.connStatuses[i]; 
  }
}
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
    let circle = this.barRight.querySelector('.circle.no-cursor');
    circle.classList.remove('expand', 'minimize', 'close');
    if (i === 0) {
      circle.classList.add('minimize');
      circle.setAttribute('title', 'Connecting...');
    } else if (i === 1) {
      circle.classList.add('expand');
      circle.setAttribute('title', 'Connected');
    } else {
      circle.classList.add('close');
      circle.setAttribute('title', 'Disconnected');
    } 
  }
}
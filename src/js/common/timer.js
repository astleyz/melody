import View from '../abstract';
import Result from '../result/result';
import {initialState} from '../data/game-data';


class TimerView extends View {
  constructor(modelState) {
    super();
    this.modelState = modelState;
  }

  get minText() {
    let timer = this.modelState.timer;
    return timer / 60 < 10 ? `0${Math.trunc(timer / 60)}` : Math.trunc(timer / 60);
  }

  get secText() {
    let timer = this.modelState.timer;
    return timer % 60 < 10 ? `0${timer % 60}` : timer % 60;
  }

  get template() {
    return `
    <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle cx="390" cy="390" r="370" class="timer-line" stroke-dasharray="2325" stroke-dashoffset="0"
      style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
    </svg>

    <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml" style="top: 65px"> 
      <span class="timer-value-mins">${this.minText}</span><!--
    --><span class="timer-value-dots">:</span><!--
    --><span class="timer-value-secs">${this.secText}</span>
    </div>`;
  }

  render() {
    let el = document.createElement(`template`);
    el.innerHTML = this.template.trim();
    return el.content;
  }

  bind() {
    this.min = this.element.querySelector(`div .timer-value-mins`);
    this.sec = this.element.querySelector(`div .timer-value-secs`);
    this.svgCircle = this.element.querySelector(`svg.timer circle`);
  }
}


export default class TimerPresenter {
  constructor(model) {
    this.intervalId = false;
    this.model = model;
    this.view = new TimerView(model.state);
  }

  init() {
    this.view.main = document.querySelector(`body .app .main`);
    this.view.main.prepend(this.view.element);
    this._start();
  }

  clearTimer() {
    clearInterval(this.intervalId); this.intervalId = false;
  }

  _start() {
    this.intervalId = setInterval(() => {
      !this._isTimerExist() ? this.clearTimer() : void 0;
      let timer = this.model.tick();

      [this.view.min.textContent, this.view.sec.textContent] = [this.view.minText, this.view.secText];

      let dash = this._paintSvgDash(initialState.timer, timer, this.view.svgCircle.r.baseVal.value);
      this.view.svgCircle.style.strokeDasharray = dash.stroke;
      this.view.svgCircle.style.strokeDashoffset = dash.offset;

      if (timer < 0) {
        this.clearTimer();
        new Result().init(`failTime`);
      }
    }, 1000);
  }

  _isTimerExist() {
    let svg = this.view.main.querySelector(`svg.timer`);
    let divClock = this.view.main.querySelector(`div.timer-value`);
    return (svg && divClock) ? true : false;
  }

  _paintSvgDash(totalTime, passedTime, radius) {
    let stroke = 2 * Math.PI * radius;
    let offsetStep = stroke / totalTime;
    let offset = (totalTime - passedTime) * offsetStep;
    return {stroke, offset};
  }
}

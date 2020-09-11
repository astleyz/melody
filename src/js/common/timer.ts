import { SomeObj } from '../interfaces/index';
import View from '../abstract';
import Result from '../result/result';
import { initialState } from '../data/game-data';


class TimerView extends View {
  main: any
  min: any
  sec: any
  svgCircle: any
  modelState: SomeObj

  constructor(modelState: SomeObj) {
    super();
    this.modelState = modelState;
  }

  get minText() {
    const timer = this.modelState.timer;
    return timer / 60 < 10 ? `0${Math.trunc(timer / 60)}` : Math.trunc(timer / 60);
  }

  get secText() {
    const timer = this.modelState.timer;
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

  render(): DocumentFragment {
    const el = document.createElement(`template`);
    el.innerHTML = this.template.trim();
    return el.content;
  }

  bind() {
    this.min = this.element?.querySelector(`div .timer-value-mins`);
    this.sec = this.element?.querySelector(`div .timer-value-secs`);
    this.svgCircle = this.element?.querySelector(`svg.timer circle`);
  }
}


export default class TimerPresenter {
  intervalId: boolean | number
  model: SomeObj
  view: TimerView

  constructor(model: SomeObj) {
    this.intervalId = false;
    this.model = model;
    this.view = new TimerView(model.state);
  }

  init(): void {
    this.view.main = document.querySelector(`body .app .main`);
    this.view.main.prepend(this.view.element);
    this._start();
  }

  clearTimer(): void {
    clearInterval(this.intervalId); this.intervalId = false;
  }

  private _start(): void {
    this.intervalId = setInterval(() => {
      !this._isTimerExist() ? this.clearTimer() : void 0;
      const timer = this.model.tick();

      [this.view.min.textContent, this.view.sec.textContent] = [this.view.minText, this.view.secText];

      const dash = this._paintSvgDash(initialState.timer, timer, this.view.svgCircle.r.baseVal.value);
      this.view.svgCircle.style.strokeDasharray = dash.stroke;
      this.view.svgCircle.style.strokeDashoffset = dash.offset;

      if (timer < 0) {
        this.clearTimer();
        new Result().init(`failTime`);
      }
    }, 1000);
  }

  private _isTimerExist(): boolean {
    const svg = this.view.main.querySelector(`svg.timer`);
    const divClock = this.view.main.querySelector(`div.timer-value`);
    return (svg && divClock) ? true : false;
  }

  private _paintSvgDash<T extends number>(totalTime: T, passedTime: T, radius: T): SomeObj {
    const stroke = 2 * Math.PI * radius;
    const offsetStep = stroke / totalTime;
    const offset = (totalTime - passedTime) * offsetStep;
    return { stroke, offset };
  }
}


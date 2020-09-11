import View from '../abstract';
import logo from '../common/logo';

export default class FailView extends View {
  constructor(screenData) {
    super();
    this.title = screenData.title;
    this.content = screenData.content;
  }

  get template() {
    return `
    <section class="main main--result">
      ${logo()}
      <h2 class="title">${this.title}</h2>
      <div class="main-stat">${this.content}</div>
      <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
    </section>`;
  }

  bind() {
    this.logotype = this.element.querySelector(`.logo`);
    this.retryText = this.element.querySelector(`.main-replay`);
    this.logotype.addEventListener(`click`, this.onReplay);
    this.retryText.addEventListener(`click`, this.onReplay);
  }

  onReplay() {}
}

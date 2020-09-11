import router from '../main';
import View from '../abstract';
import logo from '../common/logo';

export default class WelcomeView extends View {
  constructor(screenData) {
    super();
    this.title = screenData.title;
    this.content = screenData.content;
  }

  get template() {
    return `
    <section class="main main--welcome">
      ${logo()}
      <button class="main-play">Начать игру</button>
      <h2 class="title main-title">${this.title}</h2>
      <p class="text main-text">
        ${this.content}
      </p>
    </section>`;
  }

  bind() {
    this.playButton = this.element.querySelector(`.main-play`);
    this.playButton.addEventListener(`click`, () => this.onPlayClick());
    this.logotype = this.element.querySelector(`.logo`);
    this.logotype.addEventListener(`click`, router.showWelcome);
  }

  onPlayClick() {}
}

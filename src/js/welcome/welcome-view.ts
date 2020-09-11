import { SomeObj } from '../interfaces/index';
import router from '../main';
import View from '../abstract';
import logo from '../common/logo';

export default class WelcomeView extends View {
  title: string
  content: string
  playButton!: Element | null
  logotype!: Element | null

  constructor(screenData: SomeObj) {
    super();
    this.title = screenData.title;
    this.content = screenData.content;
  }

  get template(): string {
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

  bind(): void {
    this.playButton = this.element?.querySelector(`.main-play`);
    this.playButton?.addEventListener(`click`, () => this.onPlayClick());
    this.logotype = this.element?.querySelector(`.logo`);
    this.logotype?.addEventListener(`click`, router.showWelcome);
  }

  onPlayClick(): void { }
}

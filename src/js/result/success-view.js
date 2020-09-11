import View from '../abstract';
import logo from '../common/logo';
import {declension} from '../utils';

export default class SuccessView extends View {
  constructor(screenData) {
    super();
    this.title = screenData.title;
    this.scores = screenData.scores;
    this.mistakes = screenData.mistakes;
    this.place = screenData.place;
    this.players = screenData.players;
    this.percentage = screenData.percentage;
    this.getStatisticData(screenData.timer);
  }

  get template() {
    return `
    <section class="main main--result">
      ${logo()}
      <h2 class="title">${this.title}</h2>
      <div class="main-stat">За&nbsp;${this.minNumber}&nbsp;${this.minText} и ${this.secNumber}&nbsp;${this.secText}
        <br>вы&nbsp;набрали ${this.scores} ${this.ball}
        <br>совершив ${this.mistakes} ${this.oshibok}</div>
      <span class="main-comparison">Вы заняли ${this.place} место из ${this.players}. 
        Это&nbsp;лучше чем у&nbsp;${this.percentage}%&nbsp;игроков</span>
      <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
    </section>`;
  }

  getStatisticData(passedTime) {
    this.minNumber = Math.trunc((passedTime) / 60);
    this.secNumber = (passedTime) % 60;
    this.minText = declension(this.minNumber, [`минуту`, `минуты`, `минут`]);
    this.secText = declension((passedTime) % 60, [`секунду`, `секунды`, `секунд`]);
    this.ball = declension(this.scores, [`балл`, `балла`, `баллов`]);
    this.oshibok = declension(this.mistakes, [`ошибку`, `ошибки`, `ошибок`]);
  }

  bind() {
    this.logotype = this.element.querySelector(`.logo`);
    this.retryText = this.element.querySelector(`.main-replay`);
    this.logotype.addEventListener(`click`, this.onReplay);
    this.retryText.addEventListener(`click`, this.onReplay);
  }

  onReplay() {}
}

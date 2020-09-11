import { SomeObj } from '../interfaces/index';
import View from '../abstract';
import mistakes from '../common/module-mistake';
import audio from '../common/audio';


export default class ViewLevelArtist extends View {
  title: string
  songs: Array<{ [key: string]: any }>
  trueSong: SomeObj
  lives: number
  form!: Element | null
  playerWrapper!: Element | null
  playerDivs!: NodeListOf<HTMLElement> | null
  allPlayButtons!: NodeListOf<Element> | null
  currentTime!: number
  _playingSong!: SomeObj | null

  constructor(screenData: SomeObj) {
    super();
    this.title = screenData.title;
    this.songs = screenData.answers;
    this.trueSong = screenData.trueSong;
    this.lives = screenData.lives;
  }

  get template(): string {
    return `
    <section class="main main--level main--level-artist">
      ${mistakes(this.lives)}
      <div class="main-wrap">
        <h2 class="title main-title">${this.title}</h2>
        <div class="player-wrapper">${audio(this.trueSong)}</div>
        <form class="main-list">
          ${this.songs.map((song) => this._templateAnswer(song)).join(``)}
        </form>
      </div>
    </section>`;
  }

  private _templateAnswer(song: SomeObj): string {
    return `
    <div class="main-answer-wrapper">
      <input class="main-answer-r" type="radio" id="answer-${song.id}" name="answer" value="val-${song.value}" />
      <label class="main-answer" for="answer-${song.id}">
        <img class="main-answer-preview" src="${song.img}" alt="${song.artist}" width="134" height="134">
        ${song.artist}
      </label>
    </div>`;
  }

  checkValidAnswer(evt: SomeObj): boolean | void {
    if (evt.target.classList.contains(`main-answer-r`)) {
      const selectedSong = this.songs.find((el) => evt.target.id.endsWith(el.id))!;
      return selectedSong.isCorrect ? true : false;
    }
  }

  bind(): void {
    this.form = this.element?.querySelector(`.main-list`);
    this.playerWrapper = this.element?.querySelector(`.player-wrapper`);
    this.playerDivs = this.element?.querySelectorAll(`.player`);
    this.allPlayButtons = this.element?.querySelectorAll(`.player-control`);
    this.form?.addEventListener(`click`, (evt: SomeObj) => this.onAnswer(evt));
    this.playerWrapper?.addEventListener(`click`, (evt: SomeObj) => this.onPlay(evt));
  }

  onAnswer(evt: SomeObj): void { }
  onPlay(evt: SomeObj): void { }
}


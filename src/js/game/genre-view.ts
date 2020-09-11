import { SomeObj } from '../interfaces/index';
import View from '../abstract';
import mistakes from '../common/module-mistake';
import audio from '../common/audio';


export default class ViewLevelGenre extends View {
  title: string
  songs: Array<{ [key: string]: any }>
  genre: string
  lives: number
  form!: Element | null
  playerDivs!: NodeListOf<HTMLElement> | null
  allPlayButtons!: NodeListOf<Element> | null
  musicNotes!: NodeListOf<Element> | null
  answerButton!: HTMLElement | null
  currentTime!: number
  _playingSong!: SomeObj | null

  constructor(screenData: SomeObj) {
    super();
    this.title = screenData.title;
    this.songs = screenData.answers;
    this.genre = screenData.genre;
    this.lives = screenData.lives;
  }

  get template(): string {
    return `
    <section class="main main--level main--level-genre">
      ${mistakes(this.lives)}
      <div class="main-wrap">
        <h2 class="title">${this.title}</h2>
        <form class="genre">
          ${this.songs.map((song) => this._templateAnswer(song)).join(``)}
          <button class="genre-answer-send" type="submit" disabled>Ответить</button>
        </form>
      </div>
    </section>`;
  }

  _templateAnswer(song: SomeObj): string {
    return `
    <div class="genre-answer">
      <div class="player-wrapper">
        ${audio(song)}
      </div>
      <input type="checkbox" name="answer" value="answer-${song.value}" id="a-${song.id}">
      <label class="genre-answer-check" for="a-${song.id}"></label>
    </div>`;
  }

  checkValidAnswer(evt: SomeObj): boolean {
    evt.preventDefault();
    const checkedSongs = [...this.musicNotes].filter((it: SomeObj) => it.checked);
    const genredSongs = this.songs.filter((song) => song.genre === this.genre);
    const selectedSongs = this.songs
      .filter((song) => checkedSongs
        .some((it: SomeObj) => it.value.endsWith(song.value)));
    if (genredSongs.length !== selectedSongs.length) return false;

    const isAllSongsTrue = genredSongs
      .every((genredS) => selectedSongs
        .some((selectedS) => selectedS === genredS));
    return isAllSongsTrue;
  }

  onCheck(target: SomeObj): void {
    if (target.type === `checkbox` && target.name === `answer`) {
      const isSelectedNote = [...this.musicNotes].some((it: SomeObj) => it.checked);
      this.answerButton.disabled = isSelectedNote ? false : true;
    }
  }

  bind(): void {
    this.form = this.element?.querySelector(`.genre`);
    this.playerDivs = this.element?.querySelectorAll(`.player`);
    this.allPlayButtons = this.element?.querySelectorAll(`.player-control`);
    this.musicNotes = this.element?.querySelectorAll(`.genre input[name="answer"]`);
    this.answerButton = this.element?.querySelector(`button.genre-answer-send`);

    this.form?.addEventListener(`click`, (evt: SomeObj) => this.onCheck(evt.target));
    this.form?.addEventListener(`click`, (evt: SomeObj) => this.onPlay(evt));
    this.answerButton?.addEventListener(`click`, (evt: SomeObj) => this.onAnswer(evt));
  }

  onPlay(evt: SomeObj): void { }
  onAnswer(evt: SomeObj): void { }
}


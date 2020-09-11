import View from '../abstract';
import mistakes from '../common/module-mistake';
import audio from "../common/audio";


export default class ViewLevelGenre extends View {
  constructor(screenData) {
    super();
    this.title = screenData.title;
    this.songs = screenData.answers;
    this.genre = screenData.genre;
    this.lives = screenData.lives;
  }

  get template() {
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

  _templateAnswer(song) {
    return `
    <div class="genre-answer">
      <div class="player-wrapper">
        ${audio(song)}
      </div>
      <input type="checkbox" name="answer" value="answer-${song.value}" id="a-${song.id}">
      <label class="genre-answer-check" for="a-${song.id}"></label>
    </div>`;
  }

  checkValidAnswer(evt) {
    evt.preventDefault();
    let checkedSongs = [...this.musicNotes].filter((it) => it.checked);
    let genredSongs = this.songs.filter((song) => song.genre === this.genre);
    let selectedSongs = this.songs
      .filter((song) => checkedSongs
      .some((it) => it.value.endsWith(song.value)));
    if (genredSongs.length !== selectedSongs.length) return false;

    let isAllSongsTrue = genredSongs
      .every((genredS) => selectedSongs
      .some((selectedS) => selectedS === genredS));
    return isAllSongsTrue;
  }

  onCheck(target) {
    if (target.type === `checkbox` && target.name === `answer`) {
      let isSelectedNote = [...this.musicNotes].some((it) => it.checked);
      this.answerButton.disabled = isSelectedNote ? false : true;
    }
  }

  bind() {
    this.form = this.element.querySelector(`.genre`);
    this.playerDivs = this.element.querySelectorAll(`.player`);
    this.allPlayButtons = this.element.querySelectorAll(`.player-control`);
    this.musicNotes = this.element.querySelectorAll(`.genre input[name="answer"]`);
    this.answerButton = this.element.querySelector(`button.genre-answer-send`);

    this.form.addEventListener(`click`, (evt) => this.onCheck(evt.target));
    this.form.addEventListener(`click`, (evt) => this.onPlay(evt));
    this.answerButton.addEventListener(`click`, (evt) => this.onAnswer(evt));
  }

  onPlay() {}
  onAnswer() {}
}

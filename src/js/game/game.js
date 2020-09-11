import router from '../main';
import Result from '../result/result';
import GameModel from './game-model';
import ArtistView from './artist-view';
import GenreView from './genre-view';
import Timer from '../common/timer';
import statistics from '../data/game-statistics';
import {showBlock} from '../utils';


class GamePresenter {
  constructor(data) {
    this.timer = new Timer(this.model);
    this.data = data;
    this.view = ``;
  }

  get model() {
    if (!this._model) {
      this._model = new GameModel();
      statistics.reset();
    }
    return this._model;
  }

  init() {
    let mst = this.model.state;

    if (mst.lives < 1 && mst.questions - mst.currentQuestion !== 0) {
      this.timer.clearTimer();
      return new Result().init(`failTries`);
    }

    if (mst.currentQuestion >= mst.questions) {
      statistics.pushState(mst);
      this.timer.clearTimer();
      return router.showResult(statistics);
    }

    this.model.nextQuestion();
    this.view = this._generateLevel();
    this.view.onPlay = this.onPlay.bind(this);
    this.view.onAnswer = this.onAnswer.bind(this);
    this.view.currentTime = mst.timer;

    showBlock(this.view.element);
    if (!this.timer.intervalId) this.timer.init();
  }

  onAnswer(evt) {
    let isAnswerTrue = this.view.checkValidAnswer(evt);
    if (typeof isAnswerTrue === `undefined`) return;
    statistics.pushAnswer(isAnswerTrue, this.view.currentTime - this.model.state.timer);
    this.model.setLives(isAnswerTrue);
    this.init();
  }

  onPlay(evt) {
    let cls = evt.target.classList;
    if (cls.contains(`player`) || cls.contains(`player-control`)) {
      evt.preventDefault();

      let clickedDiv = [...this.view.playerDivs].find((div) => div.contains(evt.target));
      let song = this._getSongObject(clickedDiv);

      if (this.view._playingSong && this.view._playingSong.audio !== song.audio) { // останавливаем песню
        this.view._playingSong.onEnded();
      }

      song.audio.volume = 0.2;
      song.pauseOrPlay();

      song.audio.addEventListener(`ended`, () => song.onEnded());
      this.view._playingSong = !song.audio.paused ? song : null; // записываем играющую песню
    }
  }

  _generateLevel() {
    let questionNumber = this.model.state.currentQuestion - 1;
    let screenData = this.data[questionNumber];
    // console.log(screenData.answers.map((el) => el.genre));

    let ScreenView;
    if (screenData.type === `genre`) ScreenView = GenreView;
    if (screenData.type === `artist`) ScreenView = ArtistView;

    return this.model.getSomeScreen(ScreenView, screenData);
  }

  _getSongObject(div) {
    let that = this;
    return {
      audio: div.querySelector(`audio`),
      playButton: div.querySelector(`.player-control`),
      pauseOrPlay() {
        this.playButton.classList.contains(`player-control--pause`) ? this.audio.pause() : this.audio.play();
        this.playButton.classList.toggle(`player-control--play`);
        this.playButton.classList.toggle(`player-control--pause`);
      },
      onEnded() {
        this.audio.pause();
        this.playButton.classList.add(`player-control--play`);
        this.playButton.classList.remove(`player-control--pause`);
        that.view._playingSong = null;
      }
    };
  }

}

export default GamePresenter;

import {initialState} from '../data/game-data';


export default class GameModel {
  constructor() {
    this._state = {};
    this.reset();
  }

  get state() {
    return this._state;
  }

  nextQuestion() {
    return ++this.state.currentQuestion;
  }

  tick() {
    return --this.state.timer;
  }

  setLives(answer) {
    answer === false ? this.state.lives-- : void 0;
    return this.state.lives;
  }

  reset() {
    return Object.assign(this.state, initialState.clon());
  }

  getSomeScreen(ScreenView, data) {
    data.lives = this.state.lives;
    return new ScreenView(data);
  }
}

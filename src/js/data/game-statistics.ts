import { SomeObj } from '../interfaces/index';
import { initialState } from './game-data';

class GameStatistics {
  private readonly _initialStatistic: SomeObj
  private readonly _POINT: SomeObj
  private _stat: SomeObj
  private _allPlayersStatistic: Array<number>

  constructor() {
    this._initialStatistic = Object.freeze({
      statisticAnswers: [],
    });
    this._POINT = {
      FAST_ANSWER: 10, // sec
      MAX_VALUE: 2,
      MIN_VALUE: 1,
      MISTAKE_VALUE: -2
    };
    this._stat = {};
    this._allPlayersStatistic = [];
  }

  get now() {
    return this._stat;
  }

  set usersStat(data: Array<number>) {
    this._allPlayersStatistic = data;
    this._countStats();
  }

  pushAnswer(answer: boolean, time: number) {
    this.now.statisticAnswers.push({ answer, time });
  }

  pushState(state: SomeObj) {
    ({ timer: this.now.timer, lives: this.now.lives } = state);
    ({ questions: this.now.questions, currentQuestion: this.now.currentQuestion } = state);
    this.now.timer = initialState.timer - this.now.timer;
    this.now.date = new Date().getTime();
    this.now.scores = this._countScores();
  }

  reset() {
    const newStat = this._initialStatistic.clon();
    return Object.assign(this.now, newStat);
  }

  protected _countStats() {
    const s = this._stat;

    const sortedArray = this._allPlayersStatistic.slice();
    const localScores = (`scores` in this.now) ? this.now.scores : this._countScores();
    sortedArray.push(localScores);
    sortedArray.sort((left, right) => left - right);

    const sortedSet = Array.from(new Set(sortedArray));
    const index = [...sortedSet].findIndex((el) => el === localScores);

    s.scores = localScores;
    s.mistakes = initialState.lives - s.lives;
    s.place = sortedSet.length - index;
    s.players = sortedArray.length;
    s.percentage = Math.trunc(index / sortedSet.length * 100);
    return s;
  }

  protected _countScores() {
    let scores = this.now.statisticAnswers.reduce((acc: number, el: SomeObj) => {
      acc += el.answer
        ? (el.time < this._POINT.FAST_ANSWER ? this._POINT.MAX_VALUE : this._POINT.MIN_VALUE)
        : this._POINT.MISTAKE_VALUE;
      return acc;
    }, 0);
    scores = scores < 0 ? 0 : scores; // если очков меньше нуля, ставим ноль
    return scores;
  }
}

const statistics = new GameStatistics();
export default statistics;


import {initialState} from './game-data';

class GameStatistics {
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
    this.allPlayersStatistic = [];
  }

  get now() {
    return this._stat;
  }

  set usersStat(data) {
    this.allPlayersStatistic = data;
    this._countStats();
  }

  pushAnswer(answer, time) {
    this.now.statisticAnswers.push({answer, time});
  }

  pushState(state) {
    ({timer: this.now.timer, lives: this.now.lives} = state);
    ({questions: this.now.questions, currentQuestion: this.now.currentQuestion} = state);
    this.now.timer = initialState.timer - this.now.timer;
    this.now.date = new Date().getTime();
    this.now.scores = this._countScores();
  }

  reset() {
    let newStat = this._initialStatistic.clon();
    return Object.assign(this.now, newStat);
  }

  _countStats() {
    let s = this._stat;

    let sortedArray = this.allPlayersStatistic.slice();
    let localScores = (`scores` in this.now) ? this.now.scores : this._countScores();
    sortedArray.push(localScores);
    sortedArray.sort((left, right) => left - right);

    let sortedSet = Array.from(new Set(sortedArray));
    let index = [...sortedSet].findIndex((el) => el === localScores);

    s.scores = localScores;
    s.mistakes = initialState.lives - s.lives;
    s.place = sortedSet.length - index;
    s.players = sortedArray.length;
    s.percentage = Math.trunc(index / sortedSet.length * 100);
    return s;
  }

  _countScores() {
    let scores = this.now.statisticAnswers.reduce((acc, el) => {
      acc += el.answer
        ? (el.time < this._POINT.FAST_ANSWER ? this._POINT.MAX_VALUE : this._POINT.MIN_VALUE)
        : this._POINT.MISTAKE_VALUE;
      return acc;
    }, 0);
    scores = scores < 0 ? 0 : scores; // если очков меньше нуля, ставим ноль
    return scores;
  }
}

let statistics = new GameStatistics();
export default statistics;

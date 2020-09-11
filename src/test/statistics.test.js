import '../js/abstract';
import {assert} from 'chai';
import statistics from '../js/data/game-statistics';


describe(`Check Statistics class`, () => {
  statistics.allPlayersStatistic = [3, 5, 8, 9, 11]

  it(`should return empty array in "statisticAnswers", if gameState reseted`, () => {
    statistics._stat = {
      statisticAnswers: [{answer: false, time: 5}, {answer: true, time: 11},]
    }
    statistics.reset()
    assert.deepStrictEqual(statistics._initialStatistic, statistics.now);
  });

  it(`should thruly count statistics with positive scores`, () => {
    statistics._stat = {
      currentQuestion: 8,
      lives: 2,
      questions: 8,
      timer: 78,
      statisticAnswers: [
          {answer: true, time: 3}, {answer: true, time: 17},
          {answer: true, time: 3}, {answer: true, time: 3},
          {answer: true, time: 2}, {answer: true, time: 4},
          {answer: true, time: 2}, {answer: false, time: 8},
      ]
    }
  
    let ended = Object.assign({}, JSON.parse(JSON.stringify(statistics._stat)))
    ended.scores = 11;
    ended.mistakes = 1;
    ended.percentage = 80;
    ended.place = 1;
    ended.players = 6;

    assert.deepStrictEqual(ended, statistics._countStats());
  });

  it(`should thruly count statistics with negative scores`, () => {
    statistics._stat = {
      currentQuestion: 4,
      lives: 0,
      questions: 4,
      timer: 92,
      statisticAnswers: [
        {answer: true, time: 15}, {answer: false, time: 4},
        {answer: false, time: 4}, {answer: false, time: 5}
      ]
    }
  
    let ended = Object.assign({}, JSON.parse(JSON.stringify(statistics._stat)))
    ended.scores = 0;
    ended.mistakes = 3;
    ended.percentage = 0;
    ended.place = 6;
    ended.players = 6;

    assert.deepStrictEqual(ended, statistics._countStats());
  });
});
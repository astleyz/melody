import {assert} from 'chai';

// Функция _paintSvgDash из класса TimerPresenter "src/js/common/timer" 
// Перенесена сюда т.к chai не работает с DOM
function getSvgDash(totalTime, passedTime, radius) {
  let stroke = 2 * Math.PI * radius;
  let offsetStep = stroke / totalTime;
  let offset = (totalTime - passedTime) * offsetStep;
  return {stroke, offset};
}

describe(`Check svg animation with different parameters _paintSvgDash()`, () => {

  it(`should return full length and 0 in dashoffset`, () => {
    let fullTime = 150; let passedTime = 150; let radius = 88;
    assert.equal(553, Math.ceil(getSvgDash(fullTime, passedTime, radius).stroke));
    assert.equal(0, Math.ceil(getSvgDash(fullTime, passedTime, radius).offset));
  });

  it(`should return full length and 281 in dashoffset`, () => {
    let fullTime = 150; let passedTime = 74; let radius = 88;
    assert.equal(553, Math.ceil(getSvgDash(fullTime, passedTime, radius).stroke));
    assert.equal(281, Math.ceil(getSvgDash(fullTime, passedTime, radius).offset));
  });

  it(`should return full length and 4 in dashoffset`, () => {
    let fullTime = 150; let passedTime = 149; let radius = 88;
    assert.equal(553, Math.ceil(getSvgDash(fullTime, passedTime, radius).stroke));
    assert.equal(4, Math.ceil(getSvgDash(fullTime, passedTime, radius).offset));
  });

});


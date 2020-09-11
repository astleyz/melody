const gameData = Object.freeze({
  welcome: {
    title: `Правила игры`,
    content: `Правила просты&nbsp;— за&nbsp;2 минуты ответить на все вопросы.<br>Ошибиться можно 3 раза.<br>Удачи!`,
  },
  resultWin: {
    title: `Вы настоящий меломан!`
  },
  failTime: {
    title: `Увы и ах!`,
    content: `Время вышло!<br>Вы не успели отгадать все мелодии`
  },
  failTries: {
    title: `Какая жалость!`,
    content: `У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!`
  }
});


const initialState = Object.freeze({
  questions: 10,
  currentQuestion: 0,
  timer: 120,
  lives: 3
});


export {gameData as default, initialState};

// Заменяет игровые экраны , не игровые аппендит в пустой .main
const showBlock = (section: HTMLElement): Element | void => {
  const main: Element = document.querySelector(`.app .main`)!;

  if (section.classList.contains(`main--level`)) {
    const replacingChild = main.querySelector(`section[class*="main--"]:last-of-type`);
    if (replacingChild) return main.replaceChild(section, replacingChild);
  }

  main.innerHTML = ``;
  main.appendChild(section);
};


/**
 * Склонение слов в правильную форму, например 1 минута, 2 минуты, 5 минут
 * Принимает число, и массив из трех форм ['минута', 'минуты', 'минут']
 * @param {number} n
 * @param {Array} textForms
 * @return {string}
 * @example wordDeclension(5, ['минута', 'минуты', 'минут']) => 'минут'
 */
const wordDeclension = (n: number, textForms: [string, string, string]): string => {
  n = Math.abs(n) % 100; const n1 = n % 10;
  if (n > 10 && n < 20) return textForms[2];
  if (n1 > 1 && n1 < 5) return textForms[1];
  if (n1 === 1) return textForms[0];
  return textForms[2];
};

export { showBlock, wordDeclension as declension };

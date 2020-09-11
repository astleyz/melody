export default (sum) => `
<div class="main-mistakes">
  ${new Array(sum).fill(``).map(() =>`
  <img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`).join(``)}
</div>`;

import Welcome from './welcome/welcome';
import Game from './game/game';
import Result from './result/result';
import {Loader} from './abstract';
import Spinner from './common/spinner';
import gameAdapter from './data/game-adapter';


/** @enum {string} */
const Url = {
  WELCOME: ``,
  GAME: `game`,
  STATS: `stats`,
};


export default class Router {
  constructor() {
    this.spinner = new Spinner(`body`);
    this.getDataFromServer();
  }

  async getDataFromServer() {
    try {
      this.spinner.show();
      let adaptedData = await Loader.loadData(gameAdapter);
      this.data = adaptedData;
      this.init();
    } catch (e) {
      this.showError();
    } finally {
      this.spinner.remove();
    }
  }

  showWelcome() {
    location.hash = Url.WELCOME;
  }

  showGame() {
    location.hash = Url.GAME;
  }

  showResult(statistics) {
    let {timer, scores, lives, date} = statistics.now;
    let dataToSend = {timer, scores, lives, date};

    (async () => {
      try {
        this.spinner.show();
        await Loader.saveResults(dataToSend, gameAdapter);
        let allUsersResults = await Loader.loadResults();
        statistics.usersStat = allUsersResults;

        let {mistakes, place, players, percentage} = statistics.now;
        let necessaryData = {timer, scores, mistakes, place, players, percentage};
        let enc = btoa(JSON.stringify(necessaryData));
        location.hash = `${Url.STATS}?=${enc}`;
      } catch (e) {
        this.showError();
      } finally {
        this.spinner.remove();
      }
    })();
  }

  showError() {
    let errorBox = document.createElement(`div`);
    errorBox.classList.add(`error-box`);
    errorBox.textContent = `Эй, кажеться произошла ошибка, повтори попытку позже`;
    this.spinner.remove();
    document.body.appendChild(errorBox);
  }

  init() {
    this.changePresenter(this.getIDFromHash(location.hash));
    window.onhashchange = () => this.changePresenter(this.getIDFromHash(location.hash));
  }

  getIDFromHash(hash) {
    return hash.replace(`#`, ``);
  }

  changePresenter(route = ``) {
    let routes = {
      [Url.WELCOME]: new Welcome(),
      [Url.GAME]: new Game(this.data),
    };

    if (typeof routes[route] === `undefined`) {
      let enc = route.split(`stats?=`);
      if (enc.length === 2) {
        let dec = JSON.parse(atob(enc[1]));
        return new Result(dec).init();
      }
      route = ``;
    }

    return routes[route].init();
  }
}

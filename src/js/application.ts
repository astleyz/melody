import { ServerData, SomeObj } from './interfaces/index';
import Welcome from './welcome/welcome';
import Game from './game/game';
import Result from './result/result';
import { Loader } from './abstract';
import Spinner from './common/spinner';
import gameAdapter from './data/game-adapter';


const enum Url {
  WELCOME = ``,
  GAME = `game`,
  STATS = `stats`,
}

export default class Router {

  data!: ServerData
  spinner: Spinner

  constructor() {
    this.spinner = new Spinner(`body`);
    this.getDataFromServer();
  }

  async getDataFromServer(): Promise<void> {
    try {
      this.spinner.show();
      const adaptedData = await Loader.loadData(gameAdapter);
      this.data = adaptedData;
      this.init();
    } catch (e) {
      this.showError();
    } finally {
      this.spinner.remove();
    }
  }

  showWelcome(): void {
    location.hash = Url.WELCOME;
  }

  showGame(): void {
    location.hash = Url.GAME;
  }

  showResult(statistics: SomeObj): void {
    const { timer, scores, lives, date } = statistics.now;
    const dataToSend = { timer, scores, lives, date };

    (async () => {
      try {
        this.spinner.show();
        await Loader.saveResults(dataToSend, gameAdapter);
        const allUsersResults = await Loader.loadResults();
        statistics.usersStat = allUsersResults;

        const { mistakes, place, players, percentage } = statistics.now;
        const necessaryData = { timer, scores, mistakes, place, players, percentage };
        const enc = btoa(JSON.stringify(necessaryData));
        location.hash = `${Url.STATS}?=${enc}`;
      } catch (e) {
        this.showError();
      } finally {
        this.spinner.remove();
      }
    })();
  }

  showError(): void {
    const errorBox = document.createElement(`div`);
    errorBox.classList.add(`error-box`);
    errorBox.textContent = `Эй, кажеться произошла ошибка, повтори попытку позже`;
    this.spinner.remove();
    document.body.appendChild(errorBox);
  }

  init(): void {
    this.changePresenter(this.getIDFromHash(location.hash));
    window.onhashchange = () => this.changePresenter(this.getIDFromHash(location.hash));
  }

  getIDFromHash(hash: string): string {
    return hash.replace(`#`, ``);
  }

  changePresenter(route: string = Url.WELCOME): void {
    const routes: SomeObj = {
      [Url.WELCOME]: new Welcome(),
      [Url.GAME]: new Game(this.data),
    };

    if (typeof routes[route] === `undefined`) {
      const enc = route.split(`stats?=`);
      if (enc.length === 2) {
        const dec = JSON.parse(atob(enc[1]));
        return new Result(dec).init();
      }
      route = Url.WELCOME;
    }

    return routes[route].init();
  }
}


import { SomeObj } from '../interfaces/index';
import router from '../main';
import WelcomeView from './welcome-view';
import gameData from '../data/game-data';
import { showBlock } from '../utils';


export default class WelcomePresenter {
  view: SomeObj

  constructor() {
    const screenData = gameData.welcome.clon();
    this.view = new WelcomeView(screenData);
  }

  init(): void {
    this.view.onPlayClick = this.onPlayClick;
    showBlock(this.view.element);
  }

  onPlayClick(): void {
    router.showGame();
  }
}


import { SomeObj } from '../interfaces/index';
import router from '../main';
import FailView from './fail-view';
import SuccessView from './success-view';
import gameData from '../data/game-data';
import { showBlock } from '../utils';

class ResultPresenter {
  view!: SomeObj

  constructor(screenData?: SomeObj) {
    if (screenData) {
      const data = { ...gameData.resultWin, ...screenData };
      this.view = new SuccessView(data);
    }
  }

  init(screen?: 'failTime' | 'failTries'): void {
    this.view = screen ? this._getView(screen) : this.view;
    this.view.onReplay = this.onReplay;
    showBlock(this.view.element);
  }

  onReplay(): void {
    router.showWelcome();
  }

  private _getView(screen: 'failTries' | 'failTime'): SomeObj {
    return new FailView(gameData[screen]);
  }
}

export default ResultPresenter;



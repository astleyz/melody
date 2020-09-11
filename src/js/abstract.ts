import { ServerData, SomeObj } from './interfaces/index';

abstract class AbstractView {
  abstract get template(): string
  private _element!: HTMLElement

  get element(): HTMLElement {
    if (this._element) return this._element;

    this._element = this.render();
    this.bind();
    return this._element;
  }

  bind(): void { }

  render(): any {
    const div = document.createElement(`div`);
    div.innerHTML = this.template.trim();
    return div.firstChild;
  }
}

abstract class DefaultAdapter {
  preprocess(data: ServerData): ServerData {
    return data;
  }
  toServer(data: [] | Record<string, unknown>): string {
    return data.toString();
  }
}
const defaultAdapter = new class extends DefaultAdapter { }();


class Loader {
  static get GET_URL(): string {
    return `https://raw.githubusercontent.com/astleyz/guess-melody/master/src/js/data`;
  }

  static get POST_URL(): string {
    return `https://jsonplaceholder.typicode.com/posts`;
  }

  static get DEFAULT_NAME(): string {
    return `Pablo`;
  }

  static get APP_ID(): string {
    return `48521885`;
  }

  static async loadData(adapter: DefaultAdapter = defaultAdapter): Promise<ServerData> {
    const response = await fetch(`${this.GET_URL}/server-questions.json`);
    const responseData = await response.json();
    return adapter.preprocess(responseData);
  }

  static async loadResults(): Promise<Array<number>> {
    const results = await fetch(`${this.GET_URL}/server-results.json`);
    return await results.json();
  }

  static async saveResults(data: SomeObj, adapter = defaultAdapter): Promise<any> {
    data.appid = this.APP_ID;
    data.name = this.DEFAULT_NAME;

    const requestSettings = {
      body: adapter.toServer(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    const response = await fetch(this.POST_URL, requestSettings);
    return this.checkStatus(response);
  }


  static checkStatus(resp: SomeObj): SomeObj | never {
    if (resp.status >= 200 && resp.status < 300) {
      return resp;
    }
    throw new Error(`${resp.status}: ${resp.statusText}`);
  }
}

Object.prototype.clon = function () {
  return JSON.parse(JSON.stringify(this));
};

export { AbstractView as default, DefaultAdapter, Loader };


class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`Forbidden to inherit from this class. Only for extended classes`);
    }
  }

  get template() {
    throw new Error(`Need template`);
  }

  get element() {
    if (!this._element) {
      this._element = this.render();
      this.bind();
    }
    return this._element;
  }

  bind() {}

  render() {
    let div = document.createElement(`div`);
    div.innerHTML = this.template.trim();
    return div.firstChild;
  }
}


class DefaultAdapter {
  constructor() {
    if (new.target === `DefaultAdapter`) throw new Error(`abstract adapter!`);
  }
  preprocess(data) {
    return data;
  }
  toServer(data) {
    return data;
  }
}
const defaultAdapter = new class extends DefaultAdapter {}();


class Loader {
  static get GET_URL() {
    return `https://raw.githubusercontent.com/astleyz/melody/master/src/js/data`;
  }

  static get POST_URL() {
    return `https://jsonplaceholder.typicode.com/posts`;
  }

  static get DEFAULT_NAME() {
    return `Pablo`;
  }

  static get APP_ID() {
    return `48521885`;
  }

  static async loadData(adapter = defaultAdapter) {
    let response = await fetch(`${this.GET_URL}/server-questions.json`);
    let responseData = await response.json();
    return adapter.preprocess(responseData);
  }

  static async loadResults() {
    let results = await fetch(`${this.GET_URL}/server-results.json`);
    return await results.json();
  }

  static async saveResults(data, adapter = defaultAdapter) {
    data.appid = this.APP_ID;
    data.name = this.DEFAULT_NAME;

    const requestSettings = {
      body: adapter.toServer(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    let response = await fetch(this.POST_URL, requestSettings);
    return this.checkStatus(response);
  }

  static checkStatus(resp) {
    if (resp.status >= 200 && resp.status < 300) return resp;
    throw new Error(`${resp.status}: ${resp.statusText}`);
  }
}

Object.prototype.clon = function () {
  return JSON.parse(JSON.stringify(this));
};


export {AbstractView as default, DefaultAdapter, Loader};

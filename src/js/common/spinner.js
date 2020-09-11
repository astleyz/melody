import View from '../abstract';

export default class Spinner extends View {

  /**
  * @param {string} container - название класса или тега, в нем появиться прелоадер
  * @example - "body div.container"
  */

  constructor(container) {
    super();
    this.container = container;
  }

  get template() {
    return `
    <div class="preloader-box">
      <div class="backdrop">
        <div class="spinner"></div>
        <div class="spinner-logo">loading...</div>
      </div>

      <style>
        .preloader-box {
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 100;
          background-color: rgba(20, 21, 26, 0.6); 
        }

        .backdrop {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        }

        .spinner {
          position: absolute;
          top: calc(50% - 12.5px);
          left: calc(50% - 12.5px);
          width: 25px;
          height: 25px;
          border-top: 8px solid aliceblue;
          border-right: 8px solid aliceblue;
          border-bottom: 8px solid aliceblue;
          border-left: 8px solid #8c618d;
          border: 8px solid rgba(211,211,211, 0.5);
          border-radius: 50%;
          animation-name: spin;
          animation-duration: 3s;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        }
        
        @keyframes spin {
          0% {
            transform: rotate(0deg);
            border-left:8px solid deeppink;
          }
          
          25%{
            transform: rotate(360deg);
            border-left:8px solid gold;
          }
          
          50%{
            transform:rotate(720deg);
            border-left:8px solid palegreen;
          }
          
          75%{
            transform: rotate(1080deg);
            border-left:8px solid aqua;
          }
        
          100% {
            transform: rotate(1440deg);
            border-left:8px solid deeppink;
          }
        }
        
        .spinner-logo {
          position:absolute;
          top:calc(50% + 35px);
          left:calc(50% - 25px);
          font-family:sans-serif;
          color: white;
          letter-spacing:0.1em;
        }

        .container-temp {
          position: relative;
          padding: 0;
        }
      </style>
    </div>`;
  }

  show() {
    this.containerBox = document.querySelector(this.container);
    this.containerBox.classList.add(`container-temp`);
    this.containerBox.appendChild(this.element);
  }

  remove() {
    this.containerBox.classList.remove(`container-temp`);
    this.containerBox.querySelector(`.preloader-box`).remove();
  }
}


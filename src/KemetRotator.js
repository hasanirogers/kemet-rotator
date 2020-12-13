import { html, css, LitElement } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

export class KemetRotator extends LitElement {
  static get styles() {
    return css`
      :host {
        display: inline-flex;
      }

      .rotator {
        display: inline-flex;
        flex-wrap: nowrap;
        flex-direction: row;
      }

      .rotator__slide {
        width: 100%;
        flex: none;
        opacity: 0;
        box-sizing: border-box;
      }

      .rotator__slide:not(:first-child) {
        margin-left: -100%; /* this is the bulk of the overlay trick */
      }

      .rotator__slide--active {
        opacity: 1;
      }

      /* flip effect */

      :host([effect="flip"]) .rotator {
        display: inline-block;
        position: relative;

        perspective: 500;
      }

      :host([effect="flip"]) .rotator__slide {
        position: absolute;
        top: -20px;
        left: 0;

        opacity: 0;

        transform: rotateX(90deg);
        transform-origin: 0% 0%;
      }

      :host([effect="flip"]) .rotator__slide--active {
        top: 0;
        opacity: 1;

        transform: rotateX(0deg);
      }
    `;
  }

  static get properties() {
    return {
      'index': {
        type: Number
      },
      'messages': {
        type: Array
      },
      'effect': {
        type: String,
        reflect: true,
      },
      'rotationSpeed': {
        type: Number,
        attribute: 'rotation-speed'
      },
      'transitionSpeed': {
        type: String,
        attribute: 'transition-speed'
      }
    };
  }

  constructor() {
    super();

    this.index = 0;
    this.messages = [];
    this.effect = 'fade';
    this.rotationSpeed = 3000;
    this.transitionSpeed = '500ms';
  }

  firstUpdated() {
    this.slides = this.shadowRoot.querySelectorAll('.rotator__slide');

    if (this.rotationSpeed > 0) {
      setInterval(() => { this.nextSlide() }, this.rotationSpeed * 1000);
    }
  }

  render() {
    return html`
      <span class="rotator">
        ${this.makeMessages()}
      </span>
    `;
  }

  makeMessages() {
    const styles = `transition: all ${this.transitionSpeed} ease;`;

    const messages = this.messages.map((message, index) => {
      return html`
        <span class="rotator__slide ${this.index === index ? 'rotator__slide--active' : ''}" style="${styles}">
          ${unsafeHTML(message)}
        </span>
      `;
    });

    return messages;
  }

  nextSlide() {
    if (this.index < this.messages.length - 1) {
      this.index += 1;
    } else {
      this.index = 0;
    }
  }
}

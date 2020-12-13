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
    `;
  }

  static get properties() {
    return {
      'messages': {
        type: Array
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

    this.messages = [];
    this.rotationSpeed = 3000;
    this.transitionSpeed = '500ms';
  }

  firstUpdated() {
    setInterval(() => { this.slideSwitch() }, this.rotationSpeed);
  }

  render() {
    return html`
      <span class="rotator">
        ${this.makeMessages()}
      </span>
    `;
  }

  makeMessages() {
    const styles = `transition: opacity ${this.transitionSpeed} ease;`;

    const messages = this.messages.map((message, index) => {
      if (index === 0) {
        return html`<span class="rotator__slide rotator__slide--active" style="${styles}">${unsafeHTML(message)}</span>`;
      }

      return html`<span class="rotator__slide" style="${styles}">${unsafeHTML(message)}</span>`;
    });

    return messages;
  }

  slideSwitch() {
    const activeSlide = this.shadowRoot.querySelector('.rotator__slide--active');
    const nextSlide = activeSlide.nextElementSibling ? activeSlide.nextElementSibling : this.shadowRoot.querySelector('.rotator__slide');

    nextSlide.classList.add('rotator__slide--active');
    activeSlide.classList.remove('rotator__slide--active');
  }
}

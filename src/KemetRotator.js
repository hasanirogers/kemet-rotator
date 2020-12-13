import { html, css, LitElement } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

export class KemetRotator extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
      }

      /* fade effect */
      :host([effect="fade"]) .rotator {
        display: inline-flex;
        flex-wrap: nowrap;
        flex-direction: row;
      }

      :host([effect="fade"]) .rotator__slide {
        width: 100%;
        flex: none;
        opacity: 0;
        box-sizing: border-box;
      }

      :host([effect="fade"]) .rotator__slide:not(:first-child) {
        margin-left: -100%; /* this is the bulk of the overlay trick */
      }

      :host([effect="fade"]) .rotator__slide--active {
        opacity: 1;
      }

      /* flip effect */

      :host([effect="flip"]) .rotator {
        display: flex;
        position: relative;

        /* TODO: dynamically get height and width */

        perspective: 500;
      }

      :host([effect="flip"]) .rotator__slide {
        display: block;
        width: auto;
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

      :host([effect="flip"]) .rotator__slide--prev {
        top: 40px;;
        transform: rotateX(-90deg);
      }
    `;
  }

  static get properties() {
    return {
      'activeSlide': {
        type: Number
      },
      'width': {
        type: String
      },
      'height': {
        type: String
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

    // managed properties
    this.activeSlide = 0;
    this.width = 'auto';
    this.height = 'auto';
    this.messages = [];
    this.effect = 'fade';
    this.rotationSpeed = 3;
    this.transitionSpeed = '500ms';

    // standard properties
    this.prevSlide = null;
  }

  firstUpdated() {
    if (this.rotationSpeed > 0) {
      setInterval(() => { this.nextSlide() }, this.rotationSpeed * 1000);
    }

    this.setDimensions();
    window.addEventListener('resize', this.setDimensions.bind(this));
  }

  render() {
    return html`
      <span class="rotator" style="width:${this.width}; height:${this.height};">
        ${this.makeMessages()}
      </span>
    `;
  }

  makeMessages() {
    const messages = this.messages.map((message, index) => {
      return html`
        <span
          style="transition: all ${this.transitionSpeed} ease;"
          class="rotator__slide ${this.activeSlide === index ? 'rotator__slide--active' : ''} ${this.prevSlide === index ? 'rotator__slide--prev' : ''}" >
          ${unsafeHTML(message)}
        </span>
      `;
    });

    return messages;
  }

  setDimensions() {
    if (this.effect === 'flip') {
      this.width = `${this.offsetWidth}px`;

      setTimeout(() => {
        const slides = this.shadowRoot.querySelectorAll('.rotator__slide');
        let tallest = 0;

        slides.forEach((slide) => {
          if (slide.offsetHeight > tallest) {
            tallest = slide.offsetHeight;
          }
        });

        this.height = `${tallest}px`;
      }, 1);
    }
  }

  nextSlide() {
    if (this.activeSlide < this.messages.length - 1) {
      this.activeSlide += 1;
      this.prevSlide = this.activeSlide - 1;
    } else {
      this.activeSlide = 0;
      this.prevSlide = this.messages.length -1;
    }
  }
}
